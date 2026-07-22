<?php
header("Content-Type: application/json");
require_once "../Config/db.php";

$id = $_GET["id_daftar"] ?? null;

if (!$id) {
    echo json_encode(["status" => "error", "message" => "ID Pendaftaran tidak valid."]);
    exit;
}

// Daftar pemetaan harga obat dummy
$masterHarga = [
    "Paracetamol 500mg"          => 5000,
    "Amoxicillin 500mg"          => 12000,
    "Asam Mefenamat 500mg"       => 8000,
    "Ibuprofen 400mg"            => 7000,
    "Cefadroxil 500mg"           => 15000,
    "Cetirizine 10mg"            => 6000,
    "Omeprazole 20mg"            => 10000,
    "Antasida Doen"              => 4000,
    "Vitamin C 500mg"            => 5000,
    "Dexa / Dexamethasone 0.5mg" => 5000
];

try {
    $sql = $pdo->prepare("
        SELECT ro.nama_obat, ro.signa, ro.jumlah
        FROM resep_obat ro
        WHERE ro.id_daftar = ?
    ");
    $sql->execute([$id]);
    $resepList = $sql->fetchAll(PDO::FETCH_ASSOC);

    $items = [];
    $grandTotal = 0;

    foreach ($resepList as $r) {
        $nama = $r["nama_obat"];
        $qty  = (int)$r["jumlah"];
        
        // Ambil harga dari dummy master, jika tidak ketemu default 10.000
        $hargaSatuan = $masterHarga[$nama] ?? 10000;
        $subtotal    = $qty * $hargaSatuan;

        $grandTotal += $subtotal;

        $items[] = [
            "nama_obat"    => $nama,
            "signa"        => $r["signa"],
            "jumlah"       => $qty,
            "harga_satuan" => $hargaSatuan,
            "subtotal"     => $subtotal
        ];
    }

    echo json_encode([
        "status"      => "success",
        "items"       => $items,
        "grand_total" => $grandTotal
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
?>