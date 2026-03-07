document.addEventListener("DOMContentLoaded", () => {

  const API_KEY = "e50e9560d182080b7591358e2c515c68";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  async function obtenerPelicula(titulo) {
    try {
      const searchResponse = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}&language=es-MX`
      );

      if (!searchResponse.ok) throw new Error("Error en búsqueda");

      const searchData = await searchResponse.json();

      if (!searchData.results || searchData.results.length === 0) {
        mostrarError("Película no encontrada");
        return;
      }

      const movieId = searchData.results[0].id;

      const detailResponse = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-MX`
      );

      if (!detailResponse.ok) throw new Error("Error en detalles");

      const data = await detailResponse.json();

      renderPelicula(data);

    } catch (error) {
      console.error("Error:", error);
      mostrarError("No se pudo cargar la información.");
    }
  }

  function renderPelicula(data) {
    const poster = data.poster_path
      ? `${IMAGE_BASE}${data.poster_path}`
      : "./images/poster-pelicula-y-tu-mama-tambien.jpg";


    const offcanvas = document.querySelector("#dinamica-offcanvas");
    if (offcanvas) {
      offcanvas.innerHTML = `
        <img src="${poster}" alt="${data.title}" class="img-fluid">
        <h2>${data.title}</h2>
        <p><strong>Año:</strong> ${data.release_date?.split("-")[0] || "N/A"}</p>
        <p><strong>Duración:</strong> ${data.runtime || "N/A"} min</p>
        <p>${data.overview || "Sin descripción disponible."}</p>
      `;
    }

    const modal = document.querySelector("#dinamica-modal");
    if (modal) {
      modal.innerHTML = `
        <img src="${poster}" alt="${data.title}" class="modal-movie-poster">
      `;
    }
  }

  function mostrarError(mensaje) {
    const offcanvas = document.querySelector("#dinamica-offcanvas");
    if (offcanvas) offcanvas.innerHTML = `<p style="color:#ff6b6b;">${mensaje}</p>`;

    const modal = document.querySelector("#dinamica-modal");
    if (modal) modal.innerHTML = `<p style="color:#ff6b6b;">${mensaje}</p>`;
  }

  obtenerPelicula("Y Tu Mamá También");

});