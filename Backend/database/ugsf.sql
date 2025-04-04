-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2025 at 09:03 AM
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
-- Database: `ugsf`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumni`
--

CREATE TABLE `alumni` (
  `alumni_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `enrollment_id` varchar(15) NOT NULL,
  `graduation_year` year(4) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `current_status` enum('working','higher_studies','entrepreneur','other') NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `linkeding` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`alumni_id`, `user_id`, `first_name`, `middle_name`, `last_name`, `enrollment_id`, `graduation_year`, `degree`, `department`, `current_status`, `company`, `job_title`, `location`, `linkeding`) VALUES
(1, 2, 'Alice', NULL, 'Smith', 'ENR2020001', '2020', 'B.Tech', 'Computer Science', 'working', 'Google', NULL, NULL, NULL),
(2, 17, 'Michael', 'D', 'Johnson', 'ENR2015001', '2015', 'B.Tech', 'Computer Science', 'working', 'Google', NULL, NULL, NULL),
(3, 18, 'Raj', 'E', 'Patel', 'ENR2016A01', '2016', 'B.Tech', 'Mechanical Engineering', 'working', 'Tesla', NULL, NULL, NULL),
(4, 19, 'Kavita', 'F', 'Sharma', 'ENR2017B02', '2017', 'M.Tech', 'Electronics', '', 'Stanford University', NULL, NULL, NULL),
(5, 20, 'Liam', 'G', 'Roberts', 'ENR2018C03', '2018', 'B.Tech', 'Civil Engineering', 'entrepreneur', 'Self-employed', NULL, NULL, NULL),
(6, 21, 'Daniel', 'H', 'Lee', 'ENR2019D04', '2019', 'B.Sc', 'Data Science', 'working', 'Facebook', NULL, NULL, NULL),
(7, 22, 'Natalie', 'I', 'Martin', 'ENR2020E05', '2020', 'MBA', 'Business Administration', 'working', 'Amazon', NULL, NULL, NULL),
(8, 23, 'William', 'J', 'Jackson', 'ENR2021F06', '2021', 'B.Tech', 'Software Engineering', '', 'Harvard University', NULL, NULL, NULL),
(9, 24, 'Hannah', 'K', 'Thomas', 'ENR2022G07', '2022', 'BBA', 'Finance', 'working', 'Goldman Sachs', NULL, NULL, NULL),
(10, 25, 'James', 'L', 'Wright', 'ENR2023H08', '2023', 'BCA', 'Computer Applications', '', NULL, NULL, NULL, NULL),
(11, 26, 'Sophia', 'M', 'Lopez', 'ENR2024I09', '2024', 'M.Tech', 'Artificial Intelligence', 'working', 'OpenAI', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `industry_domain` varchar(255) NOT NULL,
  `website_url` varchar(555) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_phone` varchar(15) NOT NULL,
  `job_roles` varchar(255) NOT NULL,
  `positions` int(11) NOT NULL,
  `package_min` decimal(10,2) NOT NULL,
  `package_max` decimal(10,2) NOT NULL,
  `job_location` varchar(50) DEFAULT NULL,
  `employment_type` enum('Internship','Full Time','Both') NOT NULL,
  `eligibility_criteria` varchar(255) DEFAULT NULL,
  `selection_rounds` varchar(555) DEFAULT NULL,
  `hiring_date` date NOT NULL,
  `mode_hiring` enum('Online','Offline','Hybrid') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_id`, `company_name`, `industry_domain`, `website_url`, `contact_name`, `contact_email`, `contact_phone`, `job_roles`, `positions`, `package_min`, `package_max`, `job_location`, `employment_type`, `eligibility_criteria`, `selection_rounds`, `hiring_date`, `mode_hiring`, `created_at`, `updated_at`) VALUES
(23, 'Amazon', 'E-commerce', 'https://amazon.jobs', 'Alice Johnson', 'alice.j@amazon.com', '3456789012', 'Data Analyst, Full Stack Developer', 12, 900000.00, 3200000.00, NULL, 'Full Time', 'YES', '5', '2024-12-09', 'Offline', '2025-03-01 17:41:43', '2025-03-02 17:59:39'),
(25, 'TCS', 'IT Services', 'https://tcs.com', 'Rajesh Kumar', 'rajesh.kumar@tcs.com', '5678901234', 'Software Developer, Cybersecurity Analyst', 20, 600000.00, 2000000.00, NULL, 'Full Time', NULL, '2', '2025-07-01', 'Online', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(26, 'Infosys', 'IT Services', 'https://infosys.com', 'Priya Sharma', 'priya.sharma@infosys.com', '6789012345', 'Business Analyst, Java Developer', 15, 700000.00, 2500000.00, NULL, 'Internship', 'YES', '3', '2025-05-28', 'Offline', '2025-03-01 17:41:43', '2025-03-17 03:53:25'),
(27, 'Goldman Sachs', 'Finance', 'https://goldmansachs.com', 'Michael Carter', 'michael.carter@gs.com', '7890123456', 'Financial Analyst, Data Engineer', 5, 1200000.00, 3800000.00, NULL, 'Full Time', 'YES', '4', '2025-06-10', 'Hybrid', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(28, 'JP Morgan', 'Finance', 'https://jpmorgan.com', 'Sarah Green', 'sarah.green@jpmorgan.com', '8901234567', 'Investment Banker, Risk Analyst', 7, 1500000.00, 4500000.00, NULL, 'Both', '', '3', '2025-03-29', 'Online', '2025-03-01 17:41:43', '2025-03-22 04:01:31'),
(29, 'SpaceX', 'Aerospace', 'https://spacex.com/careers', 'Elon Musgrave', 'elon.m@spacex.com', '9012345678', 'Aerospace Engineer, Avionics Engineer', 4, 1800000.00, 5500000.00, NULL, 'Full Time', 'YES', '5', '2025-06-20', 'Offline', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(30, 'Accenture', 'Consulting', 'https://accenture.com', 'Robert Lee', 'robert.lee@accenture.com', '0123456789', 'Management Consultant, DevOps Engineer', 18, 900000.00, 3000000.00, NULL, 'Both', NULL, '3', '2025-05-15', 'Hybrid', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(31, 'IBM', 'Technology', 'https://ibm.com', 'Olivia Brown', 'olivia.brown@ibm.com', '1122334455', 'Cloud Architect, Data Scientist', 9, 0.00, 3500000.00, NULL, 'Full Time', 'YES', '4', '2025-03-24', 'Online', '2025-03-01 17:41:43', '2025-03-23 16:34:34'),
(32, 'Deloitte', 'Consulting', 'https://deloitte.com', 'Samuel White', 'samuel.white@deloitte.com', '2233445566', 'Tax Consultant, Cybersecurity Expert', 10, 950000.00, 2800000.00, NULL, 'Internship', 'YES', '2', '2025-06-05', 'Offline', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(33, 'Oracle', 'Technology', 'https://oracle.com', 'Emily Davis', 'emily.davis@oracle.com', '3344556677', 'Database Administrator, DevOps Engineer', 6, 1000000.00, 3300000.00, NULL, 'Both', NULL, '3', '2025-03-09', 'Hybrid', '2025-03-01 17:41:43', '2025-03-21 12:09:34'),
(34, 'Capgemini', 'IT Services', 'https://capgemini.com', 'Ankit Verma', 'ankit.verma@capgemini.com', '4455667788', 'Software Engineer, Cloud Specialist', 14, 750000.00, 2300000.00, NULL, 'Full Time', 'YES', '3', '2025-05-28', 'Online', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(35, 'Cisco', 'Networking', 'https://cisco.com', 'Natalie Jones', 'natalie.jones@cisco.com', '5566778899', 'Network Engineer, AI Researcher', 8, 1100000.00, 3700000.00, NULL, 'Internship', NULL, '4', '2025-06-30', 'Offline', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(36, 'Adobe', 'Software', 'https://adobe.com', 'David Wilson', 'david.wilson@adobe.com', '6677889900', 'UI/UX Designer, Software Developer', 5, 1050000.00, 3400000.00, NULL, 'Both', 'YES', '3', '2025-07-05', 'Hybrid', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(37, 'LinkedIn', 'Social Media', 'https://linkedin.com/careers', 'Jessica Hall', 'jessica.hall@linkedin.com', '7788990011', 'Product Manager, Data Engineer', 3, 1200000.00, 4000000.00, NULL, 'Full Time', 'YES', '2', '2025-06-15', 'Online', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(38, 'Flipkart', 'E-commerce', 'https://flipkart.com/careers', 'Karan Mehta', 'karan.mehta@flipkart.com', '8899001122', 'Data Scientist, Frontend Developer', 7, 850000.00, 2800000.00, NULL, 'Both', '', '3', '2025-03-13', 'Hybrid', '2025-03-01 17:41:43', '2025-03-22 02:02:14'),
(39, 'Wipro', 'IT Services', 'https://wipro.com', 'Neha Sharma', 'neha.sharma@wipro.com', '9900112233', 'Software Developer, Business Analyst', 11, 800000.00, 2200000.00, NULL, 'Internship', 'YES', '2', '2025-07-02', 'Offline', '2025-03-01 17:41:43', '2025-03-01 17:41:43'),
(43, 'Onmi', 'ffff', 'https://chatgpt.com/', 'sdasdas', 'jane.smith@microsoft.com', '0000000000', 'aasasd', 4, 3.00, 8.00, 'Ahmedabad', '', '8.5', '4', '2025-03-07', 'Offline', '2025-03-20 16:21:30', '2025-03-21 12:12:32');

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

CREATE TABLE `connections` (
  `connection_id` int(11) NOT NULL,
  `requester_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `status` enum('pending','connected','rejected','blocked') NOT NULL DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `accepted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `connections`
--

INSERT INTO `connections` (`connection_id`, `requester_id`, `receiver_id`, `status`, `requested_at`, `accepted_at`) VALUES
(2, 1, 2, '', '2025-03-01 17:31:31', NULL),
(3, 3, 5, 'pending', '2025-03-01 17:31:31', NULL),
(4, 4, 6, '', '2025-03-01 17:31:31', NULL),
(5, 2, 7, '', '2025-03-01 17:31:31', NULL),
(6, 5, 8, 'pending', '2025-03-01 17:31:31', NULL),
(7, 6, 9, '', '2025-03-01 17:31:31', NULL),
(8, 7, 10, 'pending', '2025-03-01 17:31:31', NULL),
(9, 8, 1, '', '2025-03-01 17:31:31', NULL),
(10, 9, 3, '', '2025-03-01 17:31:31', NULL),
(11, 10, 4, 'pending', '2025-03-01 17:31:31', NULL),
(12, 1, 2, '', '2025-03-01 17:32:53', NULL),
(13, 3, 5, 'pending', '2025-03-01 17:32:53', NULL),
(14, 4, 6, 'blocked', '2025-03-01 17:32:53', NULL),
(15, 2, 7, '', '2025-03-01 17:32:53', NULL),
(16, 5, 8, 'pending', '2025-03-01 17:32:53', NULL),
(17, 6, 9, '', '2025-03-01 17:32:53', NULL),
(18, 7, 10, 'rejected', '2025-03-01 17:32:53', NULL),
(19, 8, 1, '', '2025-03-01 17:32:53', NULL),
(20, 9, 3, 'rejected', '2025-03-01 17:32:53', NULL),
(21, 10, 4, 'blocked', '2025-03-01 17:32:53', NULL),
(22, 1, 2, '', '2025-03-01 17:33:44', NULL),
(23, 3, 5, 'pending', '2025-03-01 17:33:44', NULL),
(24, 4, 6, 'blocked', '2025-03-01 17:33:44', NULL),
(25, 2, 7, '', '2025-03-01 17:33:44', NULL),
(26, 5, 8, 'pending', '2025-03-01 17:33:44', NULL),
(27, 6, 9, '', '2025-03-01 17:33:44', NULL),
(28, 7, 10, 'rejected', '2025-03-01 17:33:44', NULL),
(29, 8, 1, '', '2025-03-01 17:33:44', NULL),
(30, 9, 3, 'rejected', '2025-03-01 17:33:44', NULL),
(31, 10, 4, 'blocked', '2025-03-01 17:33:44', NULL),
(32, 1, 2, 'connected', '2025-03-01 17:34:15', NULL),
(33, 3, 5, 'pending', '2025-03-01 17:34:15', NULL),
(34, 4, 6, 'blocked', '2025-03-01 17:34:15', NULL),
(35, 2, 7, 'connected', '2025-03-01 17:34:15', NULL),
(36, 5, 8, 'pending', '2025-03-01 17:34:15', NULL),
(37, 6, 9, 'connected', '2025-03-01 17:34:15', NULL),
(38, 7, 10, 'rejected', '2025-03-01 17:34:15', NULL),
(39, 8, 1, 'connected', '2025-03-01 17:34:15', NULL),
(40, 9, 3, 'rejected', '2025-03-01 17:34:15', NULL),
(41, 10, 4, 'blocked', '2025-03-01 17:34:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `organizer_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `registration_link` varchar(555) DEFAULT NULL,
  `organized_by` varchar(225) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `organizer_id`, `title`, `description`, `event_date`, `event_time`, `location`, `registration_link`, `organized_by`, `created_at`) VALUES
(1, 1, 'Tech Meetup 2025', 'Networking event for alumni and students', '2025-03-15', '14:54:46', 'New York, USA', NULL, 'Google Alumni Network', '2025-03-01 09:27:27'),
(12, 1, 'Tech Alumni Meetup 2025', 'An exclusive networking event for tech alumni.', '2025-06-10', '18:00:00', 'New York, USA', 'https://events.techmeetup.com', 'Google Alumni Network', '2025-03-01 17:24:49'),
(13, 2, 'AI and Data Science Conference', 'Learn about the latest AI advancements.', '2025-04-22', '10:30:00', 'San Francisco, USA', 'https://aiconference.com/register', 'DeepMind Research', '2025-03-01 17:24:49'),
(14, 23, 'Cybersecurity Awareness Webinar', 'A session on best practices in cybersecurity.', '2025-05-18', '16:00:00', 'Online (Zoom)', NULL, 'Cisco Security Team', '2025-03-01 17:24:49'),
(15, 18, 'Startup & Entrepreneurship Workshop', 'Insights on starting a tech business.', '2025-07-15', '14:00:00', 'Bangalore, India', 'https://startupworkshop.com/signup', 'Microsoft Ventures', '2025-03-01 17:24:49'),
(16, 25, 'Blockchain for Future', 'How blockchain is shaping industries.', '2025-08-05', '15:00:00', 'Singapore', 'https://blockchainfuture.com', 'Binance Labs', '2025-03-01 17:24:49'),
(17, 31, 'Women in Tech Panel Discussion', 'Encouraging diversity in technology.', '2025-09-12', '17:00:00', 'Los Angeles, USA', 'https://womenintech.com', 'Adobe Women in Tech', '2025-03-01 17:24:49'),
(18, 30, 'Full Stack Development Bootcamp', 'Hands-on training in MERN stack.', '2025-10-20', '09:00:00', 'Hyderabad, India', 'https://fullstackbootcamp.com', 'Amazon Developers Group', '2025-03-01 17:24:49'),
(19, 22, 'Game Development Hackathon', 'Compete in a game development challenge.', '2025-11-25', '11:00:00', 'Montreal, Canada', 'https://gamehackathon.com', 'Ubisoft Game Studio', '2025-03-01 17:24:49'),
(20, 19, 'Cloud Computing Summit', 'Exploring cloud technologies and trends.', '2025-12-05', '13:00:00', 'Austin, USA', 'https://cloudsummit.com/register', 'Dell Cloud Services', '2025-03-01 17:24:49'),
(21, 20, 'Alumni Career Fair 2026', 'Connect with recruiters from top companies.', '2026-01-10', '10:00:00', 'London, UK', 'https://alumnicareerfair.com', 'Global Alumni Association', '2025-03-01 17:24:49');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `faculty_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`faculty_id`, `user_id`, `first_name`, `middle_name`, `last_name`, `department`, `designation`) VALUES
(1, 1, 'John', NULL, 'Doe', 'Computer Science', 'Professor'),
(4, 30, 'Alice', 'B', 'Smith', 'Mechanical Engineering', 'Associate Professor'),
(5, 31, 'Brian', 'C', 'Wilson', 'Electrical Engineering', 'Lecturer');

-- --------------------------------------------------------

--
-- Table structure for table `higher_studies`
--

CREATE TABLE `higher_studies` (
  `higher_studies_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `university_name` varchar(255) DEFAULT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `admission_year` year(4) DEFAULT NULL,
  `higher_studies_status` enum('admitted','in process','rejected') NOT NULL,
  `higher_studies_notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `higher_studies`
--

INSERT INTO `higher_studies` (`higher_studies_id`, `student_id`, `university_name`, `course_name`, `country`, `admission_year`, `higher_studies_status`, `higher_studies_notes`) VALUES
(1, 3, NULL, NULL, NULL, NULL, '', NULL),
(2, 5, 'MIT', 'M.S. in Civil Engineering', NULL, '2025', '', NULL),
(3, 7, 'IIT Bombay', 'M.Tech in Structural Engineering', 'India', '2025', '', NULL),
(4, 9, 'Stanford University', 'M.S. in Transportation Engineering', 'USA', '2026', 'admitted', NULL),
(5, 11, 'University of Toronto', 'M.S. in Environmental Engineering', 'Canada', '2026', 'admitted', NULL),
(6, 13, NULL, NULL, NULL, NULL, '', NULL),
(7, 15, NULL, NULL, NULL, NULL, '', NULL),
(8, 17, 'University of Melbourne', 'M.S. in Cybersecurity', 'Australia', '2026', 'admitted', NULL),
(9, 19, 'Carnegie Mellon University', 'M.S. in Data Science', 'USA', '2025', 'admitted', NULL),
(10, 21, 'ETH Zurich', 'M.S. in Information Technology', 'Switzerland', '2026', 'admitted', NULL),
(11, 23, NULL, NULL, NULL, NULL, '', NULL),
(12, 25, 'MIT', 'M.S. in Civil Engineering', 'USA', '2025', 'admitted', NULL),
(13, 27, 'IIT Bombay', 'M.Tech in Structural Engineering', 'India', '2025', 'in process', NULL),
(14, 29, 'Stanford University', 'M.S. in Transportation Engineering', 'USA', '2026', 'rejected', NULL),
(15, 31, NULL, NULL, NULL, NULL, '', NULL),
(16, 33, 'SVNIT- Surat', 'Data Science', 'India', '2027', 'admitted', NULL),
(17, 35, 'Harvard University', 'AI/ML', 'USA', '2025', 'admitted', NULL),
(18, 37, NULL, NULL, NULL, NULL, '', NULL),
(104, 4, NULL, NULL, NULL, NULL, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_postings`
--

CREATE TABLE `job_postings` (
  `job_postings_id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `job_description` text NOT NULL,
  `apply_link` varchar(555) DEFAULT NULL,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `job_type` enum('full time','part time','internship') NOT NULL,
  `salary_range` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_postings`
--

INSERT INTO `job_postings` (`job_postings_id`, `alumni_id`, `job_title`, `company`, `location`, `job_description`, `apply_link`, `posted_at`, `job_type`, `salary_range`) VALUES
(1, 1, 'Software Engineer', 'Google', 'California, USA', 'Exciting role for new graduates', 'https://careers.google.com', '2025-03-01 09:16:46', 'full time', ''),
(2, 1, 'Software Engineer', 'Google', 'California, USA', 'Exciting role for new graduates', 'https://careers.google.com', '2025-03-01 17:20:23', '', '1200000-1500000'),
(3, 2, 'Data Scientist', 'Amazon', 'Seattle, USA', 'Analyze and model complex data.', 'https://amazon.jobs', '2025-03-01 17:20:23', '', '1000000-1300000'),
(4, 4, 'Cybersecurity Analyst', 'Cisco', 'Bangalore, India', 'Monitor security threats and vulnerabilities.', 'https://cisco.com/careers', '2025-03-01 17:20:23', '', '800000-1100000'),
(5, 7, 'Frontend Developer', 'Adobe', 'San Francisco, USA', 'Build UI/UX for SaaS platforms.', 'https://adobe.com/jobs', '2025-03-01 17:20:23', '', '950000-1200000'),
(6, 8, 'Blockchain Developer', 'Binance', 'Singapore', 'Develop secure blockchain applications.', 'https://binance.com/careers', '2025-03-01 17:20:23', '', '1300000-1600000'),
(7, 10, 'Tech Support Engineer', 'Dell', 'Austin, USA', 'Assist enterprise customers with tech issues.', 'https://dell.com/careers', '2025-03-01 17:20:23', '', '700000-1000000');

-- --------------------------------------------------------

--
-- Table structure for table `mentorship`
--

CREATE TABLE `mentorship` (
  `mentorship_id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL,
  `mentorship_topic` varchar(255) NOT NULL,
  `status` enum('active','completed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mentorship`
--

INSERT INTO `mentorship` (`mentorship_id`, `alumni_id`, `mentorship_topic`, `status`) VALUES
(1, 1, 'Career Guidance', 'active'),
(2, 1, 'Career Guidance', 'active'),
(3, 3, 'Cloud Computing', ''),
(4, 4, 'Software Engineering', 'active'),
(5, 5, 'Blockchain Development', 'active'),
(6, 6, 'Cybersecurity Trends', ''),
(7, 9, 'Entrepreneurship & Startups', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `placements`
--

CREATE TABLE `placements` (
  `placement_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `placement_year` year(4) DEFAULT NULL,
  `placement_date` date DEFAULT NULL,
  `package` decimal(10,2) DEFAULT NULL,
  `placement_status` enum('placed','pending','rejected') DEFAULT NULL,
  `placement_notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `placements`
--

INSERT INTO `placements` (`placement_id`, `student_id`, `company_name`, `position`, `placement_year`, `placement_date`, `package`, `placement_status`, `placement_notes`) VALUES
(3, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 4, NULL, NULL, NULL, NULL, NULL, 'pending', 'Still applying for jobs'),
(5, 6, NULL, NULL, NULL, NULL, NULL, 'pending', 'Looking for core field jobs'),
(6, 8, 'HCC', 'Project Manager', '2025', '2025-02-08', 920000.00, 'placed', 'Good leadership role'),
(7, 10, NULL, NULL, NULL, NULL, NULL, 'pending', 'Waiting for offers'),
(8, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 16, 'Amazon', 'Cloud Engineer', '2025', '2024-07-01', 2600000.00, 'placed', 'AWS-focused role'),
(10, 18, 'Facebook', 'Machine Learning Engineer', '2025', '2024-06-30', 3100000.00, 'placed', 'AI-based projects'),
(11, 20, NULL, NULL, NULL, NULL, NULL, 'pending', 'Still appearing for interviews'),
(12, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 26, NULL, NULL, NULL, NULL, NULL, 'pending', 'Exploring job options'),
(15, 28, 'IBM', 'Cloud Solutions Architect', '2023', '2024-06-22', 1300000.00, 'placed', 'Enterprise-level cloud work'),
(100, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(101, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(102, 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `enrollment_id` varchar(12) DEFAULT NULL,
  `enrollment_year` year(4) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `program` varchar(50) NOT NULL,
  `career_choice` enum('Job Placement','Entrepreneurial Venture','Higher Studies') NOT NULL DEFAULT 'Job Placement',
  `semester` enum('SEM 4','SEM 5','SEM 6','SEM 7','SEM 8') NOT NULL DEFAULT 'SEM 4',
  `section` varchar(10) NOT NULL,
  `batch` enum('A','B','C','D') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `first_name`, `middle_name`, `last_name`, `email`, `enrollment_id`, `enrollment_year`, `phone_no`, `program`, `career_choice`, `semester`, `section`, `batch`, `created_at`, `updated_at`) VALUES
(2, 'Aryan', '', 'Sharma', 'aryan.sharma@example.com', '22DCE001', '2022', '4564564564', 'CE', 'Job Placement', 'SEM 6', 'CE1', 'A', '2025-03-01 16:47:44', '2025-03-23 16:29:33'),
(3, 'Neha', 'Priya', 'Verma', 'neha.verma@example.com', '22DCE002', '2022', '4564564564', 'CE', 'Higher Studies', 'SEM 6', 'CE2', 'B', '2025-03-01 16:47:44', '2025-03-19 16:04:45'),
(4, 'Rahul', NULL, 'Singh', 'rahul.singh@example.com', '22DCS003', '2022', '9876543203', 'CSE', 'Higher Studies', 'SEM 6', 'CS1', 'C', '2025-03-01 16:47:44', '2025-03-19 16:04:45'),
(5, 'Megha', 'D', 'Iyer', 'megha.iyer@example.com', '22DIT004', '2022', '9876543204', 'IT', 'Higher Studies', 'SEM 6', 'IT1', 'D', '2025-03-01 16:47:44', '2025-03-24 11:39:39'),
(6, 'Vikram', 'Raj', 'Nair', 'vikram.nair@example.com', '21DCE005', '2021', '9876543205', 'CE', 'Job Placement', 'SEM 8', 'CE1', 'A', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(7, 'Aditi', 'Priya', 'Gupta', 'aditi.gupta@example.com', '21DCS006', '2021', '9876543206', 'CSE', 'Higher Studies', 'SEM 8', 'CS2', 'B', '2025-03-01 16:47:44', '2025-03-23 16:29:10'),
(8, 'Sandeep', NULL, 'Yadav', 'sandeep.yadav@example.com', '21DIT107', '2021', '9876543207', 'IT', 'Job Placement', 'SEM 8', 'IT2', 'C', '2025-03-01 16:47:44', '2025-03-16 12:53:00'),
(9, 'Tanvi', NULL, 'Jain', 'tanvi.jain@example.com', '23DCE008', '2023', '9876543208', 'CE', 'Higher Studies', 'SEM 4', 'CE2', 'D', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(10, 'Rohan', NULL, 'Bose', 'rohan.bose@example.com', '23DCS009', '2023', '9876543209', 'CSE', 'Job Placement', 'SEM 4', 'CS1', 'A', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(11, 'Pallavi', 'Anand', 'Kapoor', 'pallavi.kapoor@example.com', '23DIT010', '2023', '9876543210', 'IT', 'Job Placement', 'SEM 4', 'IT1', 'B', '2025-03-01 16:47:44', '2025-03-17 04:23:50'),
(12, 'Deepak', NULL, 'Mishra', 'deepak.mishra@example.com', '23DCE011', '2023', '9876543211', 'CE', 'Job Placement', 'SEM 4', 'CE1', 'C', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(13, 'Swati', NULL, 'Desai', 'swati.desai@example.com', '22DCS012', '2022', '9876543212', 'CSE', 'Higher Studies', 'SEM 6', 'CS2', 'D', '2025-03-01 16:47:44', '2025-03-19 16:04:45'),
(14, 'Harsh', '', 'Patil', 'harsh.patil@example.com', '22DIT013', '2022', '9876543213', 'IT', 'Job Placement', 'SEM 6', 'IT2', 'A', '2025-03-01 16:47:44', '2025-03-19 16:04:45'),
(15, 'Komal', NULL, 'Choudhary', 'komal.choudhary@example.com', '22DCE014', '2022', '9876543214', 'CE', 'Higher Studies', 'SEM 6', 'CE2', 'B', '2025-03-01 16:47:44', '2025-03-19 16:04:45'),
(16, 'Manish', NULL, 'Bhatt', 'manish.bhatt@example.com', '21DCSE015', '2021', '9876543215', 'CSE', 'Job Placement', 'SEM 4', 'CS1', 'C', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(17, 'Niharika', 'Devi', 'Panda', 'niharika.panda@example.com', '21DIT016', '2021', '9876543216', 'IT', 'Higher Studies', 'SEM 8', 'IT1', 'D', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(18, 'Sahil', NULL, 'Malhotra', 'sahil.malhotra@example.com', '21DCE017', '2021', '9876543217', 'CE', 'Job Placement', 'SEM 8', 'CE1', 'A', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(19, 'Alisha', NULL, 'Paul', 'alisha.paul@example.com', '23DCSE018', '2023', '9876543218', 'CSE', 'Higher Studies', 'SEM 7', 'CSE2', 'B', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(20, 'Gautam', NULL, 'Reddy', 'gautam.reddy@example.com', '23DIT019', '2023', '9876543219', 'IT', 'Job Placement', 'SEM 7', 'IT1', 'C', '2025-03-01 16:47:44', '2025-03-05 16:02:27'),
(21, 'Priyanka', 'Suresh', 'Goswami', 'priyanka.goswami@example.com', '23DCE020', '2023', '9876543220', 'CE', 'Higher Studies', 'SEM 7', 'CE2', 'D', '2025-03-01 16:47:44', '2025-03-05 16:02:28'),
(22, 'Raj', NULL, 'Shekhawat', 'raj.shekhawat@example.com', '22DCE021', '2022', '9876543221', 'CE', 'Job Placement', 'SEM 6', 'CE1', 'A', '2025-03-01 16:50:28', '2025-03-19 16:04:45'),
(23, 'Pooja', 'Rani', 'Thakur', 'pooja.thakur@example.com', '22DCE022', '2022', '9876543222', 'CE', 'Higher Studies', 'SEM 6', 'CE2', 'B', '2025-03-01 16:50:28', '2025-03-19 16:04:45'),
(24, 'Akhil', NULL, 'Kumar', 'akhil.kumar@example.com', '22DCE023', '2022', '9876543223', 'CE', 'Job Placement', 'SEM 6', 'CE1', 'C', '2025-03-01 16:50:28', '2025-03-19 16:04:45'),
(25, 'Ritika', NULL, 'Joshi', 'ritika.joshi@example.com', '21DCE024', '2021', '9876543224', 'CE', 'Higher Studies', 'SEM 8', 'CE2', 'D', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(26, 'Kunal', 'Raj', 'Singh', 'kunal.singh@example.com', '21DCE025', '2021', '9876543225', 'CE', 'Job Placement', 'SEM 8', 'CE1', 'A', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(27, 'Sweta', NULL, 'Verma', 'sweta.verma@example.com', '23DCE026', '2023', '9876543226', 'CE', 'Higher Studies', 'SEM 7', 'CE2', 'B', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(28, 'Nitin', NULL, 'Sharma', 'nitin.sharma@example.com', '23DCE027', '2023', '9876543227', 'CE', 'Job Placement', 'SEM 7', 'CE1', 'C', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(29, 'Divya', NULL, 'Yadav', 'divya.yadav@example.com', '23DCE028', '2023', '9876543228', 'CE', 'Higher Studies', 'SEM 7', 'CE2', 'D', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(30, 'Sourav', NULL, 'Chakraborty', 'sourav.chakraborty@example.com', '22DCSE029', '2022', '9876543229', 'CSE', 'Job Placement', 'SEM 4', 'CS1', 'A', '2025-03-01 16:50:28', '2025-03-19 16:04:45'),
(31, 'Meenakshi', NULL, 'Menon', 'meenakshi.menon@example.com', '22DCSE030', '2022', '9876543230', 'CSE', 'Higher Studies', 'SEM 4', 'CS2', 'B', '2025-03-01 16:50:28', '2025-03-19 16:04:45'),
(32, 'Vivek', 'Kumar', 'Jain', 'vivek.jain@example.com', '21DCSE031', '2021', '9876543231', 'CSE', 'Job Placement', 'SEM 4', 'CS1', 'C', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(33, 'Neeraj', NULL, 'Nayak', 'neeraj.nayak@example.com', '21DCSE032', '2021', '9876543232', 'CSE', 'Higher Studies', 'SEM 4', 'CS2', 'D', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(34, 'Anjali', NULL, 'Mehta', 'anjali.mehta@example.com', '23DCSE033', '2023', '9876543233', 'CSE', 'Job Placement', 'SEM 7', 'CS1', 'A', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(35, 'Kartik', NULL, 'Batra', 'kartik.batra@example.com', '23DCSE034', '2023', '9876543234', 'CSE', 'Higher Studies', 'SEM 7', 'CS2', 'B', '2025-03-01 16:50:28', '2025-03-05 16:02:28'),
(36, 'Harshita', 'Anand', 'Pillai', 'harshita.pillai@example.com', '22DIT035', '2022', '9876543235', 'IT', 'Job Placement', 'SEM 6', 'IT1', 'C', '2025-03-01 16:50:28', '2025-03-19 16:04:45'),
(37, 'Aman', NULL, 'Goswami', 'aman.goswami@example.com', '22DIT036', '2022', '9876543236', 'IT', 'Higher Studies', 'SEM 6', 'IT2', 'D', '2025-03-01 16:50:28', '2025-03-19 16:04:45'),
(38, 'Sneha', NULL, 'Kapoor', 'sneha.kapoor@example.com', '21DIT037', '2021', '9876543237', 'IT', 'Job Placement', 'SEM 8', 'IT1', 'A', '2025-03-01 16:50:28', '2025-03-05 16:02:28');

--
-- Triggers `students`
--
DELIMITER $$
CREATE TRIGGER `after_student_insert` AFTER INSERT ON `students` FOR EACH ROW BEGIN
    IF NEW.career_choice = 'Job Placement' THEN
        INSERT INTO placements (student_id) VALUES (NEW.student_id);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_student_insert_higher_studies` AFTER INSERT ON `students` FOR EACH ROW BEGIN
    IF NEW.career_choice = 'Higher Studies' THEN
        INSERT INTO higher_studies (student_id) VALUES (NEW.student_id);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_student_update` AFTER UPDATE ON `students` FOR EACH ROW BEGIN
    IF NEW.career_choice = 'Job Placement' AND OLD.career_choice != 'Job Placement' THEN
        INSERT INTO placements (student_id) VALUES (NEW.student_id);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_student_update_higher_studies` AFTER UPDATE ON `students` FOR EACH ROW BEGIN
    IF NEW.career_choice = 'Higher Studies' AND OLD.career_choice != 'Higher Studies' THEN
        INSERT INTO higher_studies (student_id) VALUES (NEW.student_id);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'user', 'ramrider3366@gmail.com', '$2a$10$Ei66AEVkw0pdojx0d2NILe4x2fdHYVrMwX./RjxkKHSsExilazoni', 'tnpfaculty', '2025-03-01 09:16:46'),
(2, 'asmith_alumni', '', 'hashedpassword2', 'alumni', '2025-03-01 09:16:46'),
(17, 'mjohnson_alumni', '', 'hashedpassword4', 'alumni', '2025-03-01 10:11:44'),
(18, 'rpatel_alumni', '', 'hashedpassword5', 'alumni', '2025-03-01 10:11:44'),
(19, 'ksharma_alumni', '', 'hashedpassword6', 'alumni', '2025-03-01 10:11:44'),
(20, 'lroberts_alumni', '', 'hashedpassword7', 'alumni', '2025-03-01 10:11:44'),
(21, 'dlee_alumni', '', 'hashedpassword8', 'alumni', '2025-03-01 10:11:44'),
(22, 'nmartin_alumni', '', 'hashedpassword9', 'alumni', '2025-03-01 10:11:44'),
(23, 'wjackson_alumni', '', 'hashedpassword10', 'alumni', '2025-03-01 10:11:44'),
(24, 'hthomas_alumni', '', 'hashedpassword11', 'alumni', '2025-03-01 10:11:44'),
(25, 'jwright_alumni', '', 'hashedpassword12', 'alumni', '2025-03-01 10:11:44'),
(26, 'slopez_alumni', '', 'hashedpassword13', 'alumni', '2025-03-01 10:11:44'),
(30, 'asmith_faculty', '', 'hashedpassword2', 'faculty', '2025-03-01 10:12:40'),
(31, 'all', 'ramrider3366@gmail.com', '$2b$10$w1t0k9ZyzfzNm0H/KLKmX.MOpgGMOJwx2jOhyqBUxpks4B8kcnM9K', 'faculty', '2025-03-01 10:12:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`alumni_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `enrollment_id` (`enrollment_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD UNIQUE KEY `company_name` (`company_name`);

--
-- Indexes for table `connections`
--
ALTER TABLE `connections`
  ADD PRIMARY KEY (`connection_id`),
  ADD KEY `requester_id` (`requester_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `organizer_id` (`organizer_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`faculty_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `higher_studies`
--
ALTER TABLE `higher_studies`
  ADD PRIMARY KEY (`higher_studies_id`),
  ADD UNIQUE KEY `student_id_2` (`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`job_postings_id`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `mentorship`
--
ALTER TABLE `mentorship`
  ADD PRIMARY KEY (`mentorship_id`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `placements`
--
ALTER TABLE `placements`
  ADD PRIMARY KEY (`placement_id`),
  ADD UNIQUE KEY `student_id_2` (`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `enrollment_id` (`enrollment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `alumni_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `connections`
--
ALTER TABLE `connections`
  MODIFY `connection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `faculty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `higher_studies`
--
ALTER TABLE `higher_studies`
  MODIFY `higher_studies_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `job_postings_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mentorship`
--
ALTER TABLE `mentorship`
  MODIFY `mentorship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `placements`
--
ALTER TABLE `placements`
  MODIFY `placement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=364;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `alumni_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `connections`
--
ALTER TABLE `connections`
  ADD CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `alumni` (`alumni_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `connections_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `alumni` (`alumni_id`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `higher_studies`
--
ALTER TABLE `higher_studies`
  ADD CONSTRAINT `higher_studies_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD CONSTRAINT `job_postings_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`alumni_id`) ON DELETE CASCADE;

--
-- Constraints for table `mentorship`
--
ALTER TABLE `mentorship`
  ADD CONSTRAINT `mentorship_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`alumni_id`) ON DELETE CASCADE;

--
-- Constraints for table `placements`
--
ALTER TABLE `placements`
  ADD CONSTRAINT `placements_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
