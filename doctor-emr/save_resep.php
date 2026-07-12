<?php

header("Content-Type: application/json");
require_once "../Config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

// Validasi data
if (
    !isset($data["id_daftar"]) ||
    !isset($data["resep"])
) {
    echo json_encode([
        "status" => "error",
        "message" => "Data tidak lengkap."
    ]);
    exit;
}

$id_daftar = $data["id_daftar"];
$resep = $data["resep"];

try {

    // Mulai transaksi
    $pdo->beginTransaction();

    // Hapus resep lama
    $hapus = $pdo->prepare("
        DELETE FROM resep_obat
        WHERE id_daftar = ?
    ");

    $hapus->execute([$id_daftar]);

    // Simpan resep baru
    $sql = $pdo->prepare("
        INSERT INTO resep_obat
        (
            id_daftar,
            nama_obat,
            signa,
            jumlah
        )
        VALUES (?,?,?,?)
    ");

    foreach ($resep as $r) {

        $sql->execute([
            $id_daftar,
            $r["nama_obat"],
            $r["signa"],
            $r["jumlah"]
        ]);

    }

    // Update status pasien menjadi Menunggu Billing
    $update = $pdo->prepare("
        UPDATE pendaftaran_rajal
        SET status_periksa = 'Menunggu Billing'
        WHERE id_daftar = ?
    ");

    $update->execute([$id_daftar]);

    // Pastikan ada baris yang terupdate
    if ($update->rowCount() == 0) {
        throw new Exception("Status pasien gagal diubah.");
    }

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Resep berhasil disimpan dan pasien dikirim ke Billing."
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

?>