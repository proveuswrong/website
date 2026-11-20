const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

const LOCKFILE = "yarn.lock";
const NPM_RESOLUTION = /^\s+resolution: "((?:@[^@/"]+\/)?[^@"]+)@npm:([^"]+)"$/gm;
const EXACT_VERSION =
  /^(?:@[^@/]+\/)?[^@]+@\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const USAGE = "Usage: node test/lockfile-age.js <base revision>";

const lockedVersionsIn = (lockfile) =>
  new Set(
    [...lockfile.matchAll(NPM_RESOLUTION)].map(
      ([, name, version]) => `${name}@${version}`
    )
  );

const exactVersionOf = (preapproval) => {
  if (!EXACT_VERSION.test(preapproval)) {
    throw new Error(
      `The lockfile age check reads only exact name@version preapprovals: ${preapproval}`
    );
  }
  return preapproval;
};

const ageInMinutes = (publishedAt, now) =>
  (now.getTime() - publishedAt.getTime()) / MINUTE_IN_MILLISECONDS;

const isTooYoung = ({ publishedAt }, ageGateInMinutes, now) =>
  publishedAt === undefined || ageInMinutes(publishedAt, now) < ageGateInMinutes;

/**
 * Judges the npm versions `headLockfile` locks and `baseLockfile` does not,
 * as Yarn's `npmMinimalAgeGate` judges a version it resolves: one younger
 * than `ageGateInMinutes` at `now` is too young unless `preapproved` names
 * it, and so is one whose publish time `publishTimeOf` cannot give.
 * Preapprovals must be exact `name@version` descriptors; anything broader is
 * refused rather than matched. Rejects when `publishTimeOf` does.
 *
 * @returns {Promise<{
 *   newlyLocked: string[],
 *   tooYoung: Array<{ locked: string, publishedAt: Date | undefined }>
 * }>} versions as `name@version`, sorted
 */
const tooYoungNewlyLockedVersions = async ({
  baseLockfile,
  headLockfile,
  ageGateInMinutes,
  preapproved,
  publishTimeOf,
  now,
}) => {
  const approved = new Set(preapproved.map(exactVersionOf));
  const alreadyLocked = lockedVersionsIn(baseLockfile);
  const newlyLocked = [...lockedVersionsIn(headLockfile)]
    .filter((locked) => !alreadyLocked.has(locked))
    .sort();
  const judged = await Promise.all(
    newlyLocked
      .filter((locked) => !approved.has(locked))
      .map(async (locked) => ({ locked, publishedAt: await publishTimeOf(locked) }))
  );

  return {
    newlyLocked,
    tooYoung: judged.filter((version) => isTooYoung(version, ageGateInMinutes, now)),
  };
};

const yarnSetting = (name) =>
  JSON.parse(
    execFileSync("yarn", ["config", "get", name, "--json"], { encoding: "utf8" })
  );

const lockfileAt = (revision) =>
  execFileSync("git", ["show", `${revision}:${LOCKFILE}`], {
    encoding: "utf8",
    maxBuffer: Infinity,
  });

const publishTimeInRegistry = (registry) => async (locked) => {
  const at = locked.lastIndexOf("@");
  const [name, version] = [locked.slice(0, at), locked.slice(at + 1)];
  const packageUrl = `${registry.replace(/\/$/, "")}/${name.replace("/", "%2f")}`;
  const response = await fetch(packageUrl);

  if (!response.ok) {
    throw new Error(`The registry answered ${response.status} for ${name}`);
  }
  const { time = {} } = await response.json();
  return time[version] === undefined ? undefined : new Date(time[version]);
};

const clearsTheGateAt = (publishedAt, ageGateInMinutes) =>
  new Date(publishedAt.getTime() + ageGateInMinutes * MINUTE_IN_MILLISECONDS);

const checkAgainst = async (baseRevision) => {
  const ageGateInMinutes = yarnSetting("npmMinimalAgeGate");
  const { newlyLocked, tooYoung } = await tooYoungNewlyLockedVersions({
    baseLockfile: lockfileAt(baseRevision),
    headLockfile: readFileSync(LOCKFILE, "utf8"),
    ageGateInMinutes,
    preapproved: yarnSetting("npmPreapprovedPackages"),
    publishTimeOf: publishTimeInRegistry(yarnSetting("npmRegistryServer")),
    now: new Date(),
  });

  console.log(
    `Newly locked against ${baseRevision}: ${newlyLocked.join(", ") || "nothing"}`
  );
  for (const { locked, publishedAt } of tooYoung) {
    console.error(
      publishedAt === undefined
        ? `${locked} has no publish time in the registry`
        : `${locked} was published ${publishedAt.toISOString()} and clears the ${ageGateInMinutes}-minute age gate ${clearsTheGateAt(publishedAt, ageGateInMinutes).toISOString()}`
    );
  }
  if (tooYoung.length > 0) {
    console.error(
      "Wait until then, or list the exact version under npmPreapprovedPackages in .yarnrc.yml until it clears the gate."
    );
    process.exitCode = 1;
  }
};

if (require.main === module) {
  const [baseRevision] = process.argv.slice(2);

  if (baseRevision === undefined) {
    console.error(USAGE);
    process.exitCode = 1;
  } else {
    checkAgainst(baseRevision).catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
  }
}

module.exports = { tooYoungNewlyLockedVersions };
