import { statSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";
import zip from "bestzip";
import efficientCompressionTool from "ect-bin";
import crossExecFile from "cross-exec-file";
import zipstats from "zipstats";

const distFolderPath = resolve(__dirname, "..", "..", "dist");
const zippedFilePath = resolve(__dirname, "..", "..", "dist.zip");

(async () => {
  if (existsSync(zippedFilePath)) {
    unlinkSync(zippedFilePath);
  }

  await zip({
    cwd: distFolderPath,
    source: "index.html",
    destination: zippedFilePath,
  });

  console.log("Zip file created successfully!");

  try {
    console.log("Running Efficient Compression Tool to reduce the zip file size.");
    const { stdout } = await crossExecFile(efficientCompressionTool, ["-9", "-zip", zippedFilePath]);
    console.log(stdout);
  } catch {
    console.log("Skipping usage of Efficient Compression Tool.");
  }

  const maxSizeAllowed = 13 * 1024;
  const fileSize = statSync(zippedFilePath).size;
  const fileSizeDifference = Math.abs(maxSizeAllowed - fileSize);
  const isUnderSizeLimit = fileSize <= maxSizeAllowed;
  const status = isUnderSizeLimit ? "under" : "over";
  const statusColor = isUnderSizeLimit ? "\x1b[32m" : "\x1b[31m";

  console.log(`${zippedFilePath} (${fileSize} bytes)`);
  console.log(zipstats(zippedFilePath));
  console.log(`${statusColor}%s\x1b[0m`, `Status: ${fileSizeDifference} bytes ${status} the 13KB limit!`);
})();
