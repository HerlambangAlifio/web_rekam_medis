-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 01, 2026 at 04:17 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medcloud_simrs`
--

-- --------------------------------------------------------

--
-- Table structure for table `antrean`
--

CREATE TABLE `antrean` (
  `id` int NOT NULL,
  `no_antrean` varchar(10) NOT NULL,
  `no_rm` varchar(10) NOT NULL,
  `penjamin` enum('BPJS PBI','BPJS Mandiri','UMUM','ASURANSI SWASTA') NOT NULL,
  `klinik` varchar(50) NOT NULL,
  `dpjp` varchar(100) NOT NULL,
  `status_antrean` enum('Menunggu di Klinik','Selesai') DEFAULT 'Menunggu di Klinik',
  `tanggal_antrean` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `antrean`
--

INSERT INTO `antrean` (`id`, `no_antrean`, `no_rm`, `penjamin`, `klinik`, `dpjp`, `status_antrean`, `tanggal_antrean`, `created_at`) VALUES
(1, 'A-001', '10-22-45', 'BPJS PBI', 'Poli Jantung', 'dr. Heru Prasetyo, Sp.JP', 'Menunggu di Klinik', '2026-07-01', '2026-07-01 03:37:29'),
(2, 'A-002', '11-04-12', 'UMUM', 'Poli Anak', 'dr. Maya Sari, Sp.A', 'Menunggu di Klinik', '2026-07-01', '2026-07-01 03:37:29'),
(3, 'A-003', '10-88-21', 'BPJS Mandiri', 'Poli Gigi', 'drg. Anita Wijaya', 'Menunggu di Klinik', '2026-07-01', '2026-07-01 03:37:29'),
(5, 'A217821', '50-86-45', 'BPJS PBI', 'Poli Anak', 'dr.maya', 'Menunggu di Klinik', '2026-07-01', '2026-07-01 03:48:30'),
(6, '112233', '92-90-76', 'UMUM', 'Poli Gigi', 'Dr.antra', 'Menunggu di Klinik', '2026-07-01', '2026-07-01 03:56:08');

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `no_rm` varchar(10) NOT NULL,
  `nama_pasien` varchar(100) NOT NULL,
  `no_bpjs` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`no_rm`, `nama_pasien`, `no_bpjs`, `created_at`) VALUES
('10-22-45', 'Budi Santoso', '000123456789', '2026-07-01 03:37:29'),
('10-88-21', 'Dedi Kurniawan', '000987654321', '2026-07-01 03:37:29'),
('11-04-12', 'Siti Aminah', NULL, '2026-07-01 03:37:29'),
('12-15-33', 'Ratna Sari', NULL, '2026-07-01 03:37:29'),
('50-86-45', 'Yanto', NULL, '2026-07-01 03:48:30'),
('92-90-76', 'Azmi', NULL, '2026-07-01 03:56:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `antrean`
--
ALTER TABLE `antrean`
  ADD PRIMARY KEY (`id`),
  ADD KEY `no_rm` (`no_rm`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`no_rm`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `antrean`
--
ALTER TABLE `antrean`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `antrean`
--
ALTER TABLE `antrean`
  ADD CONSTRAINT `antrean_ibfk_1` FOREIGN KEY (`no_rm`) REFERENCES `pasien` (`no_rm`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
