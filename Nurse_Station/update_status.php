<?php

header("Content-Type: application/json");

require_once "../Config/db.php";

$data=json_decode(file_get_contents("php://input"),true);

if(!is_array($data) || empty($data["id_daftar"])){

    echo json_encode([
        "status"=>"error",
        "message"=>"Data pasien tidak valid."
    ]);

    exit;

}

try{

    $columnsToAdd=[
        "nadi"=>"VARCHAR(20) DEFAULT NULL",
        "laju_pernapasan"=>"VARCHAR(20) DEFAULT NULL",
        "alergi"=>"TEXT DEFAULT NULL",
        "risiko_jatuh"=>"TEXT DEFAULT NULL"
    ];

    foreach($columnsToAdd as $column=>$definition){

        $check=$pdo->prepare("SHOW COLUMNS FROM tanda_vital LIKE ?");
        $check->execute([$column]);

        if($check->rowCount()===0){
            $pdo->exec("ALTER TABLE tanda_vital ADD COLUMN $column $definition");
        }

    }

    // cek apakah data vital sudah ada

    $cek=$pdo->prepare("SELECT id_vital FROM tanda_vital WHERE id_daftar=?");
    $cek->execute([$data["id_daftar"]]);

    if($cek->rowCount()>0){

        $sql=$pdo->prepare("

        UPDATE tanda_vital SET

        tekanan_darah=?,
        nadi=?,
        suhu_tubuh=?,
        laju_pernapasan=?,
        berat_badan=?,
        tinggi_badan=?,
        keluhan_utama=?,
        alergi=?,
        risiko_jatuh=?

        WHERE id_daftar=?

        ");

        $sql->execute([

            $data["tekanan_darah"],
            $data["nadi"],
            $data["suhu_tubuh"],
            $data["laju_pernapasan"],
            $data["berat_badan"],
            $data["tinggi_badan"],
            $data["keluhan_utama"],
            $data["alergi"],
            $data["risiko_jatuh"],
            $data["id_daftar"]

        ]);

    }else{

        $sql=$pdo->prepare("

        INSERT INTO tanda_vital(

            id_daftar,
            keluhan_utama,
            tekanan_darah,
            nadi,
            suhu_tubuh,
            laju_pernapasan,
            berat_badan,
            tinggi_badan,
            alergi,
            risiko_jatuh,
            id_perawat

        )

        VALUES(?,?,?,?,?,?,?,?,?,?,?)

        ");

        $sql->execute([

            $data["id_daftar"],
            $data["keluhan_utama"],
            $data["tekanan_darah"],
            $data["nadi"],
            $data["suhu_tubuh"],
            $data["laju_pernapasan"],
            $data["berat_badan"],
            $data["tinggi_badan"],
            $data["alergi"],
            $data["risiko_jatuh"],

            1

        ]);

    }


    $update=$pdo->prepare("

    UPDATE pendaftaran_rajal

    SET status_periksa='Menunggu Dokter'

    WHERE id_daftar=?

    ");

    $update->execute([

        $data["id_daftar"]

    ]);


    echo json_encode([

        "status"=>"success",

        "message"=>"Pasien berhasil dikirim ke Dokter."

    ]);

}catch(Exception $e){

    echo json_encode([

        "status"=>"error",

        "message"=>$e->getMessage()

    ]);

}

?>