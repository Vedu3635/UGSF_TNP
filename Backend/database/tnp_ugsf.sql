-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2025 at 06:17 PM
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
  `Industry_Domain` varchar(255) NOT NULL,
  `Website_URL` varchar(555) NOT NULL,
  `Contact_Name` varchar(255) NOT NULL,
  `Contact_Email` varchar(255) NOT NULL,
  `Contact_Phone` int(12) NOT NULL,
  `Job_Roles` varchar(255) NOT NULL,
  `Positions` int(5) NOT NULL,
  `Package_Min` int(15) NOT NULL,
  `Package_Max` int(15) NOT NULL,
  `Employment_Type` enum('Intership','Full TIme','Both') NOT NULL,
  `Eligibility_Criteria` varchar(255) NOT NULL,
  `Selection_Rounds` varchar(555) NOT NULL,
  `Hiring_Date` date NOT NULL,
  `Mode_Hiring` enum('Online','Offline','Hybrid') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`Id`, `Company_Name`, `Industry_Domain`, `Website_URL`, `Contact_Name`, `Contact_Email`, `Contact_Phone`, `Job_Roles`, `Positions`, `Package_Min`, `Package_Max`, `Employment_Type`, `Eligibility_Criteria`, `Selection_Rounds`, `Hiring_Date`, `Mode_Hiring`, `created_at`, `updated_at`) VALUES
(2, 'Elice', 'Health', 'https://www.edx.org/search?tab=course', 'John Will', 'abc@gmail.com', 1123456789, 'Frontend,Backend,DevOps', 10, 1, 10, 'Full TIme', 'CGP > 8.0', '5', '2025-01-16', 'Online', '2025-01-02 14:06:13', '2025-01-10 13:48:21'),
(3, 'TechInnovate Solutions', 'Web Development', 'https://techinnovate.com', 'John Doe', 'john.doe@techinnovate.com', 2147483647, 'Frontend Developer', 15, 5, 12, 'Intership', 'B.Tech CS', 'Online Test, HR Interview', '2025-01-25', 'Online', '2025-01-08 05:23:56', '2025-01-10 13:10:29'),
(4, 'DataDrive Analytics', 'Data Science', 'https://datadrive.com', 'Jane Smith', 'jane.smith@datadrive.com', 2147483647, 'Data Analyst', 10, 7, 15, 'Both', 'M.Sc Statistics', 'Written Test, Technical Interview', '2025-01-22', 'Offline', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(5, 'CodeCraft Technologies', 'Full Stack Development', 'https://codecraft.com', 'Michael Brown', 'michael.brown@codecraft.com', 2147483647, 'Full Stack Developer', 20, 6, 14, 'Full TIme', 'B.Tech IT', 'Online Test, Panel Interview', '2025-12-10', 'Hybrid', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(6, 'CloudNative Systems', 'Cloud Engineering', 'https://cloudnative.com', 'Emily Davis', 'emily.davis@cloudnative.com', 2147483647, 'Cloud Engineer', 12, 8, 16, 'Full TIme', 'M.Tech CS', 'Technical Test, HR Interview', '2025-12-05', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(7, 'AI Innovations', 'Artificial Intelligence', 'https://aiinnovations.com', 'Chris Wilson', 'chris.wilson@aiinnovations.com', 2147483647, 'Machine Learning Engineer', 8, 10, 20, 'Both', 'PhD AI', 'Online Test, Research Presentation', '2025-02-10', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(8, 'GreenEnergy Systems', 'Renewable Energy', 'https://greenenergy.com', 'Sophia Martinez', 'sophia.martinez@greenenergy.com', 2147483647, 'Energy Analyst', 5, 6, 12, 'Intership', 'B.Tech Mechanical', 'Technical Test, Panel Interview', '2025-01-05', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(9, 'CyberSecure Ltd', 'Cybersecurity', 'https://cybersecure.com', 'Liam Clark', 'liam.clark@cybersecure.com', 2147483647, 'Security Analyst', 18, 7, 14, 'Full TIme', 'B.Tech CS', 'Online Test, Live Hacking', '2024-03-15', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(10, 'Blockchain Inc', 'Blockchain', 'https://blockchaininc.com', 'Ava Lee', 'ava.lee@blockchaininc.com', 2147483647, 'Blockchain Developer', 10, 9, 18, 'Full TIme', 'B.Tech CS', 'Code Test, Technical Interview', '2025-02-20', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(11, 'MedTech Solutions', 'Healthcare IT', 'https://medtechsolutions.com', 'Mason Hall', 'mason.hall@medtechsolutions.com', 2147483647, 'Health IT Specialist', 7, 7, 14, 'Both', 'B.Tech Biotech', 'Technical Interview, HR Interview', '2024-01-25', 'Offline', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(12, 'AgriTech Innovators', 'Agriculture Technology', 'https://agritech.com', 'Isabella Walker', 'isabella.walker@agritech.com', 2147483647, 'IoT Engineer', 9, 0, 10, 'Full TIme', 'B.Tech ECE', 'Coding Test, HR Interview', '2025-03-05', 'Hybrid', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(13, 'SmartTech Corp', 'IoT', 'https://smarttech.com', 'Ethan Young', 'ethan.young@smarttech.com', 2147483647, 'IoT Developer', 12, 8, 13, '', 'B.Tech ECE', 'Technical Test, HR Interview', '2025-02-15', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(14, 'FinTech Global', 'Financial Technology', 'https://fintechglobal.com', 'Olivia Hernandez', 'olivia.hernandez@fintechglobal.com', 2147483647, 'FinTech Analyst', 10, 9, 15, 'Full TIme', 'MBA Finance', 'Aptitude Test, Case Study', '2024-02-01', 'Offline', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(15, 'EdTech Pioneers', 'Educational Technology', 'https://edtechpioneers.com', 'Lucas Moore', 'lucas.moore@edtechpioneers.com', 2147483647, 'EdTech Developer', 14, 6, 12, 'Intership', 'M.Sc CS', 'Technical Interview, HR Round', '2023-12-25', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(16, 'LogiChain Systems', 'Supply Chain', 'https://logichain.com', 'Charlotte Anderson', 'charlotte.anderson@logichain.com', 2147483647, 'Logistics Engineer', 11, 7, 0, 'Full TIme', 'B.Tech Mechanical', 'Group Discussion, HR Round', '2024-01-30', 'Offline', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(17, 'GameDev Studios', 'Game Development', 'https://gamedevstudios.com', 'Alexander Jackson', 'alexander.jackson@gamedevstudios.com', 2147483647, 'Game Developer', 6, 8, 14, 'Intership', 'B.Tech IT', 'Coding Test, Portfolio Review', '2024-03-01', 'Hybrid', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(18, 'SpaceTech Corp', 'Aerospace', 'https://spacetech.com', 'Amelia Thomas', 'amelia.thomas@spacetech.com', 2147483647, 'Aerospace Engineer', 4, 10, 20, 'Full TIme', 'M.Tech Aerospace', 'Aptitude Test, Technical Round', '2024-03-10', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(19, 'RetailNext Ltd', 'Retail Technology', 'https://retailnext.com', 'Elijah White', 'elijah.white@retailnext.com', 2147483647, 'Retail IT Analyst', 8, 6, 11, 'Full TIme', 'B.Tech IT', 'Coding Test, HR Interview', '2024-02-05', 'Offline', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(20, 'AutoMotive Innovators', 'Automotive', 'https://automotiveinnovators.com', 'Sophia Martinez', 'sophia.martinez@automotive.com', 2147483647, 'Automotive Engineer', 10, 8, 16, 'Intership', 'B.Tech Mechanical', 'Technical Interview, Panel Round', '2024-02-25', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(21, 'DeepAI Systems', 'Artificial Intelligence', 'https://deepaisystems.com', 'Daniel King', 'daniel.king@deepaisystems.com', 2147483647, 'AI Researcher', 5, 12, 25, 'Full TIme', 'PhD AI', 'Research Presentation, HR Interview', '2024-03-20', 'Online', '2025-01-08 05:23:56', '2025-01-08 05:23:56'),
(22, 'CleanWater Solutions', 'Environmental Technology', 'https://cleanwater.com', 'Avery Scott', 'avery.scott@cleanwater.com', 2147483647, 'Water Tech Specialist', 6, 5, 9, 'Full TIme', 'B.Tech Civil', 'Technical Test, HR Round', '2024-03-12', 'Hybrid', '2025-01-08 05:23:56', '2025-01-08 05:23:56');

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
  `higher_studies_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `university_name` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `intake_year` varchar(11) DEFAULT NULL,
  `status` enum('Don''t get in University','Got into the University') NOT NULL DEFAULT 'Don''t get in University'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `higher_studies_details`
--

INSERT INTO `higher_studies_details` (`higher_studies_id`, `student_id`, `university_name`, `course_name`, `country`, `intake_year`, `status`) VALUES
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
  `placement_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `year` int(4) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `package` int(15) DEFAULT 0,
  `position` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `placement_details`
--

INSERT INTO `placement_details` (`placement_id`, `student_id`, `year`, `company_name`, `package`, `position`, `status`, `notes`) VALUES
(29, 39, 2019, 'Wipro', 1300000, 'Full Stack Developer', 'Placed', 'Adaptable team player'),
(30, 43, 2023, 'Amazon', 2500000, 'Cloud Engineer', 'Placed', 'Exceptional coding skills'),
(31, 47, 2022, 'Accenture', 1600000, 'Data Scientist', 'Placed', 'Good at data analysis'),
(32, 49, 2021, 'IBM', 1700000, 'Machine Learning Engineer', 'Placed', 'Strong in ML concepts'),
(33, 53, 2023, 'Capgemini', 1200000, 'Software Tester', 'Placed', 'Thorough testing skills'),
(34, 55, 2022, 'Deloitte', 2000000, 'Business Analyst', 'Placed', 'Analytical mindset'),
(35, 57, 2021, 'Google', 2200000, 'Software Engineer', 'Placed', 'Outstanding problem-solving skills'),
(36, 59, 2022, 'Apple', 3000000, 'AI Engineer', 'Placed', 'Exceptional learning ability'),
(37, 61, NULL, NULL, 0, NULL, 'Not Placed', ''),
(38, 65, 2022, 'Oracle', 1900000, 'Database Administrator', 'Placed', 'Database expert'),
(39, 71, 2021, 'Cognizant', 1400000, 'IT Consultant', 'Placed', 'Proactive approach'),
(40, 73, 2023, 'Siemens', 1500000, 'Network Engineer', 'Placed', 'Good networking skills'),
(41, 74, 2022, 'Adobe', 2700000, 'Frontend Developer', 'Placed', 'Creative and innovative'),
(42, 42, 2024, 'TCS', 1200000, 'Junior Web Developer', 'Placed', 'Great Package'),
(43, 46, NULL, NULL, 0, NULL, 'Not Placed', 'Cannot clear the first round'),
(44, 50, NULL, NULL, 0, NULL, 'Not Placed', 'Didn\'t have minimum CGPA'),
(45, 48, 2019, 'Meta', 2000000, 'Softwear Engineer', 'Placed', 'Got selected in Meta after 15 rounds and excellent managing skills'),
(46, 54, NULL, NULL, 0, NULL, 'Not Placed', 'Didn\'t able to clear apptitude rounds in all companies'),
(47, 63, 2024, 'Twitter', 12000000, 'Server managing', 'Placed', 'Great performance.'),
(48, 70, 2022, 'TechnoX', 500000, 'Junior Developer', 'Placed', 'Tried in many companies but selected in TechnoX for good soft skills'),
(49, 68, NULL, NULL, 0, NULL, 'Not Placed', '');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `MiddleName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Enrollment_Id` varchar(12) NOT NULL,
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

INSERT INTO `students` (`student_id`, `FirstName`, `MiddleName`, `LastName`, `Email`, `Enrollment_Id`, `Enrollment_Year`, `PhoneNo`, `Program`, `Career_Choice`, `Semester`, `Class`, `Batch`, `created_at`, `updated_at`) VALUES
(39, 'Aarav', 'P', 'Shah', 'aaravshah@gmail.com', '18DCE021', '2018', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE1', 'A', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(40, 'Pooja', 'K', 'Chauhan', 'poojachauhan@gmail.com', '19DCS022', '2019', 2147483647, 'CSE', 'Higher Studies', 'SEM 5', '5CSE1', 'B', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(41, 'Kiran', NULL, 'Joshi', 'kiranjoshi@gmail.com', '20DIT023', '2020', 2147483647, 'IT', 'Entrepreneurial Venture', 'SEM 5', '5IT1', 'A', '2024-11-07 16:28:21', '2025-02-09 17:16:12'),
(42, 'Varun', NULL, 'Patel', 'varunpatel@gmail.com', '21DCE024', '2021', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE2', 'A', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(43, 'Nisha', 'M', 'Mehta', 'nishamehta@gmail.com', '22DCS025', '2022', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE2', 'B', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(44, 'Dhruv', NULL, 'Khan', 'dhruvkhan@gmail.com', '17DIT026', '2017', 2147483647, 'IT', 'Higher Studies', 'SEM 5', '5IT2', 'C', '2024-11-07 16:28:21', '2024-11-13 11:45:53'),
(45, 'Aisha', 'N', 'Rana', 'aisharana@gmail.com', '18DCE027', '2018', 2147483647, '', 'Entrepreneurial Venture', 'SEM 5', '5CE1', '', '2024-11-07 16:28:21', '2024-11-13 11:49:35'),
(46, 'Rohan', 'P', 'Desai', 'rohdesai@gmail.com', '19DCS028', '2019', 2147483647, 'CSE', 'Job Placement', 'SEM 5', '5CSE1', 'A', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(47, 'Krishna', NULL, 'Verma', 'kverma@gmail.com', '20DIT029', '2020', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT1', 'B', '2024-11-07 16:28:21', '2024-11-13 11:47:26'),
(48, 'Sanya', 'V', 'Kapoor', 'sanya.kapoor@gmail.com', '21DCE030', '2021', 2147483647, 'CE', 'Job Placement', 'SEM 5', '5CE2', 'A', '2024-11-07 16:28:21', '2025-01-11 05:43:40'),
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
(74, 'Nikhil', 'V', 'Shah', 'nikhilshah@gmail.com', '17DIT019', '2017', 2147483647, 'IT', 'Job Placement', 'SEM 5', '5IT1', 'A', '2024-11-07 16:29:42', '2024-11-13 11:52:44');

--
-- Triggers `students`
--
DELIMITER $$
CREATE TRIGGER `after_students_insert_higher_studies` AFTER INSERT ON `students` FOR EACH ROW BEGIN
    IF NEW.Career_Choice = 'Higher Studies' THEN
        INSERT INTO higher_studies_details (student_id, university_name, course_name, country, intake_year, status)
        VALUES (NEW.student_id, NULL, NULL, NULL, NULL, '');
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_students_insert_placement` AFTER INSERT ON `students` FOR EACH ROW BEGIN
    IF NEW.Career_Choice = 'Job Placement' THEN
        INSERT INTO placement_details (student_id, year, company_name, package, position, Status, notes)
        VALUES (NEW.student_id, NULL, NULL, 0, NULL, 'Not Placed', '');
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_students_update_career_choice` AFTER UPDATE ON `students` FOR EACH ROW BEGIN
    -- If the student switches to Job Placement
    IF OLD.Career_Choice != 'Job Placement' AND NEW.Career_Choice = 'Job Placement' THEN
        INSERT INTO placement_details (student_id, year, company_name, package, position, status, notes)
        VALUES (NEW.student_id, NULL, NULL, 0, NULL, 'Not Placed', '');
        
        DELETE FROM higher_studies_details WHERE student_id = NEW.student_id;
    END IF;

    -- If the student switches to Higher Studies
    IF OLD.Career_Choice != 'Higher Studies' AND NEW.Career_Choice = 'Higher Studies' THEN
        INSERT INTO higher_studies_details (student_id, university_name, course_name, country, intake_year, notes)
        VALUES (NEW.student_id, NULL, NULL, NULL, NULL, '');
        
        DELETE FROM placement_details WHERE student_id = NEW.student_id;
    END IF;

    -- If the student switches to Entrepreneurial Venture
    IF OLD.Career_Choice NOT IN ('Entrepreneurial Venture') AND NEW.Career_Choice = 'Entrepreneurial Venture' THEN
        DELETE FROM placement_details WHERE student_id = NEW.student_id;
        DELETE FROM higher_studies_details WHERE student_id = NEW.student_id;
    END IF;

END
$$
DELIMITER ;

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
(1, 'user', 'ADMIN', '$2a$10$Ei66AEVkw0pdojx0d2NILe4x2fdHYVrMwX./RjxkKHSsExilazoni'),
(2, 'all', 'USER', '$2b$10$w1t0k9ZyzfzNm0H/KLKmX.MOpgGMOJwx2jOhyqBUxpks4B8kcnM9K');

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
  ADD PRIMARY KEY (`higher_studies_id`),
  ADD UNIQUE KEY `student_id_2` (`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `placement_details`
--
ALTER TABLE `placement_details`
  ADD PRIMARY KEY (`placement_id`),
  ADD UNIQUE KEY `student_id_2` (`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `higher_studies_details`
--
ALTER TABLE `higher_studies_details`
  MODIFY `higher_studies_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `placement_details`
--
ALTER TABLE `placement_details`
  MODIFY `placement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `higher_studies_details`
--
ALTER TABLE `higher_studies_details`
  ADD CONSTRAINT `higher_studies_details_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- Constraints for table `placement_details`
--
ALTER TABLE `placement_details`
  ADD CONSTRAINT `placement_details_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
