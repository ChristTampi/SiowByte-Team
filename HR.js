const menuBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  // Tombol hamburger tidak perlu class 'active' karena kita pakai icon FontAwesome
  sidebar.classList.toggle("show");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
