const test = require("node:test");
const assert = require("node:assert/strict");

const { tooYoungNewlyLockedVersions } = require("./lockfile-age");

const AGE_GATE_IN_MINUTES = 12 * 24 * 60;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const NOW = new Date("2026-11-20T20:00:00Z");

const minutesBeforeNow = (minutes) =>
  new Date(NOW.getTime() - minutes * MINUTE_IN_MILLISECONDS);

const yarnLockEntry = (name, version) => `"${name}@npm:^${version}":
  version: ${version}
  resolution: "${name}@npm:${version}"
  languageName: node
  linkType: hard
`;

const lockfile = (...entries) =>
  ['__metadata:\n  version: 8\n  cacheKey: 10c0\n', ...entries].join("\n");

const judge = ({ base = lockfile(), head, publishedAt, preapproved = [] }) =>
  tooYoungNewlyLockedVersions({
    baseLockfile: base,
    headLockfile: head,
    ageGateInMinutes: AGE_GATE_IN_MINUTES,
    preapproved,
    publishTimeOf: async (locked) => publishedAt[locked],
    now: NOW,
  });

const lockedIn = async (judgement) =>
  (await judgement).tooYoung.map(({ locked }) => locked);

test("a version as old as the age gate passes, and one a minute younger does not", async () => {
  assert.deepEqual(
    await lockedIn(
      judge({
        head: lockfile(
          yarnLockEntry("astro", "7.4.8"),
          yarnLockEntry("@astrojs/telemetry", "3.3.1")
        ),
        publishedAt: {
          "astro@7.4.8": minutesBeforeNow(AGE_GATE_IN_MINUTES),
          "@astrojs/telemetry@3.3.1": minutesBeforeNow(AGE_GATE_IN_MINUTES - 1),
        },
      })
    ),
    ["@astrojs/telemetry@3.3.1"]
  );
});

test("a young version the base already locks is not judged again", async () => {
  assert.deepEqual(
    await lockedIn(
      judge({
        base: lockfile(yarnLockEntry("astro", "7.4.8")),
        head: lockfile(yarnLockEntry("astro", "7.4.8"), yarnLockEntry("cookie", "2.0.2")),
        publishedAt: {
          "astro@7.4.8": minutesBeforeNow(1),
          "cookie@2.0.2": minutesBeforeNow(1),
        },
      })
    ),
    ["cookie@2.0.2"]
  );
});

test("a preapproved version passes, and another version of that package does not", async () => {
  assert.deepEqual(
    await lockedIn(
      judge({
        head: lockfile(yarnLockEntry("astro", "7.4.8"), yarnLockEntry("astro", "7.4.9")),
        publishedAt: {
          "astro@7.4.8": minutesBeforeNow(1),
          "astro@7.4.9": minutesBeforeNow(1),
        },
        preapproved: ["astro@7.4.8"],
      })
    ),
    ["astro@7.4.9"]
  );
});

test("a version the registry gives no publish time for counts as too young", async () => {
  assert.deepEqual(
    await lockedIn(
      judge({ head: lockfile(yarnLockEntry("mri", "1.2.0")), publishedAt: {} })
    ),
    ["mri@1.2.0"]
  );
});

test("a lockfile without a single npm version is refused rather than passed", async () => {
  await assert.rejects(
    judge({ head: lockfile(), publishedAt: {} }),
    /no npm versions/
  );
});

test("a preapproval that is not one exact version is refused", async () => {
  for (const preapproval of ["astro", "astro@^7.4.8"]) {
    await assert.rejects(
      judge({
        head: lockfile(yarnLockEntry("astro", "7.4.8")),
        publishedAt: { "astro@7.4.8": minutesBeforeNow(1) },
        preapproved: [preapproval],
      }),
      /exact name@version/,
      preapproval
    );
  }
});
