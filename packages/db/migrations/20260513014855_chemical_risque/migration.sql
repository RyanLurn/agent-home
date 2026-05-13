CREATE TABLE `sandbox_outputs` (
	`id` text PRIMARY KEY,
	`stdout` text,
	`stderr` text,
	`exit_code` integer,
	`signal` text,
	`duration_ms` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
