const menuBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navbar = document.getElementById("navbar");


const menuIcon = document.getElementById("menuIcon");

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


window.addEventListener("scroll", () => {
if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
} else {
    navbar.classList.remove("scrolled");
}
});
