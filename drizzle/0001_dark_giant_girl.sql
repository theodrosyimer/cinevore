ALTER TABLE `account` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `follower` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `like` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `movie_infos_to_user` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `movie_list` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verificationToken` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `account` ADD PRIMARY KEY(`provider`,`providerAccountId`);--> statement-breakpoint
ALTER TABLE `follower` ADD PRIMARY KEY(`followee`,`follower`);--> statement-breakpoint
ALTER TABLE `like` ADD PRIMARY KEY(`id`,`author_id`,`resource_id`);--> statement-breakpoint
ALTER TABLE `movie_infos_to_user` ADD PRIMARY KEY(`user_id`,`movie_id`);--> statement-breakpoint
ALTER TABLE `movie_list` ADD PRIMARY KEY(`list_id`,`movie_id`);--> statement-breakpoint
ALTER TABLE `verificationToken` ADD PRIMARY KEY(`identifier`,`token`);