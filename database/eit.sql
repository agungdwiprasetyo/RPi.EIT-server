-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 10 Apr 2017 pada 18.05
-- Versi Server: 5.7.17-0ubuntu0.16.04.2
-- PHP Version: 7.0.17-3+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eit`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `algoritma`
--

CREATE TABLE `algoritma` (
  `id_algor` varchar(255) NOT NULL,
  `nama_algor` varchar(255) NOT NULL,
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `algoritma`
--

INSERT INTO `algoritma` (`id_algor`, `nama_algor`, `status`) VALUES
('ART', 'Algebraic Reconstruction Technique', 0),
('BP', 'Back Projection', 1),
('GREIT', 'Graz Consensus Reconstruction Algorithm for EIT (GREIT)', 1),
('JAC', 'Jacobian/Gauss-Newton', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_ukur`
--

CREATE TABLE `data_ukur` (
  `id_data` int(10) NOT NULL,
  `nama_data` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `citra` varchar(255) DEFAULT NULL,
  `arus_injeksi` float NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `data_ukur`
--

INSERT INTO `data_ukur` (`id_data`, `nama_data`, `filename`, `model`, `citra`, `arus_injeksi`, `datetime`) VALUES
(1, 'Data Homogen', 'DataHomogen.txt', '', NULL, 7.5, '2017-03-24 16:35:25'),
(2, 'Data Penelitian Tumit', 'DataPenelitianTumit.txt', 'DataPenelitianTumit.png', '20170325-010355-BP.png', 7.5, '2017-04-07 11:35:15'),
(3, 'Phantom A', 'PhantomA.txt', 'PhantomA.png', '20170407-204920-BP.png', 7.5, '2017-04-07 13:50:39'),
(4, 'Phantom B', 'PhantomB.txt', 'PhantomB.png', '20170405-211658-BP.png', 7.5, '2017-04-07 11:27:14'),
(5, 'Phantom C', 'PhantomC.txt', 'PhantomC.png', '20170407-204313-BP.png', 7.5, '2017-04-10 10:13:18'),
(6, 'Phantom D', 'PhantomD.txt', 'PhantomD.png', '20170410-144403-BP.png', 7.5, '2017-04-10 10:02:05'),
(7, 'Ukur Arduino', 'UkurArduino.txt', '', NULL, 7.5, '2017-04-04 16:24:08'),
(8, 'Data 2008', 'Data2008.txt', '', NULL, 2, '2017-03-25 07:46:36'),
(9, 'asdada', 'asdad.txt', '', NULL, 2.5, '2017-04-03 07:52:47'),
(10, 'fzxcz', 'adas.txt', '', NULL, 3.3, '2017-04-03 07:52:47'),
(11, 'asda', 'sdd.txt', '', NULL, 44, '2017-04-03 07:53:16'),
(12, 'Phantom B Manual', 'PhantomBManual.txt', '', NULL, 7.5, '2017-04-04 18:02:27'),
(13, 'Cobak', 'Cobak.txt', NULL, '20170405-211658-BP.png', 7.5, '2017-04-10 10:09:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `image`
--

CREATE TABLE `image` (
  `nama` varchar(255) NOT NULL,
  `id_data` int(20) NOT NULL,
  `id_algor` varchar(255) NOT NULL,
  `kerapatan` float NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `image`
--

INSERT INTO `image` (`nama`, `id_data`, `id_algor`, `kerapatan`, `datetime`) VALUES
('20170325-010355-BP.png', 2, 'BP', 0.05, '2017-03-24 18:04:38'),
('20170325-010527-JAC.png', 6, 'JAC', 0.05, '2017-03-24 18:06:26'),
('20170325-223635-BP.png', 2, 'BP', 0.07, '2017-03-25 15:36:49'),
('20170328-182502-JAC.png', 2, 'JAC', 0.05, '2017-03-28 11:25:57'),
('20170331-000259-BP.png', 5, 'BP', 0.1, '2017-03-30 17:03:06'),
('20170331-180502-BP.png', 4, 'BP', 0.05, '2017-03-31 11:05:52'),
('20170402-233530-BP.png', 5, 'BP', 0.1, '2017-04-02 16:35:36'),
('20170405-211658-BP.png', 13, 'BP', 0.05, '2017-04-05 14:17:53'),
('20170407-204313-BP.png', 5, 'BP', 0.05, '2017-04-07 13:44:02'),
('20170407-204920-BP.png', 3, 'BP', 0.05, '2017-04-07 13:50:06'),
('20170410-144403-BP.png', 6, 'BP', 0.05, '2017-04-10 07:44:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `login`
--

CREATE TABLE `login` (
  `id_user` int(10) NOT NULL,
  `tipe_user` varchar(255) NOT NULL,
  `id_alat` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `login`
--

INSERT INTO `login` (`id_user`, `tipe_user`, `id_alat`, `username`, `password`, `nama`) VALUES
(1, 'superuser', 'all', 'agungdwiprasetyo', 'yangpentingpanjangdansusah', 'Agung Dwi Prasetyo');

-- --------------------------------------------------------

--
-- Struktur dari tabel `perangkat_eit`
--

CREATE TABLE `perangkat_eit` (
  `id_alat` varchar(255) NOT NULL,
  `nama_alat` varchar(255) NOT NULL,
  `versi_raspi` varchar(255) NOT NULL,
  `tipe_arduino` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `perangkat_eit`
--

INSERT INTO `perangkat_eit` (`id_alat`, `nama_alat`, `versi_raspi`, `tipe_arduino`, `token`, `foto`) VALUES
('eit001', 'Perangkat EIT Departemen Ilmu Komputer', 'Raspberry Pi 3 Model B', 'Arduino Mega', 'th2cyS6XyBRWhUiQAAAD', 'eit001.jpg'),
('eit002', 'Perangkat EIT Departemen Matematika', 'Raspberry Pi 3 Model B', 'Arduino Mega', 'CqrKVb656swSF8ZCAAAF', NULL),
('eit003', 'Perangkat EIT Departemen Fisika', 'Raspberry Pi 3 Model B', 'Arduino Uno', 'fg5xoAUewqwCJcicAAAF', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `algoritma`
--
ALTER TABLE `algoritma`
  ADD PRIMARY KEY (`id_algor`);

--
-- Indexes for table `data_ukur`
--
ALTER TABLE `data_ukur`
  ADD PRIMARY KEY (`id_data`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`nama`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `perangkat_eit`
--
ALTER TABLE `perangkat_eit`
  ADD PRIMARY KEY (`id_alat`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_ukur`
--
ALTER TABLE `data_ukur`
  MODIFY `id_data` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
