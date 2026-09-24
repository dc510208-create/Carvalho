CREATE DATABASE IF NOT EXISTS tienda_deportiva CHARACTER SET utf8mb4;
USE tienda_deportiva;

CREATE TABLE IF NOT EXISTS ropa_deportiva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    marca VARCHAR(80),
    precio DECIMAL(10,2) NOT NULL,
    talla VARCHAR(10) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(255),
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ropa_deportiva (nombre, marca, precio, talla, stock, imagen_url) VALUES
('Camiseta Running', 'Nike', 29.99, 'M', 20, 'https://via.placeholder.com/250x180?text=Camiseta+Running'),
('Short Deportivo', 'Adidas', 24.50, 'L', 15, 'https://via.placeholder.com/250x180?text=Short+Deportivo'),
('Conjunto Training', 'Puma', 55.00, 'S', 8, 'https://via.placeholder.com/250x180?text=Conjunto+Training');
