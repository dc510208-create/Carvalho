// URL base del backend (API en PHP).
// Cuando lo dockerices, cambiá esto por la URL del servicio backend.
const API_URL = 'http://localhost:8000';

const grid = document.getElementById('grid-ropa');
const form = document.getElementById('form-ropa');

// Cargar ropa desde la API
async function cargarRopa() {
    grid.innerHTML = '<p class="vacio">Cargando prendas...</p>';
    try {
        const res = await fetch(`${API_URL}/get_ropa.php`);
        const prendas = await res.json();

        if (prendas.length === 0) {
            grid.innerHTML = '<p class="vacio">No hay prendas registradas todavía.</p>';
            return;
        }

        grid.innerHTML = prendas.map(z => `
            <div class="tarjeta">
                <img src="${z.imagen_url || 'https://via.placeholder.com/250x180?text=Sin+imagen'}" alt="${z.nombre}">
                <h3>${z.nombre}</h3>
                <p class="marca">${z.marca || ''}</p>
                <p class="precio">$${Number(z.precio).toFixed(2)}</p>
                <p class="detalle">Talla: ${z.talla} · Stock: ${z.stock}</p>
                <button class="btn-eliminar" onclick="eliminarPrenda(${z.id})">Eliminar</button>
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = '<p class="vacio">Error al conectar con el backend.</p>';
        console.error(err);
    }
}

// Agregar prenda
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevaPrenda = {
        nombre: document.getElementById('nombre').value,
        marca: document.getElementById('marca').value,
        precio: document.getElementById('precio').value,
        talla: document.getElementById('talla').value,
        stock: document.getElementById('stock').value,
        imagen_url: document.getElementById('imagen_url').value,
    };

    await fetch(`${API_URL}/add_ropa.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaPrenda),
    });

    form.reset();
    cargarRopa();
});

// Eliminar prenda
async function eliminarPrenda(id) {
    if (!confirm('¿Eliminar esta prenda?')) return;

    await fetch(`${API_URL}/delete_ropa.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });

    cargarRopa();
}

// Cargar al iniciar
cargarRopa();