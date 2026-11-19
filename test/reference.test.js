const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");

const {
  ERROR_PAGE_ADDRESS,
  PAGE_ADDRESSES,
  REFERENCE_FILE,
  renderingOfBuild,
} = require("./built-site");

const reference = JSON.parse(fs.readFileSync(REFERENCE_FILE, "utf8"));

test("the reference covers the pages of the contract and the error page", () => {
  assert.deepEqual(
    Object.keys(reference.pages).sort(),
    [...PAGE_ADDRESSES, ERROR_PAGE_ADDRESS].sort()
  );
});

for (const address of Object.keys(reference.pages)) {
  test(`${address} renders as in the reference`, () => {
    assert.deepEqual(
      renderingOfBuild().pages[address],
      reference.pages[address]
    );
  });
}

test("the web app manifest is the one in the reference", () => {
  assert.deepEqual(renderingOfBuild().manifest, reference.manifest);
});
