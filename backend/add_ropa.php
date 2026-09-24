<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Respuesta al preflight de CORS
}

$datos = json_decode(file_get_contents('php://input'), true);

$nombre = trim($datos['nombre'] ?? '');
$marca = trim($datos['marca'] ?? '');
$precio = $datos['precio'] ?? 0;
$talla = trim($datos['talla'] ?? '');
$stock = $datos['stock'] ?? 0;
$imagen_url = trim($datos['imagen_url'] ?? '');

if ($nombre === '' || $talla === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Nombre y talla son obligatorios']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO ropa_deportiva (nombre, marca, precio, talla, stock, imagen_url) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->execute([$nombre, $marca, $precio, $talla, $stock, $imagen_url]);

echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);