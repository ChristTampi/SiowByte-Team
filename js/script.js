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
document.addEventListener("click", function (e) {
  if (
    e.target.closest(".btn") &&
    e.target.closest(".btn").textContent.includes("Hubungi Sekarang")
  ) {
    e.preventDefault();
    window.location.href = "tel:+6243123456";
  }
});

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

document.addEventListener("click", function (e) {
  if (
    e.target.closest(".btn") &&
    e.target.closest(".btn").textContent.includes("Bagikan Restoran")
  ) {
    e.preventDefault();

    if (navigator.share) {
      navigator
        .share({
          title: "Rumah Makan Minahasa - Visit Suluttenggo",
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

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

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
