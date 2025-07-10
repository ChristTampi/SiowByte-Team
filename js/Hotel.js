document.addEventListener("DOMContentLoaded", function () {
  // --- LOGIKA SIDEBAR & NAVBAR ---
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("page-content");
  const header = document.querySelector("header");

  if (menuToggle && sidebar && mainContent && header) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show");
      mainContent.classList.toggle("content-shifted");
      header.classList.toggle("content-shifted");
    });
  }

  // --- LOGIKA PENCARIAN HOTEL DENGAN ANIMASI DAN RE-FLOW ---
  const searchInput = document.getElementById("hotelSearchInput");
  const hotelGrid = document.getElementById("hotelGrid");

  if (searchInput && hotelGrid) {
    // Fungsi debounce untuk mencegah filter berjalan di setiap ketikan
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Fungsi utama untuk filter
    function filterHotels() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const hotelCards = document.querySelectorAll(".hotel-card-item");

      hotelCards.forEach((card) => {
        const title = card
          .querySelector(".hotel-card-title")
          .textContent.toLowerCase();
        const location = card
          .querySelector(".hotel-card-location")
          .textContent.toLowerCase();
        const isMatch =
          title.includes(searchTerm) || location.includes(searchTerm);

        if (isMatch) {
          // Tampilkan kartu
          card.classList.remove("is-hiding");
          card.style.display = ""; // Kembalikan ke display default (misal: 'block')
        } else {
          // Sembunyikan kartu dengan animasi
          card.classList.add("is-hiding");

          // Setelah animasi selesai (300ms), sembunyikan total agar grid rapi
          setTimeout(() => {
            card.style.display = "none";
          }, 300); // Durasi harus sama dengan transisi di CSS
        }
      });
    }

    // Terapkan debounce pada event input
    searchInput.addEventListener("input", debounce(filterHotels, 250));
  }
});
