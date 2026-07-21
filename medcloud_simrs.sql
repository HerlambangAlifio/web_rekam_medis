-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 21, 2026 at 12:31 PM
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
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `id_dokter` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `nama_dokter` varchar(100) NOT NULL,
  `spesialisasi` varchar(100) NOT NULL,
  `no_sip` varchar(50) NOT NULL,
  `id_poli` int NOT NULL,
  `status_aktif` enum('Aktif','Non-Aktif') DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dokter`
--

INSERT INTO `dokter` (`id_dokter`, `id_user`, `nama_dokter`, `spesialisasi`, `no_sip`, `id_poli`, `status_aktif`) VALUES
(1, NULL, 'dr. Andi', 'Umum', 'SIP001', 1, 'Aktif'),
(2, NULL, 'dr. Budi', 'Gigi', 'SIP002', 2, 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `emr_soap`
--

CREATE TABLE `emr_soap` (
  `id_soap` int NOT NULL,
  `id_daftar` int NOT NULL,
  `subjective` text NOT NULL,
  `objective` text NOT NULL,
  `assessment` text NOT NULL,
  `plan` text NOT NULL,
  `id_dokter` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `no_rm` varchar(10) NOT NULL,
  `nama_pasien` varchar(100) NOT NULL,
  `no_bpjs` varchar(20) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `alamat` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`no_rm`, `nama_pasien`, `no_bpjs`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `created_at`) VALUES
('111111', 'NANA', NULL, NULL, NULL, NULL, '2026-07-07 15:31:15'),
('12-13-77', 'abel', NULL, NULL, NULL, NULL, '2026-07-17 07:30:14'),
('12-13-89', 'akmal', NULL, NULL, NULL, NULL, '2026-07-13 10:42:20'),
('12-45-67', 'BUDI', NULL, NULL, NULL, NULL, '2026-07-05 16:11:11'),
('123423', 'BADA', NULL, NULL, NULL, NULL, '2026-07-07 12:58:03'),
('15-07-26', 'zaki', NULL, NULL, NULL, NULL, '2026-07-15 13:20:55'),
('16-07', 'ammar', NULL, NULL, NULL, NULL, '2026-07-15 13:42:01'),
('17-07-26', 'Anwar', NULL, NULL, NULL, NULL, '2026-07-17 06:16:25'),
('17-0726', 'kamal', NULL, NULL, NULL, NULL, '2026-07-17 06:00:42'),
('222222', 'HAHA', NULL, NULL, NULL, NULL, '2026-07-08 14:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran_rajal`
--

CREATE TABLE `pendaftaran_rajal` (
  `id_daftar` int NOT NULL,
  `no_antrean` varchar(10) NOT NULL,
  `no_rm` varchar(10) NOT NULL,
  `id_poli` int NOT NULL,
  `id_dokter` int NOT NULL,
  `penjamin` enum('BPJS PBI','BPJS Mandiri','UMUM','ASURANSI SWASTA') NOT NULL,
  `status_periksa` enum('Menunggu Perawat','Menunggu Dokter','Menunggu Billing','Menunggu Farmasi','Menunggu Kasir','Selesai','Batal') DEFAULT NULL,
  `tanggal_kunjungan` date NOT NULL,
  `waktu_daftar` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pendaftaran_rajal`
--

INSERT INTO `pendaftaran_rajal` (`id_daftar`, `no_antrean`, `no_rm`, `id_poli`, `id_dokter`, `penjamin`, `status_periksa`, `tanggal_kunjungan`, `waktu_daftar`) VALUES
(5, 'A-009', '12-45-67', 1, 1, 'BPJS PBI', 'Selesai', '2026-07-05', '2026-07-05 16:37:39'),
(6, 'A-010', '123423', 3, 2, 'BPJS Mandiri', 'Selesai', '2026-07-07', '2026-07-07 12:58:03'),
(7, 'A-011', '111111', 1, 2, 'BPJS Mandiri', 'Selesai', '2026-07-07', '2026-07-07 15:31:15'),
(8, 'A-012', '222222', 1, 2, 'BPJS PBI', 'Selesai', '2026-07-08', '2026-07-08 14:14:25'),
(9, 'A-001', '12-13-89', 2, 1, 'UMUM', 'Selesai', '2026-07-13', '2026-07-13 10:42:20'),
(10, 'A-008', '12-13-89', 1, 2, 'UMUM', 'Selesai', '2026-07-15', '2026-07-15 12:47:00'),
(11, 'A-020', '15-07-26', 1, 2, 'UMUM', 'Selesai', '2026-07-15', '2026-07-15 13:20:55'),
(12, 'A-012', '16-07', 1, 1, 'UMUM', 'Selesai', '2026-07-15', '2026-07-15 13:42:01'),
(13, 'A-015', '17-0726', 2, 2, 'UMUM', 'Selesai', '2026-07-17', '2026-07-17 06:00:42'),
(14, 'A-13', '17-07-26', 1, 1, 'BPJS Mandiri', 'Selesai', '2026-07-17', '2026-07-17 06:16:25'),
(15, 'A-017', '17-07-26', 1, 2, 'UMUM', 'Selesai', '2026-07-17', '2026-07-17 06:22:11'),
(16, 'A-12', '17-07-26', 3, 1, 'BPJS PBI', 'Selesai', '2026-07-17', '2026-07-17 06:25:02'),
(17, 'A-017', '12-13-77', 2, 1, 'BPJS Mandiri', 'Selesai', '2026-07-17', '2026-07-17 07:30:14'),
(18, 'A-009', '17-07-26', 1, 1, 'UMUM', 'Selesai', '2026-07-17', '2026-07-17 08:16:18'),
(19, 'A-009', '17-07-26', 1, 2, 'BPJS Mandiri', 'Menunggu Perawat', '2026-07-20', '2026-07-20 06:42:42'),
(20, '112233', '17-0726', 1, 2, 'UMUM', 'Menunggu Perawat', '2026-07-20', '2026-07-20 06:51:21');

-- --------------------------------------------------------

--
-- Table structure for table `poliklinik`
--

CREATE TABLE `poliklinik` (
  `id_poli` int NOT NULL,
  `kode_poli` varchar(10) NOT NULL,
  `nama_poli` varchar(100) NOT NULL,
  `status_aktif` enum('Aktif','Non-Aktif') DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `poliklinik`
--

INSERT INTO `poliklinik` (`id_poli`, `kode_poli`, `nama_poli`, `status_aktif`) VALUES
(1, 'PU', 'Poli Umum', 'Aktif'),
(2, 'PG', 'Poli Gigi', 'Aktif'),
(3, 'PA', 'Poli Anak', 'Aktif'),
(4, 'PK', 'Poli Kandungan', 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `resep_obat`
--

CREATE TABLE `resep_obat` (
  `id_resep` int NOT NULL,
  `id_daftar` int NOT NULL,
  `nama_obat` varchar(150) NOT NULL,
  `signa` varchar(150) NOT NULL,
  `jumlah` int NOT NULL,
  `status_resep` enum('Menunggu Apotek','Diserahkan') DEFAULT 'Menunggu Apotek',
  `id_farmasi` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `resep_obat`
--

INSERT INTO `resep_obat` (`id_resep`, `id_daftar`, `nama_obat`, `signa`, `jumlah`, `status_resep`, `id_farmasi`, `created_at`) VALUES
(5, 5, 'paracetamol', '3x1', 2, 'Menunggu Apotek', NULL, '2026-07-08 16:44:30'),
(6, 6, 'bold', '3x1', 1, 'Menunggu Apotek', NULL, '2026-07-08 17:53:56'),
(7, 7, 'paracetamol', '1 x 3', 12, 'Menunggu Apotek', NULL, '2026-07-13 10:44:12'),
(8, 8, 'paracetamol', '1x2', 12, 'Menunggu Apotek', NULL, '2026-07-15 12:50:09'),
(9, 9, 'paracetamol', '3 x 1', 12, 'Menunggu Apotek', NULL, '2026-07-15 13:04:55'),
(10, 10, 'surya 1 batang', '3 x 1', 16, 'Menunggu Apotek', NULL, '2026-07-15 13:22:23'),
(11, 11, 'marlong', '3 x 1', 20, 'Menunggu Apotek', NULL, '2026-07-15 13:22:41'),
(12, 12, 'aroma ice berry', '3 x 1', 16, 'Menunggu Apotek', NULL, '2026-07-15 13:43:16'),
(13, 13, 'surya isi 16', '3 x 1', 16, 'Menunggu Apotek', NULL, '2026-07-17 06:01:45'),
(14, 14, 'dwads', '2 x 1', 10, 'Menunggu Apotek', NULL, '2026-07-17 06:17:52'),
(15, 15, 'diplomat mild ', '3 x 1', 20, 'Menunggu Apotek', NULL, '2026-07-17 06:23:23'),
(16, 16, 'paracetamol', '3 x 1', 12, 'Menunggu Apotek', NULL, '2026-07-17 06:25:53'),
(17, 17, 'diplomat', '3 x 1', 16, 'Menunggu Apotek', NULL, '2026-07-17 07:32:15'),
(18, 18, 'ihids', '3x1', 1, 'Menunggu Apotek', NULL, '2026-07-17 08:18:09');

-- --------------------------------------------------------

--
-- Table structure for table `tagihan`
--

CREATE TABLE `tagihan` (
  `id_tagihan` int NOT NULL,
  `id_daftar` int NOT NULL,
  `no_tagihan` varchar(20) NOT NULL,
  `total_biaya` decimal(12,2) NOT NULL DEFAULT '0.00',
  `status_pembayaran` enum('Belum Lunas','Lunas') DEFAULT 'Belum Lunas',
  `tanggal_bayar` datetime DEFAULT NULL,
  `id_kasir` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tagihan_detail`
--

CREATE TABLE `tagihan_detail` (
  `id_detail` int NOT NULL,
  `id_tagihan` int NOT NULL,
  `nama_item` varchar(150) NOT NULL,
  `jenis_item` enum('Tindakan Poli','Obat','Administrasi') NOT NULL,
  `harga_satuan` decimal(12,2) NOT NULL,
  `jumlah` int NOT NULL DEFAULT '1',
  `subtotal` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tanda_vital`
--

CREATE TABLE `tanda_vital` (
  `id_vital` int NOT NULL,
  `id_daftar` int NOT NULL,
  `keluhan_utama` text,
  `tekanan_darah` varchar(20) DEFAULT NULL,
  `nadi` int DEFAULT NULL,
  `suhu_tubuh` decimal(4,2) DEFAULT NULL,
  `laju_pernapasan` int DEFAULT NULL,
  `berat_badan` decimal(5,2) DEFAULT NULL,
  `tinggi_badan` decimal(5,2) DEFAULT NULL,
  `alergi` text,
  `risiko_jatuh` text,
  `id_perawat` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tanda_vital`
--

INSERT INTO `tanda_vital` (`id_vital`, `id_daftar`, `keluhan_utama`, `tekanan_darah`, `nadi`, `suhu_tubuh`, `laju_pernapasan`, `berat_badan`, `tinggi_badan`, `alergi`, `risiko_jatuh`, `id_perawat`, `created_at`) VALUES
(1, 5, 'hadhad', '120/12', 23, 23.00, 12, 12.00, 121.00, 'hgwhe', 'hvevq', 1, '2026-07-07 15:03:51'),
(2, 7, 'CSDCDS', '123', 22, 12.00, 32, 23.00, 322.00, 'CSCSS', 'WDWDW', 1, '2026-07-07 15:31:42'),
(3, 8, 'SEHAT', '120/56', 34, 64.00, 53, 55.00, 232.00, 'TIDK ADA', 'TIDAK ADA', 1, '2026-07-08 14:14:55'),
(4, 9, 'sembarang', '120', 80, 36.00, 18, 70.00, 170.00, 'tidak ada', 'tidak ada', 1, '2026-07-13 10:43:17'),
(5, 10, 'tidak ada', '100', 40, 25.00, 20, 60.00, 167.00, 'tidak ada', 'tidak ada', 1, '2026-07-15 12:47:59'),
(6, 11, 'tidak ada', '120', 50, 30.00, 20, 60.00, 167.00, 'tidak ada', 'tidak ada', 1, '2026-07-15 13:21:43'),
(7, 12, 'tidak ada', '100', 70, 30.00, 20, 60.00, 170.00, 'tidak ada', 'tidak ada', 1, '2026-07-15 13:42:47'),
(8, 13, 'ada', '80', 43, 32.00, 20, 60.00, 167.00, 'ada', 'ada', 1, '2026-07-17 06:01:21'),
(9, 14, 'ADA', '120', 80, 36.00, 20, 80.00, 167.00, 'Ada', 'Ada', 1, '2026-07-17 06:17:38'),
(10, 15, 'Ada', '123', 123, 40.00, 20, 60.00, 167.00, 'Ada', 'Ada', 1, '2026-07-17 06:22:59'),
(11, 16, 'Ada', '120', 80, 36.00, 20, 70.00, 170.00, 'Ada', 'Ada', 1, '2026-07-17 06:25:37'),
(12, 17, 'sfd', '120', 80, 26.00, 20, 60.00, 170.00, 'dfdfg', 'dssdgd', 1, '2026-07-17 07:31:42'),
(13, 18, 'Sering Pusing kepala ', '120', 80, 36.00, 18, 60.00, 170.00, 'udang', 'tidak ada', 1, '2026-07-17 08:17:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `role` enum('Admin','Front Office','Perawat','Dokter','Farmasi','Kasir') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`id_dokter`),
  ADD UNIQUE KEY `idx_no_sip` (`no_sip`),
  ADD KEY `fk_dokter_poli` (`id_poli`);

--
-- Indexes for table `emr_soap`
--
ALTER TABLE `emr_soap`
  ADD PRIMARY KEY (`id_soap`),
  ADD KEY `fk_soap_rajal` (`id_daftar`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`no_rm`),
  ADD KEY `idx_nama_pasien` (`nama_pasien`);

--
-- Indexes for table `pendaftaran_rajal`
--
ALTER TABLE `pendaftaran_rajal`
  ADD PRIMARY KEY (`id_daftar`),
  ADD KEY `idx_rajal_rm` (`no_rm`),
  ADD KEY `idx_rajal_tanggal_poli` (`tanggal_kunjungan`,`id_poli`),
  ADD KEY `fk_rajal_poli` (`id_poli`),
  ADD KEY `fk_rajal_dokter` (`id_dokter`);

--
-- Indexes for table `poliklinik`
--
ALTER TABLE `poliklinik`
  ADD PRIMARY KEY (`id_poli`),
  ADD UNIQUE KEY `idx_kode_poli` (`kode_poli`);

--
-- Indexes for table `resep_obat`
--
ALTER TABLE `resep_obat`
  ADD PRIMARY KEY (`id_resep`),
  ADD KEY `id_daftar` (`id_daftar`);

--
-- Indexes for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD PRIMARY KEY (`id_tagihan`),
  ADD UNIQUE KEY `idx_no_tagihan` (`no_tagihan`),
  ADD KEY `fk_tagihan_rajal` (`id_daftar`);

--
-- Indexes for table `tagihan_detail`
--
ALTER TABLE `tagihan_detail`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `fk_detail_tagihan` (`id_tagihan`);

--
-- Indexes for table `tanda_vital`
--
ALTER TABLE `tanda_vital`
  ADD PRIMARY KEY (`id_vital`),
  ADD KEY `fk_ttv_daftar` (`id_daftar`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `idx_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dokter`
--
ALTER TABLE `dokter`
  MODIFY `id_dokter` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `emr_soap`
--
ALTER TABLE `emr_soap`
  MODIFY `id_soap` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pendaftaran_rajal`
--
ALTER TABLE `pendaftaran_rajal`
  MODIFY `id_daftar` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `poliklinik`
--
ALTER TABLE `poliklinik`
  MODIFY `id_poli` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `resep_obat`
--
ALTER TABLE `resep_obat`
  MODIFY `id_resep` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tagihan`
--
ALTER TABLE `tagihan`
  MODIFY `id_tagihan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tagihan_detail`
--
ALTER TABLE `tagihan_detail`
  MODIFY `id_detail` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tanda_vital`
--
ALTER TABLE `tanda_vital`
  MODIFY `id_vital` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dokter`
--
ALTER TABLE `dokter`
  ADD CONSTRAINT `fk_dokter_poli` FOREIGN KEY (`id_poli`) REFERENCES `poliklinik` (`id_poli`) ON DELETE RESTRICT;

--
-- Constraints for table `emr_soap`
--
ALTER TABLE `emr_soap`
  ADD CONSTRAINT `fk_soap_rajal` FOREIGN KEY (`id_daftar`) REFERENCES `pendaftaran_rajal` (`id_daftar`) ON DELETE CASCADE;

--
-- Constraints for table `pendaftaran_rajal`
--
ALTER TABLE `pendaftaran_rajal`
  ADD CONSTRAINT `fk_rajal_dokter` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_rajal_pasien` FOREIGN KEY (`no_rm`) REFERENCES `pasien` (`no_rm`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rajal_poli` FOREIGN KEY (`id_poli`) REFERENCES `poliklinik` (`id_poli`) ON DELETE RESTRICT;

--
-- Constraints for table `resep_obat`
--
ALTER TABLE `resep_obat`
  ADD CONSTRAINT `resep_obat_ibfk_1` FOREIGN KEY (`id_daftar`) REFERENCES `pendaftaran_rajal` (`id_daftar`);

--
-- Constraints for table `tagihan`
--
ALTER TABLE `tagihan`
  ADD CONSTRAINT `fk_tagihan_rajal` FOREIGN KEY (`id_daftar`) REFERENCES `pendaftaran_rajal` (`id_daftar`) ON DELETE CASCADE;

--
-- Constraints for table `tagihan_detail`
--
ALTER TABLE `tagihan_detail`
  ADD CONSTRAINT `fk_detail_tagihan` FOREIGN KEY (`id_tagihan`) REFERENCES `tagihan` (`id_tagihan`) ON DELETE CASCADE;

--
-- Constraints for table `tanda_vital`
--
ALTER TABLE `tanda_vital`
  ADD CONSTRAINT `fk_ttv_daftar` FOREIGN KEY (`id_daftar`) REFERENCES `pendaftaran_rajal` (`id_daftar`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
