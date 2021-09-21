const glob = require('fast-glob');
const fs = require('fs-extra');
const path = require('path');
const JsonToCpp = require('./JsonToCpp.bs');
const JsonToJava = require('./JsonToJava.bs');

const main = async (argv) => {
  const files = await glob(argv[2]);
  console.log(files, "test/test.json");
  return Promise.all(files.map(async (file) => {
    try {
      const content = await fs.readFile(file, 'utf8');
      const cpp = JsonToCpp.run(path.parse(file).name, content);
      if (cpp) await fs.outputFile(file.replace(".json", "_generated.h"), cpp);
      // const java = JsonToJava.run(path.parse(file).name, content);
      // if (java) await fs.outputFile(file.replace(".json", "_generated.java"), java);
    } catch (e) {
      console.error("Some go wrong", e);
    }
  }));
}

main(process.argv);