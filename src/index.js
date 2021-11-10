require("util").inspect.defaultOptions.depth = 6;
const glob = require('fast-glob');
const fs = require('fs-extra');
const path = require('path');
const JsonToCpp = require('./JsonToCpp.bs');

const main = async (argv) => {
  const files = await glob(argv[2]);
  console.log(files, "test/test.json");
  return Promise.all(files.map(async (file) => {
    try {
      const content = await fs.readFile(file, 'utf8');
      const cpp = JsonToCpp.run(path.parse(file).name, content);
      await fs.outputFile(file.replace(".json", "_generated.h"), cpp);
    } catch (e) {
      console.error("Some go wrong while parsing file:", file, e);
    }
  }));
}

main(process.argv);