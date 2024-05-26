const iconoCarrito = document.querySelector(".carrito-container");
const menuCarrito = document.querySelector(".menu-carrito");
const btnCerrarCarrito = document.querySelector(".cerrar-carrito");
const btnAgregar = document.querySelectorAll(".add_cart");
const sinProductos = document.querySelector(".no-products");
const carritoBody = document.querySelector(".carrito-body");
const contadorTotal = document.querySelector(".total");
const totalContainer = document.querySelector(".total-container");
const contadorProductos = document.querySelector("#contador-productos");
const mostrarCarrito = document.querySelector(".active-carrito");
const body = document.querySelector(".body");
const carrito = {};

iconoCarrito.addEventListener("click", () => {
  menuCarrito.classList.toggle("menu-carrito--active");
  mostrarCarrito.classList.toggle("desactive-carrito");
  body.classList.toggle("body--no-scroll");
});

btnCerrarCarrito.addEventListener("click", () => {
  menuCarrito.classList.toggle("menu-carrito--active");
  mostrarCarrito.classList.toggle("desactive-carrito");
  body.classList.toggle("body--no-scroll");
});
btnAgregar.forEach((elemento) => {
  elemento.addEventListener("click", async () => {
    const productoId = elemento.id;

    if (carrito[productoId]) return;

    const producto = await agregarProducto(productoId);

    if (producto) {
      sinProductos.classList.add("no-products--desactive");
      totalContainer.classList.add("total-container--active");

      crearDetallesProducto(producto);
      addCantidadEventListeners(producto);
      quitarProducto(productoId);
      carrito[productoId] = true;
      actualizarContadorCarrito();
    } else {
      sinProductos.classList.remove("no-products--desactive");
      totalContainer.classList.remove("total-container--active");
    }
  });
});

async function agregarProducto(id) {
  try {
    const response = await fetch("../JS/productos.json");
    const data = await response.json();
    const producto = data.find((element) => element.id === id);
    return producto;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

function quitarProducto(productoId) {
  const btnQuitar = document.querySelectorAll(".quitar-producto");
  btnQuitar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const contenedorProducto = boton.closest(".detalles-producto");
      contenedorProducto.remove();

      delete carrito[productoId];

      if (document.querySelectorAll(".detalles-producto").length === 0) {
        sinProductos.classList.remove("no-products--desactive");
        totalContainer.classList.remove("total-container--active");
      }

      actualizarContadorCarrito();
    });
  });
}

function crearDetallesProducto(producto) {
  const detallesProductoHTML = `
        <div class="detalles-producto detalles-producto--active" id=${
          producto.id
        }>
            <div class="producto-details">
                <div class="producto-img">
                    <img src="${producto.image}" alt="${producto.title}" />
                </div>
                <div class="producto-info">
                    <h2 class="producto-title">${producto.title}</h2>
                    <span class="envio">envío gratis</span>
                </div>
                <button class="quitar-producto">
                <svg
                  class="icon-inline svg-icon-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  width="20"
                  height="20"
                  fill="#767879"
                >
                  <path
                    d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="producto-sub">
                <div class="producto-quantity">
                    <button class="producto-quantity-button" id="decremento" data-product-id="ANF-02">-</button>
                    <span class="producto-quantity-value" data-product-id=${
                      producto.id
                    }>1</span>
                    <button class="producto-quantity-button" id="incremento">+</button>
                </div>
                <span class="producto-price">$${producto.price.toLocaleString(
                  "es-AR"
                )}</span>
            </div>
        </div>
    `;

  const contenedorTemporal = document.createElement("div");
  contenedorTemporal.innerHTML = detallesProductoHTML;

  carritoBody.appendChild(contenedorTemporal.firstElementChild);
}

function addCantidadEventListeners(producto) {
  const btnCantidad = document.querySelectorAll(".producto-quantity-button");

  btnCantidad.forEach((boton) => {
    boton.addEventListener("click", () => {
      const contenedorProducto = boton.closest(".detalles-producto");
      const cantidadElement = contenedorProducto.querySelector(
        ".producto-quantity-value"
      );
      const precioElement = contenedorProducto.querySelector(".producto-price");
      let cantidad = parseInt(cantidadElement.textContent);
      let precio = parseInt(
        precioElement.textContent
          .replace("$", "")
          .replace(".", "")
          .replace(".", "")
      );

      if (
        boton.id === "incremento" &&
        cantidad < 10 &&
        cantidadElement.dataset.productId === producto.id
      ) {
        cantidad += 1;
        precio += producto.price;
      } else if (
        boton.id === "decremento" &&
        cantidad > 1 &&
        cantidadElement.dataset.productId === producto.id
      ) {
        cantidad -= 1;
        precio -= producto.price;
      }

      cantidadElement.textContent = cantidad;
      precioElement.textContent = "$" + precio.toLocaleString("es-AR");

      actualizarContadorCarrito();
    });
  });
}

function actualizarContadorCarrito() {
  const cantidadProductos = document.querySelectorAll(
    ".producto-quantity-value"
  );
  const preciosProductos = document.querySelectorAll(".producto-price");

  let totalProductos = 0;
  let total = 0;

  cantidadProductos.forEach((producto) => {
    totalProductos += parseInt(producto.textContent);
  });
  preciosProductos.forEach((producto) => {
    let precios = parseInt(
      producto.textContent.replace("$", "").replace(".", "").replace(".", "")
    );
    total += precios;
  });

  contadorTotal.textContent = `$${total.toLocaleString("es-AR")}`;
  contadorProductos.textContent = totalProductos;
}
