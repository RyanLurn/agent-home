export const AGENT_CONTEXT_ENTRY_AUTHORS = ["system", "agent"] as const;
export const AGENT_NOTIFICATION_STATUSES = ["pending", "acknowledged"] as const;

export const MESSAGE_SENDERS = ["user", "agent"] as const;
export const MESSAGE_CONTENT_MIN_LENGTH = 1;
export const MESSAGE_CONTENT_MAX_LENGTH = 10_000;
