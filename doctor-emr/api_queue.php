<?php

header("Content-Type: application/json");
require_once "../Config/db.php";

try {

    $sql = "
    SELECT
        pr.id_daftar,
        pr.no_antrean,
        pr.no_rm,

        p.nama_pasien,

        pk.nama_poli,

        d.nama_dokter,

        tv.keluhan_utama,
        tv.tekanan_darah,
        tv.nadi,
        tv.laju_pernapasan,
        tv.suhu_tubuh,
        tv.berat_badan,
        tv.tinggi_badan,
        tv.alergi

    FROM pendaftaran_rajal pr

    INNER JOIN pasien p
        ON pr.no_rm=p.no_rm

    INNER JOIN poliklinik pk
        ON pr.id_poli=pk.id_poli

    INNER JOIN dokter d
        ON pr.id_dokter=d.id_dokter

    LEFT JOIN tanda_vital tv
        ON pr.id_daftar=tv.id_daftar

    WHERE pr.status_periksa='Menunggu Dokter'

    ORDER BY pr.waktu_daftar ASC
    ";

    $stmt=$pdo->query($sql);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

}catch(Exception $e){

    echo json_encode([
        "status"=>"error",
        "message"=>$e->getMessage()
    ]);

}