import type { MessageDTO } from "@repo/db/dto/message";

import { create } from "zustand";

interface ChatStore {
  messages: MessageDTO[];
  addMessage: (newMessage: MessageDTO) => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
  messages: [],
  addMessage: (newMessage) =>
    set(({ messages }) => ({ messages: [...messages, newMessage] })),
}));
