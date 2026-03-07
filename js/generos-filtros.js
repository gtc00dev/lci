document.addEventListener("DOMContentLoaded", () => {
  const generoCards = document.querySelectorAll(".card-genero");
  const secciones = document.querySelectorAll(
    ".estrenos-drama, .estrenos-accion, .estrenos-terror, .estrenos-ciencia-ficcion, .estrenos-romance, .estrenos-comedia"
  );

  let generoActivo = null;

  generoCards.forEach(card => {
    card.addEventListener("click", () => {
      const genero = card.dataset.genero;

      if (generoActivo === genero) {
        generoActivo = null;
        card.classList.remove("active");

        secciones.forEach(seccion => {
          seccion.classList.remove("estrenos-hidden");
        });

        return;
      }

      generoActivo = genero;

      generoCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      secciones.forEach(seccion => {
        if (seccion.classList.contains(`estrenos-${genero}`)) {
          seccion.classList.remove("estrenos-hidden");
        } else {
          seccion.classList.add("estrenos-hidden");
        }
      });
    });
  });
});
