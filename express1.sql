-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2018 at 09:59 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

CREATE TABLE `tbl_accounts` (
  `intAccountsID` int(11) NOT NULL,
  `strFirstname` varchar(40) NOT NULL,
  `strEmail` varchar(40) NOT NULL,
  `strPassword` varchar(20) NOT NULL,
  `strLastname` varchar(20) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`intAccountsID`, `strFirstname`, `strEmail`, `strPassword`, `strLastname`, `isAdmin`) VALUES
(2, 'Rei Pablo', 'eldrinrei@gmail.com', 'chromago', '', 1),
(3, 'Fritz', 'fsantuico@gmail.com', 'a', '', 0),
(4, 'a', 'a@a.com', 'a', 'a', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cottages`
--

CREATE TABLE `tbl_cottages` (
  `intCottagesID` int(11) NOT NULL,
  `strDescription` varchar(30) NOT NULL,
  `dblPrice` double NOT NULL,
  `strImage` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_cottages`
--

INSERT INTO `tbl_cottages` (`intCottagesID`, `strDescription`, `dblPrice`, `strImage`) VALUES
(1, '1-4 Person', 400, NULL),
(2, '4-8 Person', 800, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_gallery`
--

CREATE TABLE `tbl_gallery` (
  `intGalleryID` int(11) NOT NULL,
  `strImage` longtext NOT NULL,
  `booStatus` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_gallery`
--

INSERT INTO `tbl_gallery` (`intGalleryID`, `strImage`, `booStatus`) VALUES
(3, 'strImage-1522811846507.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reserve`
--

CREATE TABLE `tbl_reserve` (
  `intReserveID` int(11) NOT NULL,
  `intReserveAccountID` int(11) NOT NULL,
  `datDate` date NOT NULL,
  `booTime` tinyint(4) DEFAULT '0',
  `booStatus` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_reserve`
--

INSERT INTO `tbl_reserve` (`intReserveID`, `intReserveAccountID`, `datDate`, `booTime`, `booStatus`) VALUES
(23, 2, '2018-04-30', NULL, 0),
(24, 2, '2018-04-19', 1, 0),
(25, 2, '2018-04-11', 0, 0),
(26, 2, '2018-04-11', 0, 0),
(27, 2, '2018-04-11', 0, 0),
(28, 2, '2018-04-11', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reserve_cottage`
--

CREATE TABLE `tbl_reserve_cottage` (
  `intReserveCottageID` int(11) NOT NULL,
  `intRCReserveID` int(11) NOT NULL,
  `intRCCottageID` int(11) NOT NULL,
  `intRCQTY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reserve_rooms`
--

CREATE TABLE `tbl_reserve_rooms` (
  `intReserveRoomsID` int(11) NOT NULL,
  `intRSReserveID` int(11) NOT NULL,
  `intRSRoomID` int(11) NOT NULL,
  `intQTY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reserve_ticket`
--

CREATE TABLE `tbl_reserve_ticket` (
  `intTicketReserve` int(11) NOT NULL,
  `intReserveID` int(11) NOT NULL,
  `intTicketID` int(11) NOT NULL,
  `intQTY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rooms`
--

CREATE TABLE `tbl_rooms` (
  `intRoomsID` int(11) NOT NULL,
  `strDetails` varchar(30) NOT NULL,
  `dblPrice` double NOT NULL,
  `blobImage` blob NOT NULL,
  `intQTY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tickets`
--

CREATE TABLE `tbl_tickets` (
  `intTicketID` int(11) NOT NULL,
  `dblPrice` double NOT NULL,
  `strDesc` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_tickets`
--

INSERT INTO `tbl_tickets` (`intTicketID`, `dblPrice`, `strDesc`) VALUES
(1, 100, 'day(A)'),
(2, 80, 'day(C)'),
(3, 150, 'Night(A)'),
(4, 120, 'Night(B)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`intAccountsID`);

--
-- Indexes for table `tbl_cottages`
--
ALTER TABLE `tbl_cottages`
  ADD PRIMARY KEY (`intCottagesID`);

--
-- Indexes for table `tbl_gallery`
--
ALTER TABLE `tbl_gallery`
  ADD PRIMARY KEY (`intGalleryID`);

--
-- Indexes for table `tbl_reserve`
--
ALTER TABLE `tbl_reserve`
  ADD PRIMARY KEY (`intReserveID`),
  ADD UNIQUE KEY `intReserveID_UNIQUE` (`intReserveID`),
  ADD KEY `R to A_idx` (`intReserveAccountID`);

--
-- Indexes for table `tbl_reserve_cottage`
--
ALTER TABLE `tbl_reserve_cottage`
  ADD PRIMARY KEY (`intReserveCottageID`),
  ADD KEY `RC to C_idx` (`intRCCottageID`),
  ADD KEY `RC to R_idx` (`intRCReserveID`);

--
-- Indexes for table `tbl_reserve_rooms`
--
ALTER TABLE `tbl_reserve_rooms`
  ADD PRIMARY KEY (`intReserveRoomsID`),
  ADD KEY `RR to R_idx` (`intRSReserveID`),
  ADD KEY `RR to RO_idx` (`intRSRoomID`);

--
-- Indexes for table `tbl_reserve_ticket`
--
ALTER TABLE `tbl_reserve_ticket`
  ADD PRIMARY KEY (`intTicketReserve`),
  ADD KEY `TR to R_idx` (`intReserveID`),
  ADD KEY `TR to T_idx` (`intTicketID`);

--
-- Indexes for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  ADD PRIMARY KEY (`intRoomsID`);

--
-- Indexes for table `tbl_tickets`
--
ALTER TABLE `tbl_tickets`
  ADD PRIMARY KEY (`intTicketID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  MODIFY `intAccountsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_cottages`
--
ALTER TABLE `tbl_cottages`
  MODIFY `intCottagesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_gallery`
--
ALTER TABLE `tbl_gallery`
  MODIFY `intGalleryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_reserve`
--
ALTER TABLE `tbl_reserve`
  MODIFY `intReserveID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `tbl_reserve_cottage`
--
ALTER TABLE `tbl_reserve_cottage`
  MODIFY `intReserveCottageID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_reserve_rooms`
--
ALTER TABLE `tbl_reserve_rooms`
  MODIFY `intReserveRoomsID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_reserve_ticket`
--
ALTER TABLE `tbl_reserve_ticket`
  MODIFY `intTicketReserve` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  MODIFY `intRoomsID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_tickets`
--
ALTER TABLE `tbl_tickets`
  MODIFY `intTicketID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_reserve`
--
ALTER TABLE `tbl_reserve`
  ADD CONSTRAINT `R to RA` FOREIGN KEY (`intReserveAccountID`) REFERENCES `tbl_accounts` (`intAccountsID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_reserve_cottage`
--
ALTER TABLE `tbl_reserve_cottage`
  ADD CONSTRAINT `RC to C` FOREIGN KEY (`intRCCottageID`) REFERENCES `tbl_cottages` (`intCottagesID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `RC to R` FOREIGN KEY (`intRCReserveID`) REFERENCES `tbl_reserve` (`intReserveID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_reserve_rooms`
--
ALTER TABLE `tbl_reserve_rooms`
  ADD CONSTRAINT `RR to R` FOREIGN KEY (`intRSReserveID`) REFERENCES `tbl_reserve` (`intReserveID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `RR to RO` FOREIGN KEY (`intRSRoomID`) REFERENCES `tbl_rooms` (`intRoomsID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_reserve_ticket`
--
ALTER TABLE `tbl_reserve_ticket`
  ADD CONSTRAINT `TR to R` FOREIGN KEY (`intReserveID`) REFERENCES `tbl_reserve` (`intReserveID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `TR to T` FOREIGN KEY (`intTicketID`) REFERENCES `tbl_tickets` (`intTicketID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
