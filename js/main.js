//carrito
$(document).ready(function() {
  const listaCarrito = $("#listaCarrito");
  const totalCarrito = $("#totalCarrito");
  const vaciarCarritoBtn = $("#vaciarCarrito");
  const guardarCarritoBtn = $("#guardarCarrito");
  const agregarCarritoBtns = $(".btnAgregar");

  let carrito = [];

  function mostrarCarrito() {
      listaCarrito.empty();

      carrito.forEach((producto) => {
          const { nombre, precio, cantidad } = producto;

          const li = $("<li></li>").text(`${nombre} - Precio: $${precio} - Cantidad: ${cantidad}`);
          listaCarrito.append(li);
      });

      const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
      totalCarrito.text(`Total: $${total}`);
  }
  function agregarProducto() {
      const boton = $(this);
      const producto = boton.closest(".producto");
      const id = producto.data("id");
      const nombre = producto.find("h3").text();
      const precioTexto = producto.find("p.precioCerve").text();
      const precio = parseFloat(precioTexto.split(":")[1].trim().replace("$", ""));
      const cantidad = 1;

      const productoExistente = carrito.find((producto) => producto.id === id);

      if (productoExistente) {
          productoExistente.cantidad += cantidad;
      } else {
          const nuevoProducto = { id, nombre, precio, cantidad };
          carrito.push(nuevoProducto);
      }

      mostrarCarrito();

      $("#carrito").animate({ right: "0px" }, 1000);
  }

  function vaciarCarrito() {
      carrito = [];
      mostrarCarrito();
      $("#carrito").css("right", "-400px");
  }

  function guardarCarrito() {
      const carritoJSON = JSON.stringify(carrito);
      localStorage.setItem("carrito", carritoJSON);
      alert("Carrito guardado exitosamente");
      vaciarCarrito();
  }

  agregarCarritoBtns.on("click", agregarProducto);
  vaciarCarritoBtn.on("click", vaciarCarrito);
  guardarCarritoBtn.on("click", guardarCarrito);

  const carritoGuardadoJSON = localStorage.getItem("carrito");
  if (carritoGuardadoJSON) {
      carrito = JSON.parse(carritoGuardadoJSON);
      mostrarCarrito();
  }

  $(window).on("beforeunload", function () {
      localStorage.removeItem("carrito");
  });

  $("#carrito").css("right", "-400px");
});