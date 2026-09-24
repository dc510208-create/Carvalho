<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$stmt = $pdo->query("SELECT * FROM ropa_deportiva ORDER BY fecha_creacion DESC");
$ropa_deportiva = $stmt->fetchAll();

echo json_encode($ropa_deportiva);