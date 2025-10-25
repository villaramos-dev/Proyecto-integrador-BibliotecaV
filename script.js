const contenedorLibros = document.getElementById("contenedorLibros");
const buscador = document.getElementById("buscador");
const carrito = document.getElementById("carrito");
const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const carritoItems = document.getElementById("carritoItems");
const contadorCarrito = document.getElementById("contadorCarrito");
const totalCarrito = document.getElementById("totalCarrito");

let libros = [];
let carritoCompra = [];

// Cargar libros
fetch("Libros.json")
  .then(res => res.json())
  .then(data => {
    libros = data;
    mostrarLibros(libros);
  });

// Mostrar libros
function mostrarLibros(lista) {
  contenedorLibros.innerHTML = "";
  lista.forEach(libro => {
    const div = document.createElement("div");
    div.classList.add("libro");
    div.innerHTML = `
      <img src="${libro.cover}" alt="${libro.title}">
      <h3>${libro.title}</h3>
      <p><strong>${libro.author}</strong></p>
      <p>$${libro.price}</p>
      <button class="btn-comprar" data-id="${libro.id}">Agregar</button>
    `;
    contenedorLibros.appendChild(div);
  });

  document.querySelectorAll(".btn-comprar").forEach(btn =>
    btn.addEventListener("click", agregarAlCarrito)
  );
}

// Buscar libros
buscador.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = libros.filter(
    libro =>
      libro.title.toLowerCase().includes(texto) ||
      libro.author.toLowerCase().includes(texto)
  );
  mostrarLibros(filtrados);
});

// Carrito
abrirCarrito.addEventListener("click", () => carrito.classList.add("abierto"));
cerrarCarrito.addEventListener("click", () => carrito.classList.remove("abierto"));
vaciarCarrito.addEventListener("click", () => {
  carritoCompra = [];
  actualizarCarrito();
});

function agregarAlCarrito(e) {
  const id = e.target.dataset.id;
  const libro = libros.find(l => l.id == id);
  carritoCompra.push(libro);
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;
  carritoCompra.forEach(item => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <img src="${item.cover}" alt="">
      <span>${item.title}</span>
      <span>$${item.price}</span>
    `;
    carritoItems.appendChild(div);
  });
  contadorCarrito.textContent = carritoCompra.length;
  totalCarrito.textContent = total.toFixed(2);
}
