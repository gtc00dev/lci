document.addEventListener("DOMContentLoaded", () => {
  let map = null;
  let marker = null;
  let salaSeleccionada = null;

  const modal = document.getElementById("exampleModal");
  const chipSala = document.getElementById("chipSala");
  const chipText = chipSala.querySelector(".chip-text");
  const btnConfirmar = document.getElementById("btnConfirmarSala");
  const selectSala = document.getElementById("selectSala");
  const botonSala = document.querySelector(".modal-sala-cine");

  const salas = {
    "Michoacán Morelia": [19.7059, -101.1844],
    "CDMX Sala Roma": [19.4172, -99.1625],
    "CDMX Sala Coyoacán": [19.3467, -99.1617],
    "CDMX Sala Polanco": [19.4326, -99.2030],
    "Guanajuato San Miguel de Allende": [20.9144, -100.7437],
    "Guanajuato Guanajuato": [21.0190, -101.2574],
    "Nuevo León Monterrey": [25.6866, -100.3161],
    "Nuevo León SPGG": [25.6516, -100.3593],
    "Playa del Carmen Riviera Maya": [20.6296, -87.0739]
  };

  function actualizarEstadoMobile(tieneSeleccion) {
    const esMobile = window.matchMedia("(max-width: 360px)").matches;
    const texto = botonSala.querySelector(".modal-text");

    if (!texto) return;

    if (esMobile && tieneSeleccion) {
      texto.style.display = "none";
      chipSala.style.width = "100%";
      chipSala.style.justifyContent = "center";
    } else {
      texto.style.display = "";
      chipSala.style.width = "";
      chipSala.style.justifyContent = "";
    }
  }

  modal.addEventListener("shown.bs.modal", () => {
    if (map) {
      setTimeout(() => map.invalidateSize(), 150);
      return;
    }

    map = L.map("mapa-salas").setView([23.5, -102], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap"
    }).addTo(map);
  });

  selectSala.addEventListener("change", () => {
    const value = selectSala.value;
    const coords = salas[value];
    if (!coords || !map) return;

    salaSeleccionada = value;

    if (marker) {
      marker.remove();
    }

    marker = L.marker(coords).addTo(map);
    map.setView(coords, 14);

    chipText.textContent = salaSeleccionada;
    chipSala.classList.remove("hidden");

    actualizarEstadoMobile(true);
  });

  btnConfirmar.addEventListener("click", () => {
    if (!salaSeleccionada) {
      alert("Selecciona una sala primero");
      return;
    }
    bootstrap.Modal.getInstance(modal).hide();
  });

  window.addEventListener("resize", () => {
    const tieneSeleccion = salaSeleccionada !== null;
    actualizarEstadoMobile(tieneSeleccion);
  });
});