// warify should create a static folder inside war-template and put all the content from the informed folder inside it
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const archiver = require("archiver");

module.exports = (inputPath, outputPath, callback) => {
  // copy war-template
  const workdir = fs.mkdtempSync(path.join(os.tmpdir(), "warify"));
  const warTemplateFolderName = "war-template";
  const warTemplateFolderPath = path.join(__dirname, warTemplateFolderName);
  const staticFolderName = "static";
  const staticFolderPath = path.join(workdir, staticFolderName);

  // Copy war template to temporary folder
  fs.copySync(warTemplateFolderPath, workdir);

  // Copy content from user to static folder in warTemplate
  fs.copySync(inputPath, staticFolderPath);

  // Move index.html to main folder on war
  fs.moveSync(
    path.join(staticFolderPath, "index.html"),
    path.join(workdir, "index.html")
  );

  const files = fs.readdirSync(inputPath);
  const output = fs.createWriteStream(outputPath);
  output.on("close", () => {
    callback(archive.pointer());
  });

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.directory(inputPath, false);

  archive.pipe(output);

  archive.finalize();
};
