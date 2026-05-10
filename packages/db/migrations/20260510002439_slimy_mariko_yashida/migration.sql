PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_context_entries` (
	`id` text PRIMARY KEY,
	`author` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_context_entries`(`id`, `author`, `content`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `author`, `content`, `created_at`, `updated_at`, `deleted_at` FROM `context_entries`;--> statement-breakpoint
DROP TABLE `context_entries`;--> statement-breakpoint
ALTER TABLE `__new_context_entries` RENAME TO `context_entries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notifications` (
	`id` text PRIMARY KEY,
	`source` text NOT NULL,
	`content` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_notifications`(`id`, `source`, `content`, `status`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `source`, `content`, `status`, `created_at`, `updated_at`, `deleted_at` FROM `notifications`;--> statement-breakpoint
DROP TABLE `notifications`;--> statement-breakpoint
ALTER TABLE `__new_notifications` RENAME TO `notifications`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_messages` (
	`id` text PRIMARY KEY,
	`sender` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_messages`(`id`, `sender`, `content`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `sender`, `content`, `created_at`, `updated_at`, `deleted_at` FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;--> statement-breakpoint
PRAGMA foreign_keys=ON;