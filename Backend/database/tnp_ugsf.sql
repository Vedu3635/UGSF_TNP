-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2024 at 07:01 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tnp_ugsf`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `Id` int(11) NOT NULL,
  `Company_Name` varchar(255) NOT NULL,
  `Domain` varchar(255) NOT NULL,
  `Positions` int(5) NOT NULL,
  `Package_Min` int(15) NOT NULL,
  `Package_Max` int(15) NOT NULL,
  `Hiring_Date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `age` int(11) NOT NULL,
  `country` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `name`, `age`, `country`) VALUES
(22, 'kalp', 20, 'india'),
(23, 'kkk', 21, 'aus'),
(24, 'kkkkkk', 22, 'india');

-- --------------------------------------------------------

--
-- Table structure for table `higher_studies_details`
--

CREATE TABLE `higher_studies_details` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `university_name` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `intake_year` varchar(11) DEFAULT NULL,
  `Status` enum('Don''t get in University','Got into the University') NOT NULL DEFAULT 'Don''t get in University'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `higher_studies_details`
--

INSERT INTO `higher_studies_details` (`id`, `student_id`, `university_name`, `course_name`, `Country`, `intake_year`, `Status`) VALUES
(1, 5, 'IIT Manipur', 'AI/ML', 'India', '2026', 'Got into the University'),
(2, 8, 'MIT', 'Data Science in AI/ML', 'USA', '2027', 'Got into the University'),
(3, 48, '', '', '', '', 'Don\'t get in University'),
(40, 8, 'University of Toronto', 'Data Science', 'Canada', '2025', 'Got into the University'),
(41, 40, '', '', '', '', 'Don\'t get in University'),
(42, 44, 'Massachusetts Institute of Technology', 'Machine Learning', 'USA', '2027', 'Got into the University'),
(44, 51, 'University of Melbourne', 'Cybersecurity', 'Australia', '2026', 'Got into the University'),
(45, 56, '', '', '', '', 'Don\'t get in University'),
(46, 58, 'ETH Zurich', 'Robotics', 'Switzerland', '2026', 'Got into the University'),
(47, 60, 'Imperial College London', 'Data Analytics', 'UK', '2025', 'Got into the University'),
(48, 64, '', '', '', '', 'Don\'t get in University'),
(49, 66, 'California Institute of Technology', 'Software Engineering', 'USA', '2026', 'Got into the University'),
(50, 69, 'Peking University', 'AI and Data Science', 'China', '2025', 'Got into the University'),
(51, 72, '', '', '', '', 'Don\'t get in University');

-- --------------------------------------------------------

--
-- Table structure for table `placement_details`
--

CREATE TABLE `placement_details` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `year` int(4) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `package` int(15) DEFAULT 0,
  `position` varchar(255) DEFAULT NULL,
  `Status` enum('Placed','NotPlaced','OffCampus') NOT NULL DEFAULT 'NotPlaced',
  `Notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `placement_details`
--

INSERT INTO `placement_details` (`id`, `student_id`, `year`, `company_name`, `package`, `position`, `Status`, `Notes`) VALUES
(1, 6, 2022, 'IBM', 800000, 'Softwer Engineer', 'Placed', 'Got medium sgp than also got placed in IBM \r\nfor SE and selected in top 10.'),
(2, 7, 2022, 'Google', 1200000, 'Network Engineer', 'Placed', 'Got in goolge through offcampus and got selected through 5 rounds of process.'),
(3, 27, 2022, NULL, 0, NULL, 'NotPlaced', 'Eble to clear 2 rounds in 2 companys but didn\'t able to clear interview round.'),
(25, 6, 2022, 'Google', 2200000, 'AI Developer', 'Placed', 'Strong performance'),
(26, 7, 2023, 'Microsoft', 1800000, 'Data Analyst', 'Placed', 'Excellent analytical skills'),
(27, 27, 2022, 'TCS', 1500000, 'Network Engineer', 'Placed', 'Very dedicated'),
(29, 39, 2019, 'Wipro', 1300000, 'Full Stack Developer', 'Placed', 'Adaptable team player'),
(30, 43, 2023, 'Amazon', 2500000, 'Cloud Engineer', 'Placed', 'Exceptional coding skills'),
(31, 47, 2022, 'Accenture', 1600000, 'Data Scientist', 'Placed', 'Good at data analysis'),
(32, 49, 2021, 'IBM', 1700000, 'Machine Learning Engineer', 'Placed', 'Strong in ML concepts'),
(33, 53, 2023, 'Capgemini', 1200000, 'Software Tester', 'Placed', 'Thorough testing skills'),
(34, 55, 2022, 'Deloitte', 2000000, 'Business Analyst', 'Placed', 'Analytical mindset'),
(35, 57, 2021, 'Google', 2200000, 'Software Engineer', 'Placed', 'Outstanding problem-solving skills'),
(36, 59, 2022, 'Apple', 3000000, 'AI Engineer', 'Placed', 'Exceptional learning ability'),
(37, 61, 2023, 'Facebook', 2500000, 'Security Analyst', 'Placed', 'Attention to detail'),
(38, 65, 2022, 'Oracle', 1900000, 'Database Administrator', 'Placed', 'Database expert'),
(39, 71, 2021, 'Cognizant', 1400000, 'IT Consultant', 'Placed', 'Proactive approach'),
(40, 73, 2023, 'Siemens', 1500000, 'Network Engineer', 'Placed', 'Good networking skills'),
(41, 74, 2022, 'Adobe', 2700000, 'Frontend Developer', 'Placed', 'Creative and innovative');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `Id` int(11) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `MiddleName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `StudentId` varchar(10) NOT NULL,
  `Enrollment_Year` varchar(11) DEFAULT NULL,
  `PhoneNo` int(10) NOT NULL,
  `Program` varchar(50) NOT NULL,
  `Career_Choice` enum('Job Placement','Entrepreneurial Venture','Competitive Examination','Higher Studies') NOT NULL DEFAULT 'Job Placement',
  `Semester` enum('SEM 4','SEM 5','SEM 6','SEM 7','SEM 8') NOT NULL DEFAULT 'SEM 4',
  `Class` varchar(10) NOT NULL,
  `Batch` enum('A','B','C','D') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`Id`, `FirstName`, `MiddleName`, `LastName`, `Email`, `StudentId`, `Enrollment_Year`, `PhoneNo`, `Program`, `Career_Choice`, `Semester`, `Class`, `Batch`, `created_at`, `updated_at`) VALUES
(4, 'Vedant', '', 'Paghdar', '22DCE053@gmail.com', '22DCE059', '2022', 2147483647, 'CE', 'Entrepreneurial Venture', 'SEM 5', '5CE1', 'C', '2024-10-20 06:02:12', '2024-11-13 11:45:53'),
(5, 'Kalp', '', 'Modha', '22DCE059@gmail.com', '22DCE053', '2022', 1234567890, 'CE', 'Higher Studies', 'SEM 5', '5CE1', 'C', '2024-10-20 06:02:12', '2024-11-13 11:45:53'),
(6, 'Jeet', '', 'Modi', '22DCE056@gmail.com', '22DCE056', '2022', 987654321, 'CE', 'Job Placement', 'SEM 5', '5CE1', 'C', '2024-10-20 06:02:12', '2024-11-13 11:45:53'),
(7, 'Harsh', '', 'Thummar', '22DIT081@gmail.com', '22DIT81', '2022', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT2', 'C', '2024-10-20 06:02:12', '2024-11-13 11:45:53'),
(8, 'Jaimish', '', 'Satani', '22DCS102@gmail.com', '22DCS102', '2022', 1112223334, 'CSE', 'Higher Studies', 'SEM 5', '5CSE2', 'B', '2024-10-20 06:02:12', '2024-11-13 11:45:53'),
(27, 'Ravneshwar', NULL, 'Raval', '22DCS096@gmail.com', '22DCS096', '2022', 652369844, 'CSE', 'Job Placement', 'SEM 5', '5CSE2', 'B', '2024-10-20 11:59:38', '2024-11-13 11:45:53'),
(39, 'Aarav', 'P', 'Shah', 'aaravshah@gmail.com', '18DCE021', '2018', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE1', 'A', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(40, 'Pooja', 'K', 'Chauhan', 'poojachauhan@gmail.com', '19DCS022', '2019', 2147483647, 'CSE', 'Higher Studies', 'SEM 5', '5CSE1', 'B', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(41, 'Kiran', NULL, 'Joshi', 'kiranjoshi@gmail.com', '20DIT023', '2020', 2147483647, 'IT', 'Entrepreneurial Venture', 'SEM 5', '5IT1', 'A', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(42, 'Varun', NULL, 'Patel', 'varunpatel@gmail.com', '21DCE024', '2021', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE2', 'A', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(43, 'Nisha', 'M', 'Mehta', 'nishamehta@gmail.com', '22DCS025', '2022', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE2', 'B', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(44, 'Dhruv', NULL, 'Khan', 'dhruvkhan@gmail.com', '17DIT026', '2017', 2147483647, 'IT', 'Higher Studies', 'SEM 5', '5IT2', 'C', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(45, 'Aisha', 'N', 'Rana', 'aisharana@gmail.com', '18DCE027', '2018', 2147483647, '', 'Entrepreneurial Venture', 'SEM 5', '5CE1', '', '2024-11-07 16:28:21', '2024-11-13 11:49:35'),
(46, 'Rohan', 'P', 'Desai', 'rohdesai@gmail.com', '19DCS028', '2019', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE1', 'A', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(47, 'Krishna', NULL, 'Verma', 'kverma@gmail.com', '20DIT029', '2020', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT1', 'B', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(48, 'Sanya', 'V', 'Kapoor', 'sanya.kapoor@gmail.com', '21DCE030', '2021', 2147483647, 'CE', 'Higher Studies', 'SEM 5', '5CE2', 'A', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(49, 'Vikram', 'N', 'Modi', 'vikrammodi@gmail.com', '22DCS031', '2022', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE2', 'B', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(50, 'Sheetal', NULL, 'Patil', 'sheetalpatil@gmail.com', '17DIT032', '2017', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT2', 'C', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(51, 'Arjun', 'T', 'Bhatt', 'arjunbhatt@gmail.com', '18DCE033', '2018', 2147483647, 'CE', 'Higher Studies', 'SEM 5', '5CE1', 'C', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(52, 'Naina', 'R', 'Kapoor', 'nainakapoor@gmail.com', '19DCS034', '2019', 2147483647, 'CSE', 'Entrepreneurial Venture', 'SEM 5', '5CSE1', 'A', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(53, 'Manish', NULL, 'Jain', 'manishjain@gmail.com', '20DIT035', '2020', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT1', 'B', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(54, 'Sagar', 'K', 'Prajapati', 'sagarpra@gmail.com', '21DCE036', '2021', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE2', 'A', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(55, 'Ananya', 'V', 'Desai', 'ananyadesai@gmail.com', '22DCS037', '2022', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE2', 'B', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(56, 'Vikas', NULL, 'Rathod', 'vikasrathod@gmail.com', '17DIT038', '2017', 2147483647, 'IT', 'Higher Studies', 'SEM 5', '5IT2', 'C', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(57, 'Nikita', 'S', 'Sharma', 'nikitasharma@gmail.com', '18DCE039', '2018', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE1', 'C', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(58, 'Harsh', 'T', 'Gandhi', 'harshgandhi@gmail.com', '19DCS040', '2019', 2147483647, 'CSE', 'Higher Studies', 'SEM 5', '5CSE1', 'A', '2024-11-07 16:28:21', '2024-11-13 11:51:53'),
(59, 'Mira', NULL, 'Shah', 'mirashah@gmail.com', '17DCE001', '2017', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE1', 'A', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(60, 'Rahul', 'K', 'Patel', 'rahulpatel@gmail.com', '18DCS002', '2018', 2147483647, 'CSE', 'Higher Studies', 'SEM 5', '5CSE1', 'B', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(61, 'Sneha', 'R', 'Mehta', 'snehamehta@gmail.com', '19DIT003', '2019', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT1', 'A', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(62, 'Amit', NULL, 'Joshi', 'amitjoshi@gmail.com', '20AIML004', '2020', 2147483647, 'AIML', 'Entrepreneurial Venture', 'SEM 5', '5AIML1', 'C', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(63, 'Priya', 'S', 'Verma', 'priyaverma@gmail.com', '21DCE005', '2021', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE2', 'A', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(64, 'Jay', NULL, 'Modi', 'jaymodi@gmail.com', '22DCS006', '2022', 2147483647, 'CSE', 'Higher Studies', 'SEM 5', '5CSE2', 'B', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(65, 'Riya', NULL, 'Desai', 'riyadesai@gmail.com', '17DIT007', '2017', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT2', 'C', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(66, 'Meera', 'T', 'Rana', 'meerarana@gmail.com', '19DCE009', '2019', 2147483647, 'CE', 'Higher Studies', 'SEM 5', '5CE1', 'C', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(67, 'Vikas', 'N', 'Sharma', 'vikassharma@gmail.com', '20DCS010', '2020', 2147483647, 'CSE', 'Entrepreneurial Venture', 'SEM 5', '5CSE1', 'A', '2024-11-07 16:29:42', '2024-11-13 11:51:53'),
(68, 'Rohit', NULL, 'Kapoor', 'rohitkapoor@gmail.com', '21DIT011', '2021', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT1', 'B', '2024-11-07 16:29:42', '2024-11-13 11:52:44'),
(69, 'Sara', 'V', 'Gandhi', 'saragandhi@gmail.com', '17DCE013', '2017', 2147483647, 'CE', 'Higher Studies', 'SEM 5', '5CE2', 'A', '2024-11-07 16:29:42', '2024-11-13 11:52:44'),
(70, 'Parth', NULL, 'Patel', 'parthpatel@gmail.com', '18DCS014', '2018', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE2', 'B', '2024-11-07 16:29:42', '2024-11-13 11:52:44'),
(71, 'Simran', 'L', 'Gill', 'simrangill@gmail.com', '19DIT015', '2019', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT2', 'C', '2024-11-07 16:29:42', '2024-11-13 11:52:44'),
(72, 'Kavya', 'R', 'Mehta', 'kavyamehta@gmail.com', '21DCE017', '2021', 2147483647, 'CE', 'Higher Studies', 'SEM 5', '5CE1', 'B', '2024-11-07 16:29:42', '2024-11-13 11:52:44'),
(73, 'Lakshay', NULL, 'Jain', 'lakshayjain@gmail.com', '22DCS018', '2022', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE1', 'C', '2024-11-07 16:29:42', '2024-11-13 11:52:44'),
(74, 'Nikhil', 'V', 'Shah', 'nikhilshah@gmail.com', '17DIT019', '2017', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT1', 'A', '2024-11-07 16:29:42', '2024-11-13 11:52:44'),
(85, 'Vedant', NULL, 'Paghdar', '22DCE053@gmail.com', '22DCE059', NULL, 2022, '97244420998', '', '', 'SEM 5', '', '2024-11-21 16:41:14', '2024-11-21 16:41:14'),
(86, 'Kalp', NULL, 'Modha', '22DCE059@gmail.com', '22DCE053', NULL, 2022, '1234567890', '', '', 'SEM 5', '', '2024-11-21 16:41:14', '2024-11-21 16:41:14'),
(87, 'Jeet', NULL, 'Modi', '22DCE056@gmail.com', '22DCE056', NULL, 2022, '987654321', '', '', 'SEM 5', '', '2024-11-21 16:41:14', '2024-11-21 16:41:14'),
(88, 'Harsh', NULL, 'Thummar', '22DIT081@gmail.com', '22DIT81', NULL, 2022, '5646738920', '', '', 'SEM 5', '', '2024-11-21 16:41:14', '2024-11-21 16:41:14'),
(89, 'Jaimish', NULL, 'Satani', '22DCS102@gmail.com', '22DCS102', NULL, 2022, '1112223334', '', '', 'SEM 5', '', '2024-11-21 16:41:14', '2024-11-21 16:41:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `type` varchar(6) NOT NULL DEFAULT 'USER',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `type`, `password`) VALUES
(1, 'user', 'USER', '$2a$10$Ei66AEVkw0pdojx0d2NILe4x2fdHYVrMwX./RjxkKHSsExilazoni');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `higher_studies_details`
--
ALTER TABLE `higher_studies_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `placement_details`
--
ALTER TABLE `placement_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `higher_studies_details`
--
ALTER TABLE `higher_studies_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `placement_details`
--
ALTER TABLE `placement_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `higher_studies_details`
--
ALTER TABLE `higher_studies_details`
  ADD CONSTRAINT `higher_studies_details_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`Id`);

--
-- Constraints for table `placement_details`
--
ALTER TABLE `placement_details`
  ADD CONSTRAINT `placement_details_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
