<?php
header("Content-Type: application/json");
require_once '../Config/db.php'; // Sesuaikan jalur db.php Anda

$method = $_SERVER['REQUEST_METHOD'];

// 1. GET & POST (Tetap gunakan logic yang sudah Anda miliki sebelumnya)
if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT a.id, a.no_antrean, p.nama_pasien, p.no_rm, a.penjamin, a.klinik, a.dpjp, a.status_antrean, a.tanggal_antrean 
                             FROM antrean a 
                             JOIN pasien p ON a.no_rm = p.no_rm
                             ORDER BY a.tanggal_antrean DESC, a.no_antrean ASC");
        $data = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $data]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['queueNumber']) || empty($input['patientName']) || empty($input['no_rm']) || empty($input['insurance']) || empty($input['clinic']) || empty($input['dpjp'])) {
        echo json_encode(["status" => "error", "message" => "Data registrasi tidak lengkap. Pastikan semua field terisi."], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $queueNumber = trim($input['queueNumber']);
    $patientName = trim($input['patientName']);
    $noRm = trim($input['no_rm']);
    $insurance = trim($input['insurance']);
    $clinic = trim($input['clinic']);
    $dpjp = trim($input['dpjp']);
    $today = date('Y-m-d');

    try {
        // Pastikan pasien sudah ada di tabel pasien, jika belum buat baru
        $stmt = $pdo->prepare("SELECT no_rm FROM pasien WHERE no_rm = ?");
        $stmt->execute([$noRm]);

        if ($stmt->rowCount() === 0) {
            $insertPatient = $pdo->prepare("INSERT INTO pasien (no_rm, nama_pasien) VALUES (?, ?)");
            $insertPatient->execute([$noRm, $patientName]);
        }

        $insertQueue = $pdo->prepare("INSERT INTO antrean (no_antrean, no_rm, penjamin, klinik, dpjp, status_antrean, tanggal_antrean) VALUES (?, ?, ?, ?, ?, 'Menunggu di Klinik', ?)");
        $insertQueue->execute([$queueNumber, $noRm, $insurance, $clinic, $dpjp, $today]);

        echo json_encode(["status" => "success", "message" => "Pasien berhasil didaftarkan dan antrean tersimpan."], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
    }
    exit;
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