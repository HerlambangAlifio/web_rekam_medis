<?php

header("Content-Type: application/json");

require_once "../Config/db.php";

$sql="

SELECT

pr.id_daftar,
pr.no_antrean,
pr.status_periksa,

p.nama_pasien,

pk.nama_poli,

d.nama_dokter

FROM pendaftaran_rajal pr

JOIN pasien p
ON p.no_rm=pr.no_rm

JOIN poliklinik pk
ON pk.id_poli=pr.id_poli

JOIN dokter d
ON d.id_dokter=pr.id_dokter

WHERE pr.status_periksa='Menunggu Perawat'

ORDER BY pr.no_antrean

";

$stmt=$pdo->query($sql);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));