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
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `journey_tbl` (
  `id` bigint,
  `tour_id` bigint,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` bigint,
  `updated_at` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `included_tbl` (
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

-- CREATE TABLE `order_tbl` (
--   `id` bigint,
--   `user_id` bigint,
--   `user_name` varchar(255) NOT NULL,
--   `phone` varchar(255) NOT NULL,
--   `description` text,
--   `product_id` bigint,
--   `quantity` int NOT NULL,
  
--   `status` int NOT NULL,
--   `created_at` bigint,
--   `updated_at` bigint,
--   PRIMARY KEY (`id`)
-- );