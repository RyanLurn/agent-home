import type { MessageDTO } from "@repo/db/dto/message";

import EventEmitter from "node:events";

export const chatEventEmitter = new EventEmitter();

export function emitNewMessageEvent(newMessage: MessageDTO) {
  chatEventEmitter.emit("new-message", newMessage);
}
