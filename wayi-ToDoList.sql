-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:8889
-- 產生時間： 2023 年 12 月 01 日 16:12
-- 伺服器版本： 5.7.39
-- PHP 版本： 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `wayi-ToDoList`
--

-- --------------------------------------------------------

--
-- 資料表結構 `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL COMMENT '任務名稱',
  `description` varchar(100) DEFAULT NULL COMMENT '任務描述',
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `task`
--

INSERT INTO `task` (`id`, `name`, `description`, `is_completed`, `created_at`, `updated_at`) VALUES
(28, '寫作業', '希望可以通過考試！', 0, '2023-12-01 01:06:30', '2023-12-01 16:09:33'),
(29, '睡覺', '我真的好想睡覺...', 0, '2023-12-01 01:06:56', '2023-12-01 16:09:33'),
(30, '吃涼麵', '劉媽媽涼麵一定要加三合一味噌湯！', 0, '2023-12-01 01:07:33', '2023-12-01 16:09:33'),
(33, '曬衣服', '冬天到了好多要洗...', 0, '2023-12-01 15:23:19', '2023-12-01 16:09:33');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
