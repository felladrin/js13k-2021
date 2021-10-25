// @ts-ignore
import midiFileParser from "midi-file-parser";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const path = resolve(__dirname, "../../src/music/music");

writeFileSync(`${path}.json`, JSON.stringify(midiFileParser(readFileSync(`${path}.mid`, "binary"))));
