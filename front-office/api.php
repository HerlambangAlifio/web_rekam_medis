<?php
header("Content-Type: application/json");
require_once '../Config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

/* =========================
   GET DATA PENDAFTARAN
========================= */
if ($method === 'GET') {

    try {

        $stmt = $pdo->query("
            SELECT
                pr.id_daftar,
                pr.no_antrean,
                p.nama_pasien,
                p.no_rm,
                pr.penjamin,
                pk.nama_poli AS klinik,
                d.nama_dokter AS dpjp,
                pr.status_periksa,
                pr.tanggal_kunjungan
            FROM pendaftaran_rajal pr
            JOIN pasien p
                ON pr.no_rm = p.no_rm
            JOIN poliklinik pk
                ON pr.id_poli = pk.id_poli
            JOIN dokter d
                ON pr.id_dokter = d.id_dokter
            ORDER BY
                pr.tanggal_kunjungan DESC,
                pr.no_antrean ASC
        ");

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status"=>"success",
            "data"=>$data
        ]);

    } catch(Exception $e){

        echo json_encode([
            "status"=>"error",
            "message"=>$e->getMessage()
        ]);

    }

    exit;
}


/* =========================
   DAFTAR PASIEN
========================= */

if ($method === 'POST') {

    $input = json_decode(file_get_contents("php://input"), true);

    if (
        empty($input['queueNumber']) ||
        empty($input['patientName']) ||
        empty($input['no_rm']) ||
        empty($input['insurance']) ||
        empty($input['clinic']) ||
        empty($input['dpjp'])
    ){

        echo json_encode([
            "status"=>"error",
            "message"=>"Data registrasi tidak lengkap."
        ]);

        exit;
    }

    $queueNumber = trim($input['queueNumber']);
    $patientName = trim($input['patientName']);
    $noRm        = trim($input['no_rm']);
    $insurance   = trim($input['insurance']);

    /* sekarang clinic = id_poli */
    $idPoli      = intval($input['clinic']);

    /* sekarang dpjp = id_dokter */
    $idDokter    = intval($input['dpjp']);

    $today = date("Y-m-d");

    try{

        /* cek pasien */

        $cek = $pdo->prepare("
            SELECT no_rm
            FROM pasien
            WHERE no_rm=?
        ");

        $cek->execute([$noRm]);

        if($cek->rowCount()==0){

            $insertPasien = $pdo->prepare("
                INSERT INTO pasien
                (
                    no_rm,
                    nama_pasien
                )
                VALUES
                (?,?)
            ");

            $insertPasien->execute([
                $noRm,
                $patientName
            ]);

        }


        /* simpan pendaftaran */

        $insert = $pdo->prepare("
            INSERT INTO pendaftaran_rajal
            (
                no_antrean,
                no_rm,
                id_poli,
                id_dokter,
                penjamin,
                status_periksa,
                tanggal_kunjungan
            )
            VALUES
            (
                ?, ?, ?, ?, ?,
                'Menunggu Perawat',
                ?
            )
        ");

        $insert->execute([
            $queueNumber,
            $noRm,
            $idPoli,
            $idDokter,
            $insurance,
            $today
        ]);

        echo json_encode([
            "status"=>"success",
            "message"=>"Pasien berhasil didaftarkan."
        ]);

    }
    catch(Exception $e){

        echo json_encode([
            "status"=>"error",
            "message"=>$e->getMessage()
        ]);

    }

    exit;
}
/* =========================
   DAFTAR / EDIT PASIEN
========================= */

if ($method === 'POST') {

    $input = json_decode(file_get_contents("php://input"), true);

    if (
        empty($input['queueNumber']) ||
        empty($input['patientName']) ||
        empty($input['no_rm']) ||
        empty($input['insurance']) ||
        empty($input['clinic']) ||
        empty($input['dpjp'])
    ){
        echo json_encode([
            "status"=>"error",
            "message"=>"Data registrasi tidak lengkap."
        ]);
        exit;
    }

    $queueNumber = trim($input['queueNumber']);
    $patientName = trim($input['patientName']);
    $noRm        = trim($input['no_rm']);
    $insurance   = trim($input['insurance']);
    $idPoli      = intval($input['clinic']);
    $idDokter    = intval($input['dpjp']);
    $today       = date("Y-m-d");

    // Cek apakah ada id_daftar yang dikirim (berarti mode EDIT / Pasien Lama)
    $idDaftar    = isset($input['id_daftar']) ? intval($input['id_daftar']) : null;

    try{
        /* 1. Update/Insert Master Data Pasien */
        $cek = $pdo->prepare("SELECT no_rm FROM pasien WHERE no_rm=?");
        $cek->execute([$noRm]);

        if($cek->rowCount() == 0){
            $insertPasien = $pdo->prepare("INSERT INTO pasien (no_rm, nama_pasien) VALUES (?,?)");
            $insertPasien->execute([$noRm, $patientName]);
        } else {
            $updatePasien = $pdo->prepare("UPDATE pasien SET nama_pasien=? WHERE no_rm=?");
            $updatePasien->execute([$patientName, $noRm]);
        }

        /* 2. Cek Mode: UPDATE Antrean Lama ATAU INSERT Antrean Baru */
        if ($idDaftar) {
            // MODE EDIT (PASIEN LAMA): Mengubah data antrean yang sudah ada
            $update = $pdo->prepare("
                UPDATE pendaftaran_rajal
                SET 
                    no_antrean = ?,
                    no_rm = ?,
                    id_poli = ?,
                    id_dokter = ?,
                    penjamin = ?
                WHERE id_daftar = ?
            ");

            $update->execute([
                $queueNumber,
                $noRm,
                $idPoli,
                $idDokter,
                $insurance,
                $idDaftar
            ]);

            $message = "Data pendaftaran pasien berhasil diperbarui.";

        } else {
            // MODE BARU: Tambah baris antrean baru
            $insert = $pdo->prepare("
                INSERT INTO pendaftaran_rajal
                (
                    no_antrean,
                    no_rm,
                    id_poli,
                    id_dokter,
                    penjamin,
                    status_periksa,
                    tanggal_kunjungan
                )
                VALUES
                (
                    ?, ?, ?, ?, ?,
                    'Menunggu Perawat',
                    ?
                )
            ");

            $insert->execute([
                $queueNumber,
                $noRm,
                $idPoli,
                $idDokter,
                $insurance,
                $today
            ]);

            $message = "Pasien berhasil didaftarkan.";
        }

        echo json_encode([
            "status"=>"success",
            "message"=>$message
        ]);

    }
    catch(Exception $e){
        echo json_encode([
            "status"=>"error",
            "message"=>$e->getMessage()
        ]);
    }

    exit;
}