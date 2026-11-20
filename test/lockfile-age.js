const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

const LOCKFILE = "yarn.lock";
const NPM_RESOLUTION = /^\s+resolution: "((?:@[^@/"]+\/)?[^@"]+)@npm:([^"]+)"$/gm;
const LOCATOR_PARAMETERS = /::.*$/;
const PACKAGE_NAME = /^(?:@([^@/]+)\/)?([^@/]+)$/;
const DEFAULT_SCOPE_CONFIGURATIONS = new Map([
  ["jsr", { npmRegistryServer: "https://npm.jsr.io/" }],
]);
const TRAILING_SLASH = /\/$/;
const EXACT_VERSION =
  /^(?:@[^@/]+\/)?[^@]+@\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const USAGE = "Usage: node test/lockfile-age.js <base revision>";

const lockedVersionsIn = (lockfile) =>
  new Set(
    [...lockfile.matchAll(NPM_RESOLUTION)].map(
      ([, name, reference]) => `${name}@${reference.replace(LOCATOR_PARAMETERS, "")}`
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
 * refused rather than matched. Rejects when `ageGateInMinutes` is not a
 * finite number, when `publishTimesOf` rejects, and when `headLockfile`
 * yields no npm version, which means a format it cannot read.
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
  if (!Number.isFinite(ageGateInMinutes)) {
    throw new Error(
      `The lockfile age check reads the age gate only as a number of minutes: ${JSON.stringify(ageGateInMinutes)}`
    );
  }
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

/**
 * The address Yarn 4.10.3 reads a package's metadata from, and with it the
 * publish times its age gate judges. The registry is the one `npmScopes`
 * gives the package's scope, else Yarn's default for that scope, else
 * `npmRegistryServer`, as `getScopeRegistry` and `getScopeConfiguration`
 * choose it
 * (https://github.com/yarnpkg/berry/blob/%40yarnpkg/cli/4.10.3/packages/plugin-npm/sources/npmConfigUtils.ts#L33-L86);
 * the path is the one `getIdentUrl` builds
 * (https://github.com/yarnpkg/berry/blob/%40yarnpkg/cli/4.10.3/packages/plugin-npm/sources/npmHttpUtils.ts#L62-L68).
 * Throws for a name that is neither `name` nor `@scope/name`.
 *
 * @param {string} packageName
 * @param {{
 *   npmRegistryServer: string,
 *   npmScopes: Map<string, { npmRegistryServer: string | null }>
 * }} registrySettings as `yarn config get` prints them, scopes without their `@`
 * @returns {string}
 */
const metadataUrlOf = (packageName, { npmRegistryServer, npmScopes }) => {
  const parts = PACKAGE_NAME.exec(packageName);
  if (parts === null) {
    throw new Error(`The lockfile age check cannot read the package name ${packageName}`);
  }
  const [, scope, name] = parts;
  const scopeConfiguration =
    npmScopes.get(scope) ?? DEFAULT_SCOPE_CONFIGURATIONS.get(scope);
  const registry = (scopeConfiguration?.npmRegistryServer ?? npmRegistryServer).replace(
    TRAILING_SLASH,
    ""
  );

  return `${registry}/${scope === undefined ? name : `@${scope}%2f${name}`}`;
};

const listedTimesOf = async (packageName, registrySettings) => {
  const url = metadataUrlOf(packageName, registrySettings);
  const response = await fetch(url).catch((error) => {
    throw new Error(`Could not read ${url}: ${error.cause?.message ?? error.message}`);
  });

  if (!response.ok) {
    throw new Error(`The registry answered ${response.status} for ${url}`);
  }
  const { time } = await response.json();
  return time;
};

const publishTimesInRegistries = (registrySettings) => async (lockedVersions) => {
  const versions = lockedVersions.map(nameAndVersionOf);
  const packages = [...new Set(versions.map(({ name }) => name))];
  const timesByPackage = new Map(
    await Promise.all(
      packages.map(async (name) => [name, await listedTimesOf(name, registrySettings)])
    )
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
    publishTimesOf: publishTimesInRegistries({
      npmRegistryServer: yarnSetting("npmRegistryServer"),
      npmScopes: new Map(Object.entries(yarnSetting("npmScopes"))),
    }),
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

module.exports = { metadataUrlOf, tooYoungNewlyLockedVersions };
