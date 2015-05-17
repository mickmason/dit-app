-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2015 at 12:42 PM
-- Server version: 5.1.54
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `collegedata`
--
CREATE DATABASE `collegedata` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `collegedata`;

-- --------------------------------------------------------

--
-- Table structure for table `lecturertable`
--

CREATE TABLE IF NOT EXISTS `lecturertable` (
  `staffNumber` int(6) NOT NULL,
  `firstName` varchar(10) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `moduleNo1` int(6) NOT NULL,
  `moduleNo2` int(6) NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`staffNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains all lecturer records for the example dat';

--
-- Dumping data for table `lecturertable`
--

INSERT INTO `lecturertable` (`staffNumber`, `firstName`, `lastName`, `moduleNo1`, `moduleNo2`, `email`) VALUES
(123001, 'Charlie', 'Cullen', 999001, 999003, 'charlie@here.com'),
(123002, 'Hugh', 'McAtamney', 999002, 999009, 'hugh@there.com'),
(123003, 'Keith', 'Gardiner', 999006, 999008, 'keith@there.com'),
(123004, 'Paula', 'McGloin', 999004, 999005, 'paula@there.com'),
(123005, 'James', 'Wogan', 999007, 999010, 'james@there.com');

-- --------------------------------------------------------

--
-- Table structure for table `moduletable`
--

CREATE TABLE IF NOT EXISTS `moduletable` (
  `moduleNo` int(6) NOT NULL,
  `moduleName` varchar(30) NOT NULL,
  `credits` int(2) NOT NULL,
  `website` varchar(30) NOT NULL,
  `dueDate` date NOT NULL,
  `location` varchar(25) NOT NULL,
  `room` varchar(10) NOT NULL,
  `lat` varchar(20) NOT NULL,
  `long` varchar(20) NOT NULL,
  PRIMARY KEY (`moduleNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains all module records for the example datab';

--
-- Dumping data for table `moduletable`
--

INSERT INTO `moduletable` (`moduleNo`, `moduleName`, `credits`, `website`, `dueDate`, `location`, `room`, `lat`, `long`) VALUES
(999001, 'Dynamic Web Development', 15, 'www.dynWeb.ie', '2013-05-14', 'Aungier Street', '4037', '53.338545', '-6.26607'),
(999002, 'Human Computer Interaction', 10, 'www.hci.ie', '2013-04-09', 'Aungier Street', '2005', '53.338545', '-6.26607'),
(999003, 'Introduction to Programming', 15, 'www.jscriptIntro.ie', '2013-01-11', 'Kevin Street', '1045', '53.337015', '-6.267933'),
(999004, 'Design Principles', 15, 'www.designIntro.ie', '2013-04-25', 'Bolton Street', '0130', '53.351406', '-6.268724'),
(999005, 'Design Practice', 10, 'www.designPract.ie', '2013-01-11', 'Cathal Brugha Street', '0123', '53.352044', '-6.259514'),
(999006, 'Digital Audio', 10, 'www.dspAudio.com', '2013-05-10', 'Aungier Street', '3025', '53.338545', '-6.26607'),
(999007, 'Digital Signal Processing', 10, 'www.dspGeneral.ie', '2013-04-04', 'Kevin Street', '2103', '53.337015', '-6.267933'),
(999008, 'History of Digital Media', 5, 'www.itsbeendone.ie', '2013-03-28', 'Aungier Street', '0120', '53.338545', '-6.26607'),
(999009, 'Digital Asset Management', 5, 'www.contentStore.ie', '2013-05-30', 'Bolton Street', '1004', '53.351406', '-6.268724'),
(999010, 'Production Skills', 10, 'www.webDevPro.ie', '2013-04-02', 'Aungier Street', '1089', '53.338545', '-6.26607');

-- --------------------------------------------------------

--
-- Table structure for table `studenttable`
--

CREATE TABLE IF NOT EXISTS `studenttable` (
  `studentID` int(6) NOT NULL,
  `firstName` varchar(10) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `moduleNo1` int(6) NOT NULL,
  `moduleNo2` int(6) NOT NULL,
  `courseID` int(6) NOT NULL,
  PRIMARY KEY (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains all student records for the example data';

--
-- Dumping data for table `studenttable`
--

INSERT INTO `studenttable` (`studentID`, `firstName`, `lastName`, `moduleNo1`, `moduleNo2`, `courseID`) VALUES
(123, 'Kermit', 'Frog', 999003, 999008, 888001),
(124, 'Gonzo', 'Great', 999001, 999009, 888001),
(125, 'Cookie', 'Monster', 999004, 999005, 888002),
(126, 'Fozzie', 'Bear', 999006, 999010, 888001),
(127, 'Bunsen', 'Honeydew', 999007, 999009, 888003),
(128, 'Miss', 'Piggy', 999002, 999003, 888003),
(129, 'Gobo', 'Fraggle', 999008, 999010, 888002),
(130, 'Mokey', 'Fraggle', 999002, 999005, 888001),
(131, 'Red', 'Fraggle', 999006, 999008, 888003),
(132, 'Wembley', 'Fraggle', 999004, 999007, 888003),
(133, 'Travelling', 'Matt', 999002, 999003, 888002),
(134, 'Convincing', 'John', 999004, 999008, 888001),
(135, 'Cotterpin', 'Doozer', 999008, 999009, 888002),
(136, 'Judge', 'Dog', 999003, 999007, 888003),
(137, 'Doctor', 'Astro', 999005, 999001, 888001),
(138, 'Sneaky', 'Snake', 999006, 999008, 888002),
(139, 'Sunni', 'Gummi', 999009, 999010, 888002),
(140, 'Cubbi', 'Gummi', 999004, 999008, 888001),
(141, 'Papa', 'Smurf', 999008, 999009, 888003),
(142, 'Lazy', 'Smurf', 999001, 999002, 888001),
(143, 'Vanity', 'Smurf', 999008, 999010, 888002),
(144, 'Joe', 'Frasier', 999004, 999006, 888003),
(145, 'Muhammad', 'Ali', 999003, 999005, 888002),
(146, 'George', 'Foreman', 999002, 999003, 888001),
(147, 'Larry', 'Holmes', 999001, 999002, 888001),
(148, 'Marvin', 'Hagler', 999004, 999005, 888003),
(149, 'John', 'Coltrane', 999002, 999006, 888002),
(150, 'Sonny', 'Rawlins', 999009, 999010, 888002),
(151, 'Coleman', 'Hawkins', 999006, 999007, 888003),
(152, 'Wes', 'Montgomery', 999002, 999004, 888001),
(153, 'Joe', 'Pass', 999006, 999009, 888001),
(154, 'Charlie', 'Christian', 999008, 999010, 888002),
(155, 'Stanley', 'Jordan', 999004, 999007, 888003),
(156, 'Rory', 'Gallagher', 999006, 999009, 888003),
(157, 'Gary', 'Moore', 999001, 999008, 888002),
(158, 'Jimi', 'Hendrix', 999004, 999008, 888001),
(159, 'Paco', 'Pena', 999005, 999009, 888003),
(160, 'Andres', 'Segovia', 999003, 999007, 888003),
(161, 'Bootsy', 'Collins', 999004, 999005, 888002),
(162, 'George', 'Clinton', 999003, 999010, 888002);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(6) NOT NULL,
  `user_password` varchar(15) NOT NULL DEFAULT 'password',
  KEY `user_id` (`user_id`,`user_password`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_password`) VALUES
(123, 'password'),
(124, 'password'),
(125, 'password'),
(126, 'password'),
(127, 'password'),
(128, 'password'),
(129, 'password'),
(130, 'password'),
(131, 'password'),
(132, 'password'),
(133, 'password'),
(134, 'password'),
(135, 'password'),
(136, 'password'),
(137, 'password'),
(138, 'password'),
(139, 'password'),
(140, 'password'),
(141, 'password'),
(142, 'password'),
(143, 'password'),
(144, 'password'),
(145, 'password'),
(146, 'password'),
(147, 'password'),
(148, 'password'),
(149, 'password'),
(150, 'password'),
(151, 'password'),
(152, 'password'),
(153, 'password'),
(154, 'password'),
(155, 'password'),
(156, 'password'),
(157, 'password'),
(158, 'password'),
(159, 'password'),
(160, 'password'),
(161, 'password'),
(162, 'password'),
(123001, 'password'),
(123002, 'password'),
(123003, 'password'),
(123004, 'password'),
(123005, 'password');
