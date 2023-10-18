CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author_id` varchar(255) NOT NULL,
	`resource_id` int NOT NULL,
	`resource_type` enum('movie_review','movie_list') NOT NULL,
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comment_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `follower` (
	`followee` varchar(255) NOT NULL,
	`follower` varchar(255) NOT NULL,
	`followed_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `follower_followee_follower` PRIMARY KEY(`followee`,`follower`),
	CONSTRAINT `composite_key` UNIQUE(`follower`,`followee`)
);
--> statement-breakpoint
CREATE TABLE `like` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author_id` varchar(255) NOT NULL,
	`resource_type` enum('movie_review','movie_list') NOT NULL,
	`resource_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `like_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `list` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`title` varchar(2000) NOT NULL,
	`description` text,
	`is_private` boolean DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `list_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movie` (
	`tmdb_id` int NOT NULL,
	`imdb__id` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`backdrop_path` varchar(255) NOT NULL,
	`poster_path` varchar(255) NOT NULL,
	`watched_count` int NOT NULL DEFAULT 0,
	`listed_count` int NOT NULL DEFAULT 0,
	`liked_count` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `movie_tmdb_id` PRIMARY KEY(`tmdb_id`),
	CONSTRAINT `movie_imdb__id_unique` UNIQUE(`imdb__id`),
	CONSTRAINT `movie_slug_unique` UNIQUE(`slug`),
	CONSTRAINT `tmdb_id` UNIQUE(`tmdb_id`),
	CONSTRAINT `imdb_id` UNIQUE(`imdb__id`),
	CONSTRAINT `slug` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `movie_infos_to_user` (
	`movie_id` int NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`rating` enum('','0','0.5','1','1.5','2','2.5','3','3.5','4','4.5','5') NOT NULL DEFAULT '',
	`like` boolean DEFAULT false,
	`watched` boolean DEFAULT false,
	`reviewed` boolean DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `movie_infos_to_user_movie_id_user_id` PRIMARY KEY(`movie_id`,`user_id`),
	CONSTRAINT `composite_key` UNIQUE(`movie_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `movie_list` (
	`list_id` int NOT NULL,
	`movie_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `movie_list_list_id_movie_id` PRIMARY KEY(`list_id`,`movie_id`),
	CONSTRAINT `composite_key` UNIQUE(`movie_id`,`list_id`)
);
--> statement-breakpoint
CREATE TABLE `movie_review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`movie_id` int NOT NULL,
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `movie_review_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `rating` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`value` enum('0','0.5','1','1.5','2','2.5','3','3.5','4','4.5','5') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rating_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rating_to_movie_list` (
	`list_id` int NOT NULL,
	`rating_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rating_to_movie_review` (
	`movie_review` int NOT NULL,
	`rating_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`role` enum('user','admin','superadmin') DEFAULT 'user',
	`name` varchar(255) NOT NULL,
	`lastname` varchar(60),
	`firstname` varchar(50),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3),
	`password` char(60),
	`image` varchar(255),
	`bio` text,
	`urls` json,
	`stripeSubscriptionId` varchar(255),
	`stripeCustomerId` varchar(255),
	`stripePriceId` varchar(255),
	`stripeCurrentPeriodEnd` timestamp,
	`stripeSessionId` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_name_unique` UNIQUE(`name`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `id` UNIQUE(`id`),
	CONSTRAINT `email` UNIQUE(`email`),
	CONSTRAINT `username` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `watchlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `watchlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `watchlist_to_movies` (
	`watchlist_id` int NOT NULL,
	`movie_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `FK_author_id` ON `comment` (`author_id`);--> statement-breakpoint
CREATE INDEX `FK_resource_id` ON `comment` (`resource_id`);--> statement-breakpoint
CREATE INDEX `FK_resource_type` ON `comment` (`resource_type`);--> statement-breakpoint
CREATE INDEX `FK_user` ON `follower` (`followee`);--> statement-breakpoint
CREATE INDEX `FK_user_follower` ON `follower` (`follower`);--> statement-breakpoint
CREATE INDEX `FK_author_id` ON `like` (`author_id`);--> statement-breakpoint
CREATE INDEX `FK_resource_id` ON `like` (`resource_id`);--> statement-breakpoint
CREATE INDEX `FK_resource_type` ON `like` (`resource_type`);--> statement-breakpoint
CREATE INDEX `id` ON `list` (`id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `list` (`user_id`);--> statement-breakpoint
CREATE INDEX `title` ON `movie` (`title`);--> statement-breakpoint
CREATE INDEX `watched_count` ON `movie` (`watched_count`);--> statement-breakpoint
CREATE INDEX `listed_count` ON `movie` (`listed_count`);--> statement-breakpoint
CREATE INDEX `liked_count` ON `movie` (`liked_count`);--> statement-breakpoint
CREATE INDEX `rating` ON `movie_infos_to_user` (`rating`);--> statement-breakpoint
CREATE INDEX `liked` ON `movie_infos_to_user` (`like`);--> statement-breakpoint
CREATE INDEX `watched` ON `movie_infos_to_user` (`watched`);--> statement-breakpoint
CREATE INDEX `reviewed` ON `movie_infos_to_user` (`reviewed`);--> statement-breakpoint
CREATE INDEX `FK_movie_id` ON `movie_list` (`movie_id`);--> statement-breakpoint
CREATE INDEX `FK_user_id` ON `movie_review` (`user_id`);--> statement-breakpoint
CREATE INDEX `FK_movie_id` ON `movie_review` (`movie_id`);--> statement-breakpoint
CREATE INDEX `id` ON `rating` (`id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `rating` (`user_id`);--> statement-breakpoint
CREATE INDEX `FK_list_id` ON `rating_to_movie_list` (`list_id`);--> statement-breakpoint
CREATE INDEX `FK_rating_id` ON `rating_to_movie_list` (`rating_id`);--> statement-breakpoint
CREATE INDEX `FK_list_id` ON `rating_to_movie_review` (`movie_review`);--> statement-breakpoint
CREATE INDEX `FK_rating_id` ON `rating_to_movie_review` (`rating_id`);--> statement-breakpoint
CREATE INDEX `watchlist_id` ON `watchlist_to_movies` (`watchlist_id`);--> statement-breakpoint
CREATE INDEX `movie_id` ON `watchlist_to_movies` (`movie_id`);