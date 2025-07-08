// Import dari home.js
const menuBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navbar = document.getElementById("navbar");
const menuIcon = document.getElementById("menuIcon");

// Menu Toggle Functionality
if (menuBtn && sidebar && menuIcon) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    sidebar.classList.toggle("show");

    menuIcon.classList.add("icon-rotate");

    setTimeout(() => {
      if (menuBtn.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars-staggered");
        menuIcon.classList.add("fa-xmark");
      } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars-staggered");
      }
      menuIcon.classList.remove("icon-rotate");
    }, 200);
  });
}

// Navbar Scroll Effect
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Restaurant List Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Search and Filter Elements
  const searchInput = document.getElementById("searchInput");
  const restaurantGrid = document.getElementById("restaurantGrid");

  // Search Functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      filterRestaurants();
    });
  }

  // Filter Restaurants Function (hanya search, tanpa lokasi dan kategori)
  function filterRestaurants() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    const restaurantCards = document.querySelectorAll(".restaurant-card");
    let visibleCount = 0;

    restaurantCards.forEach((card) => {
      const cardContainer = card.closest(".col-xl-2");
      const restaurantName = card
        .querySelector(".restaurant-name")
        .textContent.toLowerCase();
      const restaurantDescription = card
        .querySelector(".restaurant-description")
        .textContent.toLowerCase();

      // Check if card matches search term
      const matchesSearch =
        restaurantName.includes(searchTerm) ||
        restaurantDescription.includes(searchTerm);

      // Show/hide card based on search
      if (matchesSearch) {
        cardContainer.style.display = "block";
        cardContainer.classList.add("fade-in");
        visibleCount++;
      } else {
        cardContainer.style.display = "none";
        cardContainer.classList.remove("fade-in");
      }
    });

    // Show/hide no results message
    showNoResultsMessage(visibleCount === 0);
  }

  // Show No Results Message
  function showNoResultsMessage(show) {
    let noResultsMsg = document.getElementById("noResultsMessage");

    if (show && !noResultsMsg) {
      noResultsMsg = document.createElement("div");
      noResultsMsg.id = "noResultsMessage";
      noResultsMsg.className = "col-12 text-center py-5";
      noResultsMsg.innerHTML = `
                <div class="py-5">
                    <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                    <h4 class="text-muted mb-2">Tidak Ada Restoran Ditemukan</h4>
                    <p class="text-muted">Coba sesuaikan kata kunci pencarian Anda</p>
                    <button class="btn btn-primary rounded-pill px-4" onclick="clearSearchFilter()">
                        Hapus Pencarian
                    </button>
                </div>
            `;

      if (restaurantGrid) {
        restaurantGrid.querySelector(".row").appendChild(noResultsMsg);
      }
    } else if (!show && noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  // Clear Search Filter Function
  window.clearSearchFilter = function () {
    if (searchInput) searchInput.value = "";
    filterRestaurants();
  };

  // Restaurant Detail Page Functionality

  // Gallery Image Click Handler
  const galleryImages = document.querySelectorAll(".gallery-image");
  galleryImages.forEach((image) => {
    image.addEventListener("click", function () {
      openImageModal(this.src, this.alt);
    });
  });

  // Open Image Modal Function
  function openImageModal(imageSrc, imageAlt) {
    const modal = document.createElement("div");
    modal.className = "modal fade show";
    modal.style.display = "block";
    modal.style.backgroundColor = "rgba(0,0,0,0.9)";
    modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content bg-transparent border-0">
                    <div class="modal-header border-0 pb-0">
                        <button type="button" class="btn-close btn-close-white" onclick="this.closest('.modal').remove()"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${imageSrc}" class="img-fluid rounded" alt="${imageAlt}">
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // Action Buttons Functionality
  const callBtn = document.querySelector('.btn:contains("Hubungi Sekarang")');
  const directionsBtn = document.querySelector(
    '.btn:contains("Petunjuk Arah")'
  );
  const shareBtn = document.querySelector('.btn:contains("Bagikan Restoran")');

  // Call Button
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".btn") &&
      e.target.closest(".btn").textContent.includes("Hubungi Sekarang")
    ) {
      e.preventDefault();
      window.location.href = "tel:+6243123456";
    }
  });

  // Directions Button
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".btn") &&
      e.target.closest(".btn").textContent.includes("Petunjuk Arah")
    ) {
      e.preventDefault();
      const address = "Jl. Sam Ratulangi No. 123, Manado";
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`;
      window.open(googleMapsUrl, "_blank");
    }
  });

  // Share Button
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".btn") &&
      e.target.closest(".btn").textContent.includes("Bagikan Restoran")
    ) {
      e.preventDefault();

      if (navigator.share) {
        navigator
          .share({
            title: "Warung Minahasa - Visit Suluttenggo",
            text: "Lihat restoran yang luar biasa ini!",
            url: window.location.href,
          })
          .catch(console.error);
      } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(window.location.href);
        showToast("Link berhasil disalin ke clipboard!");
      }
    }
  });

  // Copy to Clipboard Function
  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  // Show Toast Function
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className =
      "position-fixed top-0 end-0 m-3 alert alert-success alert-dismissible fade show";
    toast.style.zIndex = "9999";
    toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Smooth Scroll for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Lazy Loading for Images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Animation on Scroll
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  });

  document.querySelectorAll(".detail-section").forEach((section) => {
    animateOnScroll.observe(section);
  });

  // Restaurant Card Hover Effects
  document.querySelectorAll(".restaurant-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Mobile Menu Close on Link Click
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("show");
        menuBtn.classList.remove("active");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars-staggered");
      }
    });
  });

  // Close sidebar when clicking outside
  document.addEventListener("click", function (e) {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove("show");
      menuBtn.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars-staggered");
    }
  });

  // Keyboard Navigation
  document.addEventListener("keydown", function (e) {
    // Close sidebar with Escape key
    if (e.key === "Escape" && sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
      menuBtn.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars-staggered");
    }
  });

  // Accessibility: Focus Management
  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      const focusableContent = sidebar.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0];
      const lastFocusableElement =
        focusableContent[focusableContent.length - 1];

      if (sidebar.classList.contains("show")) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  });

  // Performance: Debounce Search
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

  // Apply debounce to search
  if (searchInput) {
    const debouncedSearch = debounce(filterRestaurants, 300);
    searchInput.addEventListener("input", debouncedSearch);
  }

  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== "undefined") {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Initialize page-specific functionality
  if (window.location.pathname.includes("detail-resto.html")) {
    initializeDetailPage();
  } else if (window.location.pathname.includes("list-resto.html")) {
    initializeListPage();
  }

  function initializeDetailPage() {
    // Detail page specific functionality
    console.log("Detail page initialized");

    // Add any detail-specific functionality here
    const reviewItems = document.querySelectorAll(".review-item");
    reviewItems.forEach((item) => {
      item.addEventListener("click", function () {
        this.classList.toggle("expanded");
      });
    });
  }

  function initializeListPage() {
    // List page specific functionality
    console.log("List page initialized");

    // Add any list-specific functionality here
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterButtons.forEach((b) => b.classList.remove("filter-active"));
        this.classList.add("filter-active");
      });
    });
  }
});
