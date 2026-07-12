<?php

header("Content-Type: application/json");
require_once "../Config/db.php";

try{
    $sql = "SELECT pr.id_daftar, pr.no_antrean, pr.no_rm, pr.status_periksa, tv.*
    FROM pendaftaran_rajal pr
    LEFT JOIN tanda_vital tv ON pr.id_daftar=tv.id_daftar
    WHERE pr.id_daftar = ?
    ";

    $stmt = $pdo->prepare($sql);

    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

    $stmt->execute([$id]);

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'requested_id'=>$id,
        'rows'=>$rows
    ]);

}catch(Exception $e){
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}

