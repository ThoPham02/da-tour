CREATE TABLE `user_tbl` (
  `id` bigint,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255),
  `password_hash` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `status` int NOT NULL,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tour_tbl` (
  `id` bigint,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `duration` int NOT NULL,
  `location` int NOT NULL,
  `overview` text,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `remain` int NOT NULL,
  `departure_date` bigint,
  `status` int NOT NULL,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `itinerary_tbl` (
  `id` bigint,
  `tour_id` bigint,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `activity_tbl` (
  `id` bigint,
  `tour_id` bigint,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `service_tbl` (
  `id` bigint,
  `tour_id` bigint,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

-- CREATE TABLE `request_tbl` (
--   `id` bigint,
--   `user_id` bigint,
--   `user_name` varchar(255) NOT NULL,
--   `phone` varchar(255) NOT NULL,
--   `description` text,
--   `product_id` bigint,
--   `status` int NOT NULL,
--   `created_at` bigint,
--   `updated_at` bigint,
--   PRIMARY KEY (`id`)
-- );

CREATE TABLE `order_tbl` (
  `id` bigint,
  `user_id` bigint,
  `user_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `tour_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `status` int NOT NULL,
  `payment_status` int NOT NULL,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `payment_tbl` (
  `id` bigint,
  `order_id` bigint,
  `method` int NOT NULL,
  `payment_date` bigint,
  `amount` decimal(10,2) NOT NULL,
  `url` varchar(255),
  `status` int NOT NULL,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);