const fs = require("fs");

const { REFERENCE_FILE, renderingOfBuild } = require("./built-site");

fs.writeFileSync(
  REFERENCE_FILE,
  `${JSON.stringify(renderingOfBuild(), null, 2)}\n`
);
