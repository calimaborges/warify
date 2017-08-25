// warify should create a static folder inside war-template and put all the content from the informed folder inside it
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const archiver = require("archiver");
const getInstalledPath = require("get-installed-path");
const packageJson = require("./package.json");

const generateWar = (modulePath, inputPath, outputPath, callback) => {
  // copy war-template
  const workdir = fs.mkdtempSync(path.join(os.tmpdir(), "warify"));
  const warTemplateFolderName = "war-template";
  const warTemplateFolderPath = path.join(modulePath, warTemplateFolderName);

  // Copy war template to temporary folder
  fs.copySync(warTemplateFolderPath, workdir);

  // Copy content from user to war template folder
  fs.copySync(inputPath, workdir);

  const files = fs.readdirSync(workdir);
  const output = fs.createWriteStream(outputPath);
  output.on("close", () => {
    callback(archive.pointer());
  });

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.directory(workdir, false);

  archive.pipe(output);

  archive.finalize();
};

module.exports = (inputPath, outputPath, callback) => {
  getInstalledPath(packageJson.name, {
    paths: process.mainModule.paths
  }).then(modulePath =>
    generateWar(modulePath, inputPath, outputPath, callback)
  );
};
