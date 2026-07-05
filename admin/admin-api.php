<?php
header('Content-Type: application/json');
require_once '../Config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

if ($method === 'GET') {
    try {
        $sql = "SELECT a.id, a.no_antrean, p.nama_pasien, p.no_rm, a.penjamin, a.klinik, a.dpjp, a.status_antrean, a.tanggal_antrean "
             . "FROM antrean a "
             . "JOIN pasien p ON a.no_rm = p.no_rm "
             . "ORDER BY a.id DESC";

        $stmt = $pdo->query($sql);
        $data = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $data]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

if ($method === 'PUT') {
    if (empty($input['id']) || empty($input['status'])) {
        echo json_encode(["status" => "error", "message" => "ID dan status diperlukan untuk pembaruan."]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE antrean SET status_antrean = ? WHERE id = ?");
        $stmt->execute([$input['status'], $input['id']]);

        echo json_encode(["status" => "success", "message" => "Status antrean berhasil diubah."]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

if ($method === 'DELETE') {
    if (empty($input['id'])) {
        echo json_encode(["status" => "error", "message" => "ID diperlukan untuk menghapus antrean."]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM antrean WHERE id = ?");
        $stmt->execute([$input['id']]);

        echo json_encode(["status" => "success", "message" => "Antrean berhasil dihapus."]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Metode HTTP tidak didukung."]);