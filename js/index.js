class Producto {
  static ultimoId = 4;
  constructor(nombre, precio, stock) {
    this.id = ++Producto.ultimoId;
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.stock = stock;
    this.cantidad = 1;
    this.subtotal = 0;
  }

  calcularSubtotal() {
    this.subtotal = this.precio * this.cantidad;
  }
}

let productos = [];

async function cargarProductosDesdeJSON() {
  const res = await fetch("data/productos.json");
  const datos = await res.json();
  productos = datos;
  guardarEnStorage();
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("productos")) {
    await cargarProductosDesdeJSON();
  } else {
    productos = JSON.parse(localStorage.getItem("productos"));
  }
  mostrarProductos();
});

function guardarEnStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarProductos(productosMostrar = productos) {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  productosMostrar.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.id}. ${producto.nombre} - $${
      producto.precio
    } - ${producto.stock ? "Disponible" : "Agotado"}`;
    lista.appendChild(li);
  });
}

function agregarProductoDesdeFormulario(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreProducto").value;
  const precio = document.getElementById("precioProducto").value;
  const stock = document.getElementById("stockProducto").checked;

  const nuevo = new Producto(nombre, precio, stock);
  nuevo.calcularSubtotal();
  productos.push(nuevo);
  guardarEnStorage();
  mostrarProductos();

  e.target.reset();
  Swal.fire(
    "Producto agregado",
    "El producto fue agregado con éxito",
    "success"
  );
}

function ordenarProductosPorPrecio() {
  productos.sort((a, b) => a.precio - b.precio);
  mostrarProductos();
}

function buscarProducto() {
  const valor = document.getElementById("buscarInput").value.toLowerCase();
  const encontrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(valor)
  );
  mostrarProductos(encontrados);
}

// Eventos

document
  .getElementById("productoForm")
  .addEventListener("submit", agregarProductoDesdeFormulario);

document.getElementById("mostrarBtn").addEventListener("click", () => {
  mostrarProductos();
});

document.getElementById("ordenarBtn").addEventListener("click", () => {
  ordenarProductosPorPrecio();
});

document.getElementById("buscarBtn").addEventListener("click", () => {
  buscarProducto();
});
