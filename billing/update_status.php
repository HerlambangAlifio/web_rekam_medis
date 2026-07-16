<?php
header("Content-Type: application/json");
require_once "../Config/db.php";

// Pastikan request menggunakan method POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data JSON dari body request
    $input = json_decode(file_get_contents('php://input'), true);
    $id_daftar = $input['id_daftar'] ?? null;

    if (!$id_daftar) {
        echo json_encode([
            "status" => "error",
            "message" => "ID Pendaftaran tidak ditemukan."
        ]);
        exit;
    }

    try {
        // Query untuk mengubah status periksa pasien menjadi 'Selesai'
        $sql = "UPDATE pendaftaran_rajal SET status_periksa = 'Selesai' WHERE id_daftar = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id_daftar]);

        echo json_encode([
            "status" => "success",
            "message" => "Status pembayaran pasien berhasil diperbarui!"
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Gagal memperbarui status: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Method tidak diizinkan."
    ]);
}
?>