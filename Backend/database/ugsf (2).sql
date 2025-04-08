-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2025 at 09:52 AM
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
(4, 19, 'Kavita', 'F', 'Sharma', 'ENR2017B02', '2017', 'M.Tech', 'Electronics', '', 'Stanford University', NULL, NULL, NULL);

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
(30, 'Accenture', 'Consulting', 'https://accenture.com', 'Robert Lee', 'robert.lee@accenture.com', '0123456789', 'Management Consultant, DevOps Engineer', 18, 900000.00, 3000000.00, NULL, 'Both', '', '3', '2025-04-10', 'Hybrid', '2025-03-01 17:41:43', '2025-04-08 05:12:19'),
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
(12, 1, 2, '', '2025-03-01 17:32:53', NULL),
(22, 1, 2, '', '2025-03-01 17:33:44', NULL),
(32, 1, 2, 'connected', '2025-03-01 17:34:15', NULL);

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
(15, 18, 'Startup & Entrepreneurship Workshop', 'Insights on starting a tech business.', '2025-07-15', '14:00:00', 'Bangalore, India', 'https://startupworkshop.com/signup', 'Microsoft Ventures', '2025-03-01 17:24:49'),
(17, 31, 'Women in Tech Panel Discussion', 'Encouraging diversity in technology.', '2025-09-12', '17:00:00', 'Los Angeles, USA', 'https://womenintech.com', 'Adobe Women in Tech', '2025-03-01 17:24:49'),
(20, 19, 'Cloud Computing Summit', 'Exploring cloud technologies and trends.', '2025-12-05', '13:00:00', 'Austin, USA', 'https://cloudsummit.com/register', 'Dell Cloud Services', '2025-03-01 17:24:49');

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
  `specialization` varchar(255) DEFAULT NULL,
  `admission_year` year(4) DEFAULT NULL,
  `address_of_institute` varchar(500) DEFAULT NULL,
  `city_of_institute` varchar(255) DEFAULT NULL,
  `country_of_institute` varchar(100) DEFAULT NULL,
  `higher_studies_status` enum('Admitted','In Process','Rejected') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `higher_studies`
--

INSERT INTO `higher_studies` (`higher_studies_id`, `student_id`, `university_name`, `course_name`, `specialization`, `admission_year`, `address_of_institute`, `city_of_institute`, `country_of_institute`, `higher_studies_status`) VALUES
(167, 500, 'University Of South Australia', 'M.tech - Master of Data Science', 'Data Science', '2024', 'Mawson Lakes, Adelaide', 'Adelaide', 'Canada', 'Admitted'),
(168, 501, 'Algonquin College', 'Cloud Development and Operations', 'No', '2024', '1385 Woodroffe Ave, Ottawa, ON K2G 1V8, Canada', 'Ottawa', 'Canada', 'Admitted'),
(169, 502, 'Northeastern University', 'MS', 'Human computer interaction', '2024', 'Boston, MA, USA', 'Boston', 'Canada', 'Admitted'),
(170, 503, 'ONTARIO TECH UNIVERSITY', 'MEng', 'Software Engineering', '2024', '2000 Simcoe Street North Oshawa, Ontario L1G0C5', 'OSHAWA', 'Canada', 'Admitted'),
(171, 504, 'SAN JOSE STATE UNIVERSITY', 'MS ', 'COMPUTER SCIENCE', '2024', '1 Washington Sq, San Jose', 'San Jose', 'Canada', 'Admitted'),
(172, 505, 'California state university long beach ', 'MS CS ', 'CS', '2024', '1250 Bellflower Blvd, Long Beach, CA 90840, USA', 'Long beach ', 'Canada', 'Admitted'),
(173, 506, 'Ontario tech university', 'Master of Software Engineering', 'NA', '2024', 'Oshawa, Ontario, Canada', 'Oshawa', 'Canada', 'Admitted'),
(174, 507, 'University of Michigan - Dearborn', 'MS in Computer and Information Sciences', 'No', '2024', '4901 Evergreen Road, Dearborn, MI 48128', 'Michigan', 'Canada', 'Admitted'),
(175, 508, 'McMaster University ', 'M of Engineering', 'Systems and Technology', '2024', '1280 Main St W, Hamilton, ON L8S 4L8, Canada', 'Hamilton', 'Canada', 'Admitted'),
(176, 509, 'University of Technology Sydney', 'Master of Data Science and Innovation', 'Data Science', '2024', '15 Broadway, Ultimo NSW 2007, Australia', 'Sydney', 'Canada', 'Admitted'),
(177, 510, 'University at Buffalo', 'Computer Science and Engineering MS', 'No', '2024', '190 Founders Prom, Amherst, NY 14068, USA', 'New York', 'Canada', 'Admitted'),
(178, 511, 'San Jose State University', 'MS in Data Analytics', 'Data Engineering', '2024', 'One Washington Square San José, CA 95192-0016', 'San Jose', 'Canada', 'Admitted'),
(179, 512, 'Saskatchewan Polytechnic ', 'Post Graduate Certificate ', 'Artificial Intelligence and Data Analytics ', '2025', 'Saskatchewan Polytechnic, P.O. Box 1520 1130, Idylwyld Drive North, Saskatoon - S7K 3R5', 'Saskatoon ', 'Canada', 'Admitted'),
(180, 513, 'University of Concordia', 'Masters of Engineering in Electrical and Computer Engineering ', 'No', '2024', 'Not given', 'Montreal', 'Canada', 'Admitted'),
(181, 514, 'Mcmaster University', 'Meng - Systems and Technology', 'Automation and Smart Sytems', '2024', '1145 King Street West, Hamilton ON L8S 1L9', 'Hamilton, ON', 'Canada', 'Admitted'),
(182, 515, 'International School of Business and Media', 'PGDM', 'Marketing', '2024', 'Survey No. 44/1, 44/1/2, Symbiosis Lavale Road, Pashan, Near Dhruv Global School Nande, Pune, Maharashtra 412115', 'Pune', 'Canada', 'Admitted'),
(183, 516, 'University of South Australia ', 'MS of Data Science', 'No', '2024', 'Mawson Lakes', 'Adelaide', 'Canada', 'Admitted'),
(184, 517, 'Stevens institute of technology', 'Ms ', 'Computer science', '2024', 'Howe center, hoboken', 'New jersey', 'Canada', 'Admitted'),
(294, 499, 'University of Alberta ', ' Master of Engineering (Crse) in Electrical and Computer Engineering, Software Eng And Inteligent Sy', 'Software Engineering And Inteligent System', '2024', '110 45 Saskatchewan Dr NW, Edmonton, AB T6G 2B4, Canada', 'Edmonton', 'Canada', 'Admitted');

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
(4, 4, 'Cybersecurity Analyst', 'Cisco', 'Bangalore, India', 'Monitor security threats and vulnerabilities.', 'https://cisco.com/careers', '2025-03-01 17:20:23', '', '800000-1100000');

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
(4, 4, 'Software Engineering', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `placements`
--

CREATE TABLE `placements` (
  `placement_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `salary_package` decimal(10,2) DEFAULT NULL,
  `placement_status` enum('Placed','Not Placed') DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `placements`
--

INSERT INTO `placements` (`placement_id`, `student_id`, `company_name`, `position`, `salary_package`, `placement_status`, `updated_at`) VALUES
(162, 364, 'Ace Infoway Pvt. Ltd', 'QA', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(163, 365, 'Conversios system', 'Software engineer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(164, 366, 'Conversios systems ', 'Software engineer ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(165, 367, 'NGTech Assurance Pvt Ltd ', 'Senior Process Associate ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(166, 368, 'Satva solutions ', 'QA', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(167, 369, 'Zignuts Technolab', 'Business Development Intern', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(168, 370, 'Tatvasoft', 'Quality Assurance', 320000.00, 'Placed', '2025-04-08 06:07:45'),
(169, 371, 'Bacancy technology ', 'React trainee', 360000.00, 'Placed', '2025-04-08 06:07:45'),
(170, 372, 'Plutomen ', '-', 360000.00, 'Placed', '2025-04-08 06:07:45'),
(171, 373, 'Zignuts Technolab', 'Business Analyst ', 360000.00, 'Placed', '2025-04-08 06:07:45'),
(172, 374, 'Zignuts Technolab', 'Software Developer', 360000.00, 'Placed', '2025-04-08 06:07:45'),
(173, 375, 'eInfochips - An Arrow Company', 'Embedded Intern', 400000.00, 'Placed', '2025-04-08 06:07:45'),
(174, 376, 'Glide technology ', '-', 400000.00, 'Placed', '2025-04-08 06:07:45'),
(175, 377, 'Unite Computech Info India Pvt Ltd', 'Salesforce Developer ', 400000.00, 'Placed', '2025-04-08 06:07:45'),
(176, 378, 'Almashines Technologies ', 'Full Stack Developer ', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(177, 379, 'AlmaShines Technologies Pvt. Ltd.', 'Full Stack Developer', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(178, 380, 'Mastek', 'App Developer', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(179, 381, 'Squad Technologies ', 'Software Engineer ', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(180, 382, 'Squad Technologies ', 'Software Engineer ', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(181, 383, 'SQUAD TECHNOLOGIES PVT LTD ', 'Software Developer ', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(182, 384, 'Squad technology ', 'Software engineer ', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(183, 385, 'Squad technology ', 'Full stack developer ', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(184, 386, 'Vivansh Infotech', 'Frontend Developer', 420000.00, 'Placed', '2025-04-08 06:07:45'),
(185, 387, 'Dynatech system ', 'Trainee application developer ', 450000.00, 'Placed', '2025-04-08 06:07:45'),
(186, 388, 'DynaTech Systems Private LTD', 'Trainee Application Developer- CRM', 450000.00, 'Placed', '2025-04-08 06:07:45'),
(187, 389, 'Crest Infosystems Pvt. Ltd.', 'Software Engineer - L1', 480000.00, 'Placed', '2025-04-08 06:07:45'),
(188, 390, 'INVENTYV SOFTWARE SERVICES PVT LTD', 'Frontend', 480000.00, 'Placed', '2025-04-08 06:07:45'),
(189, 391, 'Inventyv Software Services Pvt. Ltd.', 'DevOps Engineer', 480000.00, 'Placed', '2025-04-08 06:07:45'),
(190, 392, 'Inventyv Software Services Pvt. Ltd.', 'DevOps Engineer', 480000.00, 'Placed', '2025-04-08 06:07:45'),
(191, 393, 'Tatvasoft', '-', 480000.00, 'Placed', '2025-04-08 06:07:45'),
(192, 394, 'Tatvasoft ', '-', 480000.00, 'Placed', '2025-04-08 06:07:45'),
(193, 395, 'Crest Data Systems', 'Quality Assurance Engineer', 500000.00, 'Placed', '2025-04-08 06:07:45'),
(194, 396, 'Tridhya Tech Ltd.', 'Software developer intern', 520000.00, 'Placed', '2025-04-08 06:07:45'),
(195, 397, 'Tridhya Tech Ltd.', 'Software developer ', 520000.00, 'Placed', '2025-04-08 06:07:45'),
(196, 398, 'Tridhya tech Pvt Ltd ', 'Software Engineer ', 520000.00, 'Placed', '2025-04-08 06:07:45'),
(197, 399, 'Synoptek', 'Trainee', 550000.00, 'Placed', '2025-04-08 06:07:45'),
(198, 400, 'Codal Systems', 'Intern', 600000.00, 'Placed', '2025-04-08 06:07:45'),
(199, 401, 'Meditab', 'Programmer analyst trainee', 609000.00, 'Placed', '2025-04-08 06:07:45'),
(200, 402, 'Talent systems', 'Jr. Software engineer', 660000.00, 'Placed', '2025-04-08 06:07:45'),
(201, 403, 'Talent Systems ', 'Jr. iOS Engineer ', 660000.00, 'Placed', '2025-04-08 06:07:45'),
(202, 404, 'Talent systems ', 'iOS developer ', 660000.00, 'Placed', '2025-04-08 06:07:45'),
(203, 405, 'Intuitive cloud', 'DevSecOps engineer', 800000.00, 'Placed', '2025-04-08 06:07:45'),
(204, 406, 'Unite Computech Info', '-', 0.00, 'Placed', '2025-04-08 06:07:45'),
(205, 407, 'Karmaleen Technology', 'Intern', 250000.00, 'Placed', '2025-04-08 06:07:45'),
(206, 408, 'Capermint technology ', 'Node js developer ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(207, 409, 'Capermint Technologies Pvt. Ltd.', 'Intern Game Developer ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(208, 410, 'Silver touch technologies', 'Software Engineer trainee', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(209, 411, 'Silver Touch Technologies', '-', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(210, 412, 'Silver Touch Technologies Limited ', 'software trainee engineer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(211, 413, 'Surekha Technologies', 'DevOps Engineer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(212, 414, 'Zignuts Technolab ', 'Web Developer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(213, 415, 'Product Squads', '-', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(214, 416, 'Zignuts Technolab pvt ltd', 'Mobile Application Developer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(215, 417, 'Fuzzy Cloud', 'UI/UX Designer Intern', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(216, 418, 'Satva Solutions ', 'Business Analyst ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(217, 419, 'Fuzzy Cloud', 'Machine Learning', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(218, 420, 'Satva Solutions', 'Trainee Software Developer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(219, 421, 'TatvaSoft', 'SDE Intern ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(220, 422, 'Crest Infosystems Pvt. Ltd.', 'Software Enginner-L1', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(221, 423, 'inventyv software services pvt ltd', 'DevOps Engineer ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(222, 424, 'Tatvasoft', '-', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(223, 425, 'Gateway group of companies ', 'Associate ', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(224, 426, 'Gateway Group of Companies', 'Software Engineer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(225, 427, 'Sahajand (STPL)', 'Intern as a Software developer', 300000.00, 'Placed', '2025-04-08 06:07:45'),
(226, 428, 'Agevole Innovation ', '- ', 0.00, 'Not Placed', '2025-04-08 06:07:45'),
(227, 429, 'Groovy web.', 'Intern', 0.00, 'Not Placed', '2025-04-08 06:07:45');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `enrollment_id` varchar(12) NOT NULL,
  `enrollment_year` year(4) NOT NULL,
  `batch` year(4) NOT NULL,
  `program` varchar(50) NOT NULL,
  `career_choice` enum('Job Placement','Entrepreneurial Venture','Higher Studies') NOT NULL DEFAULT 'Job Placement',
  `semester` enum('SEM 4','SEM 5','SEM 6','SEM 7','SEM 8') NOT NULL DEFAULT 'SEM 4',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(15) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `name`, `email`, `enrollment_id`, `enrollment_year`, `batch`, `program`, `career_choice`, `semester`, `created_at`, `updated_by`, `updated_at`) VALUES
(364, 'RAVAL OHM MILINDKUMAR', 'eohm.raval@gmail.com', 'D21DCE156', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(365, 'DHADUK DEEP BHARATBHAI', 'dhadukdeep123@gmail.com', '20DCE044', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(366, 'PUROHIT HITESHKUMAR VISHNUDATT', 'purohithitesh579@gmail.com', 'D21DCE153', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(367, 'STUTI NILESH BHATT', 'stutibhatt.1105@gmail.com', '20DCE029', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(368, 'SANTOKI SAMARPIT HARESHBHAI', 'samarpit.santoki@gmail.com', 'D21DCE161', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(369, 'SHAH CHINTAN RAGESH', 'chintan2429@gmail.com', 'D21DCE166', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(370, 'JATINKUMAR KOTHIYA', 'jatinkothiya2362002@gmail.com', '20DCE086', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(371, 'DUDHAT MITKUMAR JITENDRABHAI', 'dudhatmit999@gmail.com', '20DCE051', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(372, 'JANI ADARSH JAYESHKUMAR', 'adarshjani1@gmail.com', '20dce065', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(373, 'PATEL KHUSHIBEN ATULBHAI', 'khushipatel3340@gmail.com', '20DCE126 ', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(374, 'PATEL YUGALKUMAR PARASBHAI', 'yugalpatel286@gmail.com', 'D21DCE149', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(375, 'BORDA KEVIN DEVRAJBHAI', 'kdborda357@gmail.com', '20DCE032', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(376, 'AMBALIYA DHRUV VANRAJBHAI', 'dhruvambaliya72@gmail.com', '20dce005', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(377, 'AJMERA MOKSH CHANDRESHBHAI', 'ajmera.moksh002@gmail.com', '20DCE004', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:08:13'),
(378, 'PARSANA JAY KISHORBHAI', 'jayparsana01@gmail.com', '20DCE106', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(379, 'PATEL KISHAN RITESHKUMAR', 'kishanptl951@gmail.com', '20DCE127', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(380, 'SADRANI NIYATI JIGNESH', '20dce105@charusat.edu.in', 'd21dce160', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(381, 'GOHEL VIVEK MUKESHBHAI', 'vivekgohel001@gmail.com', '20DCE057', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(382, 'JAIN NISTHA', 'chotunishtu0312@gmail.com', '20dce064', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(383, 'PATEL SANSKRUTI VIPULBHAI', 'sanskrutipatel323@gmail.com', '20DCE141', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(384, 'CHAUHAN KHUSHBU NILESHBHAI', 'ckhushbu211@gmail.com', '20dce035', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(385, 'MOTIVARAS NABHAG MOHANLAL', 'nabhagmotivaras76@gmail.com', '20dce099', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(386, 'NANAVATI HETVI ASHISH', 'hetvi.nanavati@gmail.com', '20DCE102', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(387, 'SARTHAK VIPUL PALIWAL', 'pali.sarthak10@gmail.com', 'D21DCE162 ', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(388, 'DAVE YUG DHARMESHKUMAR', 'daveyug2002@gmail.com', '20DCE042', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(389, 'PATEL MANSI', 'mansipatel9542@gmail.com', '20DCE129', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(390, 'SACHDEV VIVEK RAJESHBHAI', 'viveksachdev8@gmail.com', 'D21DCE158', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(391, 'BHADANIYA PRINCI PRITESHKUMAR', 'bhadaniyaprinci65@gmail.com', '20DCE017', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(392, 'MEHTA NAMRA SANJAY', 'namramehta108@gmail.com', '20DCE095', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(393, 'MARCELINO OSEEN ALBERT', 'oseenmarcelino.6@gmail.com', '20DCE093', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(394, 'KANSAGARA NISHITA BIPINKUMAR', 'nishita.kansagra2003@gmail.com', '20DCE075', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(395, 'PATEL SMIT SHANTILAL', '13smitpatel@gmail.com', '20DCE143', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(396, 'DAYANI LAKSH RAJUBHAI', 'lakshdayani@gmail.com', '20DCE043', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(397, 'DIVYANGKUMAR HIRPARA', 'divyanghirpara5@gmail.com', '20dce062', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(398, 'KAPADIA DEVEN VIJAY', 'devenkapadia1@gmail.com', '20DCE082', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(399, 'PATEL PRINCE VISHNUKUMAR', 'prince90290@gmail.com', '20DCE137', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(400, 'BHIMANI SANKET MAHESHBHAI', 'bhimanisanket2463@gmail.com', '20DCE031', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(401, 'GOHIL DHRUVRAJSINH DHARMENDRASINH', 'dhruvrajsinhgohil0512@gmail.com', '20DCE058', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(402, 'PATEL JAY UMAKANT', 'pateljay010602@gmail.com', '20dce125', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(403, 'MALAVIYA KISHAN ASHOKBHAI', 'kishanmalaviya017@gmail.com', '20DCE090', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(404, 'PATEL MASUMKUMAR DILIPKUMAR', 'mdpatel1304@gmail.com', '20dce133 ', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(405, 'GAJIPARA KHUSHI ASHOKBHAI', 'khushigajipara1121@gmail.com', '20dce055', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(406, 'CHAUHAN YATHARTH TEJASKUMAR', 'yatharthchauhan2024@gmail.com', '20DCE036', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(407, 'SAVANI PRANAV HITESHBHAI', 'pranavsavani1507@gmail.com', 'D21DCE164', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(408, 'FALDU JENSI JAYESHBHAI', 'faldujensi27@gmail.com', '20DCE053 ', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(409, 'PATEL AESHABEN VASANTKUMAR', '20dce072@charusat.edu.in', '20dce109', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(410, 'DUDHAREJIYA JEET PRAKASHBHAI', 'dudhrejiyajeet72@gmail.com', '20DCE049', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(411, 'DIMPAL PATEL', '20dce077@charusat.edu.in', '20DCE119', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(412, 'CHAVDA MITUL MAHESHBHAI', 'mitulchavda000@gmail.com', '20DCE040', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(413, 'VAISHNAVI BHALODI', 'vaishnavi.bhalodi@gmail.com', '20DCE007', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(414, 'ARYAN RITESHBHAI PATEL', 'aryan.ritesh002@gmail.com', '20DCE113', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(415, 'BHALODIA KAVYA PRADEEP', 'kavyabhalodia22@gmail.com', '20DCE015 ', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(416, 'KALARIYA VANDAN MANOJBHAI', 'vandan.kalariya03@gmail.com', '20DCE073', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(417, 'KARETHA KRISHN ASHVINBHAI', 'krishnkaretha12@gmail.com', '20DCE085', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(418, 'PATEL BADAL MANISHKUMAR', 'badalpatel.ca@gmail.com', '20DCE115 ', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(419, 'PATEL PRUTHVI PIYUSHKUMAR', 'pruthvikp8613@gmail.com', '20DCE138', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(420, 'NASIT VRAJESH MATHURBHAI', 'vrajeshmn2003@gmail.com', '20DCE103', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(421, 'PATEL PREET VIPULBHAI', 'preetpatel2504@gmail.com', '20DCE136', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(422, 'DHANANI UTSAV PRAVINBHAI', 'utsavdhanani456@gmail.com', '20DCE046', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(423, 'MEHTA SHIVAM JAYESHBHAI', 'shivmehta1710@gmail.com', '20dce096', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(424, 'BHATT KARAN VIPUL', 'karanbhatt79384@gmail.com', '20DCE023', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(425, 'RAVAL AMI MILINDKUMAR', '20DCE100@charusat.edu.in', 'D21DCE154', '2021', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(426, 'KACHHADIYA URVISH RAMESHBHAI', 'urvishpatel650@gmail.com', '20DCE070', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(427, 'PATEL JAY SANJAYBHAI', 'jays12345patel@gmail.com', '20dce120 ', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(428, 'AMIN DHRUVKUMAR SANJAYBHAI', 'dhruvamin0946@gmail.com', '20dce006', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(429, 'MITHAIWALA BHAVIK KIRANKUMAR', 'bhavik.mithaiwala90@gmail.com', '20DCE097', '2020', '2020', 'DCE', 'Job Placement', 'SEM 8', '2025-04-06 02:50:16', 'user', '2025-04-08 06:07:45'),
(499, 'Dhruv Sanjaykumar', '20dce003@charusat.edu.in', '20DCE003', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'tnp_faculty_dce', '2025-04-08 07:52:31'),
(500, 'Jatin kothiya', '20dce052@charusat.edu.in', '20DCE052', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(501, 'Oseen Marcelino', '20dce056@charusat.edu.in', '20DCE056', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(502, 'Vrajesh Nasit', '20dce069@charusat.edu.in', '20dce069', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(503, 'PATEL BADAL MANISHKUMAR', '20dce076@charusat.edu.in', '20DCE076', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(504, 'MANSI', '20dce083@charusat.edu.in', '20DCE083', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(505, 'Preet Patel ', '20dce087@charusat.edu.in', '20dce087', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(506, 'Prince Patel', '20dce088@charusat.edu.in', '20DCE088', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(507, 'Yugal Patel', '20dce094@charusat.edu.in', '20DCE094', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(508, 'Sarthak Vipul Paliwal', '20dce108@charusat.edu.in', '20DCE108', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(509, 'Pranav Savani', '20dce110@charusat.edu.in', '20DCE110', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(510, 'Shah Kush Vijaykumar', '20dce114@charusat.edu.in', '20DCE114', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(511, 'PREM HIREN SHAH', '20dce118@charusat.edu.in', '20DCE118', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(512, 'Saket Shah', '20dce121@charusat.edu.in', '20DCE121', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(513, 'Vraj Shah', '20dce124@charusat.edu.in', '20DCE124', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(514, 'MEET MIHIRBHAI SHROFF', '20dce128@charusat.edu.in', '20DCE128', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(515, 'Rivaa Virani', '20dce142@charusat.edu.in', '2ODCE142', '2020', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(516, 'Krish Gundarania', 'd21dce150@charusat.edu.in', 'D21DCE150', '2021', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47'),
(517, 'Rishil vaghasia', 'd21dce165@charusat.edu.in', 'D21dce165', '2021', '2020', 'DCE', 'Higher Studies', 'SEM 8', '2025-04-07 05:18:44', 'user', '2025-04-08 06:02:47');

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
DELIMITER $$
CREATE TRIGGER `delete_previous_career` BEFORE UPDATE ON `students` FOR EACH ROW BEGIN
    -- Check if career_choice is changing
    IF OLD.career_choice != NEW.career_choice THEN
        -- Delete from the table corresponding to the old career_choice
        IF OLD.career_choice = 'Higher Studies' THEN
            DELETE FROM higher_studies WHERE student_id = OLD.student_id;
        ELSEIF OLD.career_choice = 'Job Placement' THEN
            DELETE FROM placements WHERE student_id = OLD.student_id;
        END IF;
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
(2, 'tnp_faculty_dce', '', '$2b$10$TD5FuqoszRiO6VylU292xOtPUAHJ8Hyln8FEGJdtRfKdn/oOb7Y2m', 'tnpfaculty', '2025-03-01 09:16:46'),
(17, 'tnp_faculty_dcs', '', '$2b$10$iAvU6Fi4vt76TRyvuSrPpuBbZwHzz/36HaYrjjHAedJJ1KAyA6ubG', 'tnpfaculty', '2025-03-01 10:11:44'),
(18, 'tnp_faculty_dit', '', '$2b$10$0PX6B0mfjydKb8dZA2NWrerIiXj8jOl.c2MoH8VJpsQ9yCuv3rwa6', 'tnpfaculty', '2025-03-01 10:11:44'),
(19, 'faculty_all', '', '$2b$10$SZ4ji.V0dyCWwFANCjga0eeUkKjZTZL3EstU3VbC9iUiYbba4/5qq', 'faculty', '2025-03-01 10:11:44'),
(31, 'all', 'ramrider3366@gmail.com', '$2b$10$nTaMWcRAow/U.NDk1q7MTe.EMoMLTum/lSVDtKeh7m07GIWZ5U7hG', 'faculty', '2025-03-01 10:12:40');

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
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

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
  MODIFY `higher_studies_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=335;

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
  MODIFY `placement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=567;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=899;

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
