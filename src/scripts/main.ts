import { emitScriptReady } from "./constants/events";

!import.meta.globEager("./subscriptions/*.ts");

if (import.meta.env.DEV) import("./modules/devPanel");

emitScriptReady();
