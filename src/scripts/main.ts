import { emitScriptReady } from "./constants";
import { loadDevTools } from "./functions";
import "./listeners";

emitScriptReady();

if (import.meta.env.DEV) {
  loadDevTools();
}
