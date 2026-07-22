<?php
header("Content-Type: application/json");

// Daftar Dummy Obat beserta Estimasi Harga
$dummyObat = [
    ["id" => 1, "nama_obat" => "Paracetamol 500mg", "harga" => 5000],
    ["id" => 2, "nama_obat" => "Amoxicillin 500mg", "harga" => 12000],
    ["id" => 3, "nama_obat" => "Asam Mefenamat 500mg", "harga" => 8000],
    ["id" => 4, "nama_obat" => "Ibuprofen 400mg", "harga" => 7000],
    ["id" => 5, "nama_obat" => "Cefadroxil 500mg", "harga" => 15000],
    ["id" => 6, "nama_obat" => "Cetirizine 10mg", "harga" => 6000],
    ["id" => 7, "nama_obat" => "Omeprazole 20mg", "harga" => 10000],
    ["id" => 8, "nama_obat" => "Antasida Doen", "harga" => 4000],
    ["id" => 9, "nama_obat" => "Vitamin C 500mg", "harga" => 5000],
    ["id" => 10, "nama_obat" => "Dexa / Dexamethasone 0.5mg", "harga" => 5000]
];

echo json_encode([
    "status" => "success",
    "data" => $dummyObat
]);
?>