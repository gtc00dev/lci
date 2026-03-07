document.addEventListener("DOMContentLoaded", async () => {
  const STORAGE_KEY = "eventosData";

  try {
    const response = await fetch("./data/eventos.json");
    const eventos = await response.json();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
    cargarCards(eventos);

  } catch (error) {
    console.error("Error cargando eventos:", error);
    const eventosGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (eventosGuardados) {
      cargarCards(eventosGuardados);
    }
  }

  function cargarCards(eventos) {
    const botones = document.querySelectorAll(".btn-detalles");

    botones.forEach((btn) => {
      const eventoId = btn.dataset.evento;
      const data = eventos[eventoId];
      if (!data) return;

      const cardContent = btn.closest(".card-content");
      if (!cardContent) return;

      const titulo = cardContent.querySelector(".subheader-2");
      const descripcion = cardContent.querySelector(".descripcion");
      const ubicacionBtn = cardContent.querySelector(".tag-ubicacion");

      if (titulo) titulo.textContent = data.titulo;
      if (descripcion) descripcion.textContent = data.descripcion;

      if (ubicacionBtn) ubicacionBtn.textContent = data.estado;
    });
  }
});