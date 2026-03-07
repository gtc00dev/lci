document.addEventListener("DOMContentLoaded", function () {

  const favoriteBtn = document.querySelector(".favorite");
  if (!favoriteBtn) return;

  const icon = favoriteBtn.querySelector("[data-icon]");
  const movieTitle = document.querySelector("[data-titulo]");
  if (!movieTitle) return;

  const storageKey = "watchlist";

  const toastEl = document.getElementById("toastWatchlist");
  let toastInstance = null;

  if (toastEl) {
    toastInstance = new bootstrap.Toast(toastEl, {
      delay: 3000
    });
  }

  function obtenerMovieActual() {
    return {
      titulo: movieTitle.dataset.titulo || "",
      duracion: movieTitle.dataset.duracion || "",
      genero: movieTitle.dataset.genero || "",
      fecha: movieTitle.dataset.fecha || "",
      poster: movieTitle.dataset.poster || "",
      ratingHTML:
        document.querySelector(".titulo-pelicula .rating")?.innerHTML || "",
      enlace: "sinopsis.html"
    };
  }

  let watchlist = JSON.parse(localStorage.getItem(storageKey)) || [];
  watchlist = watchlist.filter(item => typeof item === "object" && item.titulo);

  const currentMovie = obtenerMovieActual();

  const exists = watchlist.some(item => item.titulo === currentMovie.titulo);

  if (exists) {
    icon.textContent = "check_circle";
    favoriteBtn.classList.add("is-active");
  }

  favoriteBtn.addEventListener("click", function () {

    watchlist = JSON.parse(localStorage.getItem(storageKey)) || [];
    watchlist = watchlist.filter(item => typeof item === "object" && item.titulo);

    const movie = obtenerMovieActual();
    const index = watchlist.findIndex(item => item.titulo === movie.titulo);

    if (index > -1) {

      watchlist.splice(index, 1);
      icon.textContent = "favorite";
      favoriteBtn.classList.remove("is-active");

    } else {

      watchlist.push(movie);
      icon.textContent = "check_circle";

      favoriteBtn.classList.remove("is-active");
      void favoriteBtn.offsetWidth;
      favoriteBtn.classList.add("is-active");

      if (toastInstance) {
        toastInstance.show();
      }
    }

    localStorage.setItem(storageKey, JSON.stringify(watchlist));
  });

});