const menuBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navbar = document.getElementById("navbar");

// Toggle sidebar
menuBtn.addEventListener("click", () => {
menuBtn.classList.toggle("active");
sidebar.classList.toggle("show");
});

// Add shadow on scroll
window.addEventListener("scroll", () => {
if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
} else {
    navbar.classList.remove("scrolled");
}
});
