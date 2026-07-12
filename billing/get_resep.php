<?php

header("Content-Type: application/json");

require_once "../Config/db.php";

$id=$_GET["id_daftar"];

$sql=$pdo->prepare("

SELECT

ro.nama_obat,
ro.signa,
ro.jumlah

FROM resep_obat ro

WHERE ro.id_daftar=?

");

$sql->execute([$id]);

echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));