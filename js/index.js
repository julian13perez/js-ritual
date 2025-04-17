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
let productos = JSON.parse(localStorage.getItem("productos")) || [
  { id: 1, nombre: "Camiseta deportiva", precio: 60.0, stock: true },
  { id: 2, nombre: "Pantalón deportivo", precio: 80.0, stock: false },
  { id: 3, nombre: "Zapatillas running", precio: 120.0, stock: true },
  { id: 4, nombre: "Guantes de gimnasio", precio: 30.0, stock: true },
];
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
let cantidad = 5;
let mensaje = "¡Bienvenido a la tienda deportiva!";
let disponible = true;
console.log(cantidad, mensaje, disponible);
for (let i = 1; i <= cantidad; i++) {
  console.log(`Producto número ${i}`);
}
let continuar = true;
while (continuar) {
  let opcion = prompt("¿Deseas ver productos? (si/no)").toLowerCase();
  if (opcion === "si") {
    console.log("Mostrando productos:");
    mostrarProductos();
  } else if (opcion === "no") {
    continuar = false;
  } else {
    alert("Opción no válida.");
  }
}
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
let productosConIVA = productos.map((producto) => {
  return {
    ...producto,
    precioConIVA: (producto.precio * 1.21).toFixed(2),
  };
});
console.log("Productos con IVA:", productosConIVA);
