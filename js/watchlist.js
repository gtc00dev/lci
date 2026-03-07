document.addEventListener("DOMContentLoaded", function () {

  const storageKey = "watchlist";
  let watchlist = JSON.parse(localStorage.getItem(storageKey)) || [];

  watchlist = watchlist.filter(item => typeof item === "object" && item.titulo);

  const container = document.querySelector(".estrenos-drama");
  if (!container) return;

  container.innerHTML = "";

  if (watchlist.length === 0) {
    container.innerHTML = "<p>No hay películas guardadas.</p>";
    return;
  }

  watchlist.forEach(movie => {

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card-estreno-wrapper");

    if (movie.fecha) {
      cardWrapper.setAttribute("data-fecha", movie.fecha);
    }

    cardWrapper.innerHTML = `
      <div class="card-estreno" data-titulo="${movie.titulo}">
        
        <div class="imagen-estreno">
          <img class="img-fluid-estreno"
               src="${movie.poster}"
               alt="${movie.titulo}"
               loading="lazy">
        </div>

        <div class="card-content">
          <h5 class="subheader-2">${movie.titulo}</h5>
          <p class="card-duracion">${movie.duracion}</p>

          <div class="rating">
            ${movie.ratingHTML || ""}
          </div>

          <button class="tag-genero">${movie.genero}</button>

          <a href="${movie.enlace}" class="link-info">
            <span class="material-symbols-outlined">info</span>
            <span>Ver sinopsis</span>
          </a>
        </div>
      </div>
    `;

    container.appendChild(cardWrapper);
  });

});