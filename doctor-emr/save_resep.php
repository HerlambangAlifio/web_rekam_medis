<?php

header("Content-Type: application/json");
require_once "../Config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id_daftar"]) || !isset($data["resep"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Data tidak lengkap."
    ]);
    exit;
}

$id_daftar  = (int)$data["id_daftar"];
$subjective = $data["subjective"] ?? '';
$assessment = $data["assessment"] ?? '';
$plan       = $data["plan"] ?? '';
$resep      = $data["resep"];

try {


    $pdo->beginTransaction();

    // 1. Ambil id_dokter dari tabel pendaftaran_rajal
    $stmtDokter = $pdo->prepare("SELECT id_dokter FROM pendaftaran_rajal WHERE id_daftar = ?");
    $stmtDokter->execute([$id_daftar]);
    $rowDokter = $stmtDokter->fetch(PDO::FETCH_ASSOC);
    $id_dokter = $rowDokter['id_dokter'] ?? 1;

    // 2. Simpan atau Update catatan SOAP
    // Cek apakah data SOAP untuk id_daftar ini sudah ada
    $checkSoap = $pdo->prepare("SELECT id_soap FROM emr_soap WHERE id_daftar = ?");
    $checkSoap->execute([$id_daftar]);
    
    if ($checkSoap->rowCount() > 0) {
        $updateSoap = $pdo->prepare("
            UPDATE emr_soap 
            SET subjective = ?, assessment = ?, plan = ?, id_dokter = ?
            WHERE id_daftar = ?
        ");
        $updateSoap->execute([$subjective, $assessment, $plan, $id_dokter, $id_daftar]);
    } else {
        $insertSoap = $pdo->prepare("
            INSERT INTO emr_soap (id_daftar, subjective, objective, assessment, plan, id_dokter)
            VALUES (?, ?, '', ?, ?, ?)
        ");
        $insertSoap->execute([$id_daftar, $subjective, $assessment, $plan, $id_dokter]);
    }

    // 3. Hapus resep lama (jika ada) & Simpan resep baru
    $hapusResep = $pdo->prepare("DELETE FROM resep_obat WHERE id_daftar = ?");
    $hapusResep->execute([$id_daftar]);

    $sqlResep = $pdo->prepare("
        INSERT INTO resep_obat (id_daftar, nama_obat, signa, jumlah)
        VALUES (?, ?, ?, ?)
    ");

    foreach ($resep as $r) {
        if (!empty(trim($r["nama_obat"]))) {
            $sqlResep->execute([
                $id_daftar,
                $r["nama_obat"],
                $r["signa"],
                (int)$r["jumlah"]
            ]);
        }
    }

    // 4. Update status periksa ke 'Menunggu Billing'
    $updateStatus = $pdo->prepare("
        UPDATE pendaftaran_rajal
        SET status_periksa = 'Menunggu Billing'
        WHERE id_daftar = ?
    ");
    $updateStatus->execute([$id_daftar]);

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Pemeriksaan dan resep obat berhasil disimpan."
    ]);

} catch (Exception $e) {

    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);

}

