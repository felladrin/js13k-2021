import { createPubSub as createStore } from "create-pubsub";

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = createStore<(...sound: any) => void>();
