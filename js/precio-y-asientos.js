document.addEventListener("DOMContentLoaded", function () {

  const PRECIO_BOLETO = 60;
  const CARGO_SERVICIO = 36;

  const contenedor = document.querySelector(".product-cards");
  const cantidadEl = document.getElementById("cantidadAsientos");

  const subtotalEl = document.querySelector(".subtotal p:last-child");
  const servicioEl = document.querySelector(".cargo-servicio p:last-child");
  const totalEl = document.querySelector(".total h3:last-child");

  function actualizarResumen() {
    const boletos = document.querySelectorAll(".producto-card").length;

    const subtotal = boletos * PRECIO_BOLETO;
    const servicio = boletos > 0 ? CARGO_SERVICIO : 0;
    const total = subtotal + servicio;

    cantidadEl.textContent = boletos;
    subtotalEl.textContent = `$${subtotal} MXN`;
    servicioEl.textContent = `$${servicio} MXN`;
    totalEl.textContent = `$${total}`;
  }

  contenedor.addEventListener("click", function (e) {
    const deleteBtn = e.target.closest(".producto-delete");

    if (deleteBtn) {
      const card = deleteBtn.closest(".producto-card");
      if (card) {
        card.remove();
        actualizarResumen();
      }
    }
  });

  actualizarResumen();
});