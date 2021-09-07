import { statSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";
import { createPubSub } from "create-pubsub";
import { greenBright, redBright } from "colorette";
import zip from "bestzip";
import efficientCompressionTool from "ect-bin";
import crossExecFile from "cross-exec-file";
import zipstats from "zipstats";

const distFolderPath = resolve(__dirname, "..", "..", "dist");
const zippedFilePath = resolve(__dirname, "..", "..", "dist.zip");
const [emitZipProcessInitialized, onZipProcessInitialized] = createPubSub();
const [emitOldZipRemoved, onOldZipRemoved] = createPubSub();
const [emitZipCreated, onZipCreated] = createPubSub();
const [emitZipOptimized, onZipOptimized] = createPubSub();

onZipProcessInitialized(() => {
  if (existsSync(zippedFilePath)) {
    unlinkSync(zippedFilePath);
  }

  emitOldZipRemoved();
});

onOldZipRemoved(async () => {
  await zip({
    cwd: distFolderPath,
    source: "index.html",
    destination: zippedFilePath,
  });

  emitZipCreated();
});

onZipCreated(async () => {
  console.log("Zip file created successfully!");

  try {
    console.log("Running Efficient Compression Tool to reduce the zip file size.");
    const { stdout } = await crossExecFile(efficientCompressionTool, ["-9", "-zip", zippedFilePath]);
    console.log(stdout);
  } catch {
    console.log("Skipping usage of Efficient Compression Tool.");
  }

  emitZipOptimized();
});

onZipOptimized(() => {
  const maxSizeAllowed = 13 * 1024;
  const fileSize = statSync(zippedFilePath).size;
  const fileSizeDifference = Math.abs(maxSizeAllowed - fileSize);
  const isUnderSizeLimit = fileSize <= maxSizeAllowed;
  const status = isUnderSizeLimit ? "under" : "over";
  const colorize = isUnderSizeLimit ? greenBright : redBright;

  console.log(`${zippedFilePath} (${fileSize} bytes)`);
  console.log(zipstats(zippedFilePath));
  console.log(colorize(`Status: ${fileSizeDifference} bytes ${status} the 13KB limit!`));
});

emitZipProcessInitialized();
