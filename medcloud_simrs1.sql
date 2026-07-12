-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 05, 2026 at 03:16 PM
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
-- Database: `medcloud_simrs1`
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
  `status_periksa` enum('Menunggu Perawat','Menunggu Dokter','Menunggu Farmasi','Menunggu Kasir','Selesai','Batal') DEFAULT 'Menunggu Perawat',
  `tanggal_kunjungan` date NOT NULL,
  `waktu_daftar` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `resep_obat`
--

CREATE TABLE `resep_obat` (
  `id_resep` int NOT NULL,
  `id_daftar` int NOT NULL,
  `detail_resep` text NOT NULL,
  `status_resep` enum('Menunggu Apotek','Diserahkan') DEFAULT 'Menunggu Apotek',
  `id_farmasi` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `suhu_tubuh` decimal(4,2) DEFAULT NULL,
  `berat_badan` decimal(5,2) DEFAULT NULL,
  `tinggi_badan` decimal(5,2) DEFAULT NULL,
  `id_perawat` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  ADD KEY `fk_resep_rajal` (`id_daftar`);

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
  ADD KEY `fk_vital_rajal` (`id_daftar`);

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
  MODIFY `id_dokter` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emr_soap`
--
ALTER TABLE `emr_soap`
  MODIFY `id_soap` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pendaftaran_rajal`
--
ALTER TABLE `pendaftaran_rajal`
  MODIFY `id_daftar` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poliklinik`
--
ALTER TABLE `poliklinik`
  MODIFY `id_poli` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resep_obat`
--
ALTER TABLE `resep_obat`
  MODIFY `id_resep` int NOT NULL AUTO_INCREMENT;

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
  MODIFY `id_vital` int NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `fk_resep_rajal` FOREIGN KEY (`id_daftar`) REFERENCES `pendaftaran_rajal` (`id_daftar`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `fk_vital_rajal` FOREIGN KEY (`id_daftar`) REFERENCES `pendaftaran_rajal` (`id_daftar`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
