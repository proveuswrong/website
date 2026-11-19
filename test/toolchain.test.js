const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const REPOSITORY = path.join(__dirname, "..");
const { packageManager, volta } = require(path.join(
  REPOSITORY,
  "package.json"
));

test("Cloudflare builds with the Node version pinned for local work", () => {
  const nodeVersionForCloudflare = fs
    .readFileSync(path.join(REPOSITORY, ".node-version"), "utf8")
    .trim();

  assert.equal(nodeVersionForCloudflare, volta.node);
});

test("Corepack is given the Yarn version pinned for local work", () => {
  const [nameAndVersion] = packageManager.split("+");

  assert.equal(nameAndVersion, `yarn@${volta.yarn}`);
});
