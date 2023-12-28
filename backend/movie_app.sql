-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2023 at 04:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) DEFAULT NULL,
  `user_uuid` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `publish_year` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `uuid`, `user_uuid`, `title`, `publish_year`, `image`, `created_at`, `updated_at`) VALUES
(1, 'dc7c1cc8-a8b0-40ed-857d-9590d27f0e6d', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie Test', 2022, '940b384d-2bad-44b2-8a8f-1b30262c1445-images-test.jpg', '2023-12-27 12:58:41', '2023-12-27 12:58:41'),
(2, 'cccb35cd-1bea-484d-8a47-ebe7f8e3b302', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie2', 2022, '0ca10705-10f5-47c1-9907-78652ae68c06-', '2023-12-27 12:58:52', '2023-12-27 12:58:52'),
(3, 'e0475296-0eba-4f3e-bc25-e60869b42d97', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie2', 2022, '0ca10705-10f5-47c1-9907-78652ae68c06-', '2023-12-27 12:58:59', '2023-12-27 12:58:59'),
(4, 'a6514058-0522-4a05-a47f-7673d492c815', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie2', 2022, '0ca10705-10f5-47c1-9907-78652ae68c06-', '2023-12-27 12:59:06', '2023-12-27 12:59:06'),
(5, '8c9f0154-da5a-4b5e-96e8-eaa92ef35982', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie2', 2022, '0ca10705-10f5-47c1-9907-78652ae68c06-', '2023-12-27 12:59:15', '2023-12-27 12:59:15'),
(6, '48c3b51d-f6f2-4f34-ba88-efecf4d77413', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie2', 2022, '0ca10705-10f5-47c1-9907-78652ae68c06-', '2023-12-27 12:59:21', '2023-12-27 12:59:21'),
(7, '1c32c09f-8c6c-41e8-b0e9-b53fe916e355', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie2', 2022, '0ca10705-10f5-47c1-9907-78652ae68c06-', '2023-12-27 12:59:34', '2023-12-27 12:59:34'),
(8, '838a0075-1e2f-48e7-a225-ec622448b12a', '21ab4687-bc69-419d-8741-ab30fa3ca606', 'Movie2', 2022, '0ca10705-10f5-47c1-9907-78652ae68c06-', '2023-12-27 12:59:41', '2023-12-27 12:59:41'),
(9, 'bef30419-3205-4550-bce1-02b130ebd2be', '44f36a83-d723-4e6b-bdf4-75e2e9cf5c77', 'Movie9', 2023, '269225b8-0b42-4e27-b402-c5e24bdd1f30-HotLavaposter.jpg', '2023-12-27 13:09:21', '2023-12-27 13:09:21'),
(10, 'd8922959-c070-47f8-8b90-0505c2f9a9cb', '44f36a83-d723-4e6b-bdf4-75e2e9cf5c77', 'Movie10', 2023, '31c42700-3a78-4d2c-a60a-5dbe133822bd-HotLavaposter.jpg', '2023-12-27 13:09:31', '2023-12-27 13:09:31'),
(11, '18e75513-8ef0-4421-bfbc-519d318ea0b5', '44f36a83-d723-4e6b-bdf4-75e2e9cf5c77', 'Movie11', 2023, '631717d7-6cdf-4d72-bf19-ba638d2f2df4-HotLavaposter.jpg', '2023-12-27 13:09:41', '2023-12-27 13:09:41');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `uuid`, `email`, `password`, `token`, `created_at`, `updated_at`) VALUES
(1, '21ab4687-bc69-419d-8741-ab30fa3ca606', 'demo1@gmail.com', '$2b$10$R7RgFSR9WoLMQAauWQ61/OWsJsQJsqJfYeXU2hcHwmOU03aFgehM.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZW1vMUBnbWFpbC5jb20iLCJ1c2VyX3V1aWQiOiIyMWFiNDY4Ny1iYzY5LTQxOWQtODc0MS1hYjMwZmEzY2E2MDYiLCJpYXQiOjE3MDM3NTc4OTAsImV4cCI6MTcwMzg0NDI5MH0.vMItAaBDJouFev686rnBegXCWSvVAyquveymu4SbYL0', '2023-12-27 10:02:07', '2023-12-27 10:02:07'),
(2, '44f36a83-d723-4e6b-bdf4-75e2e9cf5c77', 'demo2@gmail.com', '$2b$10$XEUyQI7MWErEUf1hWKG4S.GxfSOpdATRjBPd.Y5aTtjhWlVROWZPa', NULL, '2023-12-27 10:02:34', '2023-12-27 10:02:34'),
(3, '06a59ab1-506a-4bac-9d3a-4d6eb691621b', 'demo3@gmail.com', '$2b$10$iEpLpPxfV6nNcogysN4aAesxsSSRsePrm7Bb.8Uk3KHMk6tqwBTwe', NULL, '2023-12-27 10:02:49', '2023-12-27 10:02:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_uuid` (`user_uuid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`user_uuid`) REFERENCES `user` (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
