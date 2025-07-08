document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const body = document.querySelector("body");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("show");
    body.classList.toggle("sidebar-active");
  });
});
