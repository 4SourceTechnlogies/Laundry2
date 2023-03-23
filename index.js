AOS.init();

const parallax = document.getElementById("parallax");

// Parallax Effect for DIV 1
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
  // DIV 1 background will move slower than other elements on scroll.
});

window.addEventListener("scroll", function () {
  var headerTop = document.querySelector(".topNav");
  var nav = this.document.querySelector(".stricky-header");
  var bNav = this.document.querySelector('.bottomNav')
  headerTop.classList.toggle(".htAnimate", window.scrollY > 0);
  // nav.classList.toggle("stricky-fixed", window.scrollY > 1);
  bNav.classList.toggle('fix', this.window.scrollY > 1)
});