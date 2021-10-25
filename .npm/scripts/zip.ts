// @ts-ignore
import zip from "bestzip";
import { greenBright, redBright } from "colorette";
// @ts-ignore
import crossExecFile from "cross-exec-file";
// @ts-ignore
import efficientCompressionTool from "ect-bin";
import { existsSync, statSync, unlinkSync } from "fs";
import { EOL } from "os";
import { resolve } from "path";
import task from "tasuku";
// @ts-ignore
import zipstats from "zipstats";

const distFolderPath = resolve(__dirname, "..", "..", "dist");
const zippedFilePath = resolve(__dirname, "..", "..", "dist.zip");

task.group((task) => [
  task("Delete old zip file", async ({ setOutput }) => {
    if (existsSync(zippedFilePath)) {
      unlinkSync(zippedFilePath);
      setOutput("Old zip file deleted.");
    } else {
      setOutput("Zip file not created yet.");
    }
  }),
  task("Create zip file", async ({ setOutput }) => {
    await zip({
      cwd: distFolderPath,
      source: "index.html",
      destination: zippedFilePath,
    });

    const fileSize = statSync(zippedFilePath).size;

    setOutput(`${zippedFilePath} (${fileSize} bytes)`);
  }),
  task("Re-compress with Efficient Compression Tool", async ({ setOutput, setWarning }) => {
    try {
      const { stdout } = await crossExecFile(efficientCompressionTool, ["-9", "-zip", zippedFilePath]);
      const fileSize = statSync(zippedFilePath).size;

      setOutput([stdout, `New zip file size: ${fileSize} bytes`].join(EOL));
    } catch {
      setWarning("Skipping usage of Efficient Compression Tool.");
    }
  }),
  task("Check zip file content", async ({ setOutput }) => {
    setOutput(zipstats(zippedFilePath));
  }),
  task("Check status", async ({ setOutput, setError }) => {
    const maxSizeAllowed = 13 * 1024;
    const fileSize = statSync(zippedFilePath).size;
    const fileSizeDifference = Math.abs(maxSizeAllowed - fileSize);
    const isUnderSizeLimit = fileSize <= maxSizeAllowed;
    const message = `${fileSizeDifference} bytes ${isUnderSizeLimit ? "under" : "over"} the 13KB limit!`;

    if (isUnderSizeLimit) {
      setOutput(greenBright(message));
    } else {
      setError(redBright(message));
    }
  }),
]);
