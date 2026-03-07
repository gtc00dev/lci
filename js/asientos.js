document.addEventListener("DOMContentLoaded", () => {
  const seatSelector = ".seat";
  const selectableSelector = ".seat.available, .seat.accessible";

  const selectedSeatsText = document.getElementById("selectedSeatsText");
  const continueText = document.getElementById("continueText");

  function initSeatMap() {
    centerAllSeatIcons();
    initSelectableSeats();
    updateUI();
  }

  function centerAllSeatIcons() {
    const seats = document.querySelectorAll(seatSelector);

    seats.forEach(seat => {
      const rect = seat.querySelector("rect");
      const icon = seat.querySelector(".seat-icon");

      if (!rect || !icon) return;

      const width = parseFloat(rect.getAttribute("width"));
      const height = parseFloat(rect.getAttribute("height"));

      icon.setAttribute("x", width / 2);
      icon.setAttribute("y", height / 2);
    });
  }

  function initSelectableSeats() {
    document.querySelectorAll(selectableSelector).forEach(seat => {
      seat.addEventListener("click", () => handleSeatClick(seat));
    });
  }

  function handleSeatClick(seat) {
    if (seat.classList.contains("occupied")) return;

    toggleSeatSelection(seat);
    logSeat(seat);
    updateUI(); 
  }

  function toggleSeatSelection(seat) {
    seat.classList.toggle("selected");
  }

  function updateUI() {
    if (!selectedSeatsText || !continueText) return;

    const seats = getSelectedSeats();
    const count = seats.length;

    selectedSeatsText.textContent = count
      ? `Subtitulada ${seats.join(", ")}`
      : "Ningún asiento seleccionado";

    continueText.textContent = count
      ? `Continuar – ${count} asiento${count > 1 ? "s" : ""}`
      : "Continuar";
  }

  function getSelectedSeats() {
    return Array.from(document.querySelectorAll(".seat.selected"))
      .map(seat => seat.dataset.seat)
      .sort();
  }

  function logSeat(seat) {
    console.log(
      `${seat.dataset.seat} → ${
        seat.classList.contains("selected")
          ? "SELECCIONADO"
          : "DESELECCIONADO"
      }`
    );
  }

  window.getSelectedSeats = getSelectedSeats;

  initSeatMap();
});