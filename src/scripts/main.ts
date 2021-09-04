import { emitScriptReady } from "./events";
import "./listeners";

emitScriptReady();

if (import.meta.env.DEV) import("./devPanel");
