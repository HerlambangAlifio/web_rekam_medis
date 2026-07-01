<?php
header("Content-Type: application/json");
require_once '../Config/db.php'; // Sesuaikan jalur db.php Anda

$method = $_SERVER['REQUEST_METHOD'];

// 1. GET & POST (Tetap gunakan logic yang sudah Anda miliki sebelumnya)
if ($method === 'GET') {
    try {
        // Kita hapus kondisi CURDATE() khusus untuk admin agar bisa memantau semua riwayat jika perlu
        $stmt = $pdo->query("SELECT a.id, a.no_antrean, p.nama_pasien, p.no_rm, a.penjamin, a.klinik, a.dpjp, a.status_antrean, a.tanggal_antrean 
                             FROM antrean a 
                             JOIN pasien p ON a.no_rm = p.no_rm
                             ORDER BY a.tanggal_antrean DESC, a.no_antrean ASC");
        $data = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $data]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}

if ($method === 'POST') {
    // ... code POST pendaftaran pasien Anda yang sudah ada ...
}

// 2. PUT: UPDATE STATUS ANTREAN (Baru untuk Admin)
// if ($method === 'PUT') {
//     $input = json_decode(file_get_contents('php://input'), true);
    
//     if (!empty($input['id']) && !empty($input['status'])) {
//         try {
//             $stmt = $pdo->prepare("UPDATE antrean SET status_antrean = ? WHERE id = ?");
//             $stmt->execute([$input['status'], $input['id']]);
            
//             echo json_encode(["status" => "success", "message" => "Status antrean berhasil diperbarui!"]);
//         } catch (Exception $e) {
//             echo json_encode(["status" => "error", "message" => $e->getMessage()]);
//         }
//     } else {
//         echo json_encode(["status" => "error", "message" => "Data tidak lengkap."]);
//     }
// }

// // 3. DELETE: HAPUS ANTREAN (Baru untuk Admin)
// if ($method === 'DELETE') {
//     $input = json_decode(file_get_contents('php://input'), true);
    
//     if (!empty($input['id'])) {
//         try {
//             $stmt = $pdo->prepare("DELETE FROM antrean WHERE id = ?");
//             $stmt->execute([$input['id']]);
            
//             echo json_encode(["status" => "success", "message" => "Antrean berhasil dihapus."]);
//         } catch (Exception $e) {
//             echo json_encode(["status" => "error", "message" => $e->getMessage()]);
//         }
//     } else {
//         echo json_encode(["status" => "error", "message" => "ID tidak ditemukan."]);
//     }
// }
?>