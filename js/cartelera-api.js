document.addEventListener("DOMContentLoaded", () => {

  const API_KEY = "e50e9560d182080b7591358e2c515c68";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const LIMITE_TITULO = 27;

  const cards = document.querySelectorAll(".card-estreno");

  cards.forEach(card => {
    const titulo = card.dataset.titulo;
    if (titulo) {
      cargarPelicula(titulo, card);
    }
  });

  async function cargarPelicula(titulo, card) {
    try {

      const searchResponse = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}&language=es-MX`
      );

      const searchData = await searchResponse.json();
      if (!searchData.results.length) return;

      const movieId = searchData.results[0].id;

      const detailResponse = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-MX`
      );

      const data = await detailResponse.json();

      actualizarCard(card, data);

    } catch (error) {
      console.error("Error cargando:", titulo, error);
    }
  }

  function limitarTitulo(texto, limite) {
    if (!texto) return "";

    if (texto.length <= limite) return texto;

    let textoCortado = texto.substring(0, limite);
    textoCortado = textoCortado.substring(0, textoCortado.lastIndexOf(" "));

    return textoCortado + "...";
  }

  function actualizarCard(card, data) {

    const img = card.querySelector("img");
    if (img && data.poster_path) {
      img.src = IMAGE_BASE + data.poster_path;
      img.alt = data.title;
    }

    const duracion = card.querySelector(".card-duracion");
    if (duracion && data.runtime) {
      const horas = Math.floor(data.runtime / 60);
      const minutos = data.runtime % 60;
      duracion.textContent = `${horas}h ${minutos}m`;
    }

    const titulo = card.querySelector("h5");
    if (titulo) {
      titulo.textContent = limitarTitulo(data.title, LIMITE_TITULO);
    }

  }

});