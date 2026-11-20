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

const dateOf = (listedTime) => {
  const date = typeof listedTime === "string" ? new Date(listedTime) : undefined;
  return date === undefined || Number.isNaN(date.getTime()) ? undefined : date;
};

const ageInMinutes = (publishedAt, now) =>
  (now.getTime() - publishedAt.getTime()) / MINUTE_IN_MILLISECONDS;

const isTooYoung = ({ publishedAt }, ageGateInMinutes, now) =>
  publishedAt === undefined || ageInMinutes(publishedAt, now) < ageGateInMinutes;

/**
 * Judges the npm versions `headLockfile` locks and `baseLockfile` does not,
 * as Yarn's `npmMinimalAgeGate` judges a version it resolves: one younger
 * than `ageGateInMinutes` at `now` is too young unless `preapproved` names
 * it. `publishTimesOf(versions)` maps each version it is given to the publish
 * time its registry lists, as a Map or a promise of one; a version listed
 * without a date string counts as too young.
 * Preapprovals must be exact `name@version` descriptors; anything broader is
 * refused rather than matched. Rejects when `publishTimesOf` does, and when
 * `headLockfile` yields no npm version, which means a format it cannot read.
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
  publishTimesOf,
  now,
}) => {
  const approved = new Set(preapproved.map(exactVersionOf));
  const locked = lockedVersionsIn(headLockfile);
  if (locked.size === 0) {
    throw new Error(
      "The lockfile age check found no npm versions in yarn.lock, so it cannot read its format"
    );
  }
  const alreadyLocked = lockedVersionsIn(baseLockfile);
  const newlyLocked = [...locked]
    .filter((version) => !alreadyLocked.has(version))
    .sort();
  const unapproved = newlyLocked.filter((version) => !approved.has(version));
  const listedTimes = await publishTimesOf(unapproved);

  return {
    newlyLocked,
    tooYoung: unapproved
      .map((version) => ({ locked: version, publishedAt: dateOf(listedTimes.get(version)) }))
      .filter((version) => isTooYoung(version, ageGateInMinutes, now)),
  };
};

const yarnOutput = (...args) => {
  try {
    return execFileSync("yarn", args, { encoding: "utf8", maxBuffer: Infinity });
  } catch (error) {
    throw new Error(`${error.message}\n${error.stdout ?? ""}`);
  }
};

const yarnSetting = (name) => JSON.parse(yarnOutput("config", "get", name, "--json"));

const lockfileAt = (revision) =>
  execFileSync("git", ["show", `${revision}:${LOCKFILE}`], {
    encoding: "utf8",
    maxBuffer: Infinity,
  });

const nameAndVersionOf = (locked) => {
  const at = locked.lastIndexOf("@");
  return { locked, name: locked.slice(0, at), version: locked.slice(at + 1) };
};

const publishTimesFromYarn = (lockedVersions) => {
  const versions = lockedVersions.map(nameAndVersionOf);
  const packages = [...new Set(versions.map(({ name }) => name))];
  const timesByPackage = new Map(
    packages.length === 0
      ? []
      : yarnOutput("npm", "info", ...packages, "--fields", "name,time", "--json")
          .split("\n")
          .filter((line) => line !== "")
          .map((line) => JSON.parse(line))
          .map(({ name, time }) => [name, time])
  );

  return new Map(
    versions.map(({ locked, name, version }) => [
      locked,
      timesByPackage.get(name)?.[version],
    ])
  );
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
    publishTimesOf: publishTimesFromYarn,
    now: new Date(),
  });

  console.log(
    `Newly locked against ${baseRevision}: ${newlyLocked.join(", ") || "nothing"}`
  );
  for (const { locked, publishedAt } of tooYoung) {
    console.error(
      publishedAt === undefined
        ? `${locked} has no readable publish time in the registry`
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
