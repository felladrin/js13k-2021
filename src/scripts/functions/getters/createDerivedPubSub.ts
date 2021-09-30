import { createPubSub, SubscribeFunction } from "create-pubsub";

export function createDerivedPubSub<T>(subscribeFunctions: SubscribeFunction<any>[], getData: () => T) {
  const pubSub = createPubSub<T>(getData());
  subscribeFunctions.forEach((subscribe) => subscribe(() => pubSub[0](getData())));
  return pubSub;
}
