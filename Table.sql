-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2021 at 07:06 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weather_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `fetched_info`
--

CREATE TABLE `fetched_info` (
  `weather_main` varchar(100) NOT NULL,
  `weather_desc` varchar(100) NOT NULL,
  `weather_temp` float NOT NULL,
  `weather_wind` float NOT NULL,
  `weather_when` datetime NOT NULL,
  `temp_low` float NOT NULL,
  `temp_high` float NOT NULL,
  `humidity` int(11) NOT NULL,
  `pressure` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `weather_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fetched_info`
--

INSERT INTO `fetched_info` (`weather_main`, `weather_desc`, `weather_temp`, `weather_wind`, `weather_when`, `temp_low`, `temp_high`, `humidity`, `pressure`, `city`, `country`, `weather_id`) VALUES
('Clouds', 'broken clouds', 291.06, 4.12, '2021-08-30 22:51:01', 289.22, 292.13, 63, 1029, 'Blackpool', 'GB', 24),
('Clouds', 'broken clouds', 300.28, 1.34, '2021-08-30 22:50:20', 298.13, 301.94, 80, 1012, 'Tokyo', 'JP', 25),
('Clouds', 'overcast clouds', 293.27, 1.54, '2021-08-30 22:50:24', 293.27, 293.27, 100, 1018, 'Kathmandu', 'NP', 26),
('Clouds', 'broken clouds', 296.53, 1.21, '2021-08-30 22:50:30', 296.53, 296.7, 85, 1016, 'Nagano', 'JP', 27),
('Mist', 'mist', 301.2, 3.6, '2021-08-30 22:50:38', 301.2, 301.2, 94, 1008, 'Delhi', 'IN', 28),
('Clouds', 'overcast clouds', 288.16, 0.55, '2021-08-30 22:50:58', 288.16, 288.16, 84, 1016, 'Hulu', 'CN', 29);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fetched_info`
--
ALTER TABLE `fetched_info`
  ADD PRIMARY KEY (`weather_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fetched_info`
--
ALTER TABLE `fetched_info`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
