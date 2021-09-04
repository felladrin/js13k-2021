import { emitScriptReady } from "./constants";
import "./listeners";

emitScriptReady();

if (import.meta.env.DEV) import("./devPanel");
