let productos = [
  { id: 1, nombre: "Camiseta deportiva", precio: 60.0, stock: true },
  { id: 2, nombre: "Pantalón deportivo", precio: 80.0, stock: false },
  { id: 3, nombre: "Zapatillas running", precio: 120.0, stock: true },
  { id: 4, nombre: "Guantes de gimnasio", precio: 30.0, stock: true },
];
function mostrarProductosDisponibles() {
  console.log("Lista de productos deportivos disponibles:");
  productos.forEach((producto) => {
    if (producto.stock) {
      console.log(
        `${producto.id}. ${producto.nombre} - Precio: $${producto.precio}`
      );
    }
  });
}
function agregarProducto(nombre, precio, stock) {
  let nuevoProducto = { id: productos.length + 1, nombre, precio, stock };
  productos.push(nuevoProducto);
  console.log(`Producto agregado: ${nombre}`);
}
function comprarProducto(nombreProducto) {
  let productoEncontrado = productos.find(
    (producto) => producto.nombre.toLowerCase() === nombreProducto.toLowerCase()
  );
  if (productoEncontrado && productoEncontrado.stock) {
    alert(
      `Has comprado: ${productoEncontrado.nombre} por $${productoEncontrado.precio}`
    );
    productoEncontrado.stock = false;
    console.log(
      `Stock actualizado: ${productoEncontrado.nombre} ahora está agotado.`
    );
  } else {
    alert("El producto no está disponible o no existe.");
  }
}
function buscarProducto(nombreProducto) {
  let resultado = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
  );
  if (resultado.length > 0) {
    console.log("Resultados de búsqueda:");
    resultado.forEach((producto) => {
      console.log(
        `${producto.nombre} - Precio: $${producto.precio} - En stock: ${
          producto.stock ? "Sí" : "No"
        }`
      );
    });
  } else {
    console.log("No se encontraron productos con ese nombre.");
  }
}
function ordenarProductosPorPrecio() {
  productos.sort((a, b) => a.precio - b.precio);
  console.log("Productos ordenados por precio:", productos);
}
mostrarProductosDisponibles();
agregarProducto("Short deportivo", 45.0, true);
buscarProducto(prompt("Ingrese el nombre del producto a buscar:"));
ordenarProductosPorPrecio();
let productoAComprar = prompt(
  "Ingrese el nombre del producto que desea comprar:"
);
comprarProducto(productoAComprar);
mostrarProductosDisponibles();
