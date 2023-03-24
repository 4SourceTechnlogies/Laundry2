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
  var bNav = this.document.querySelector('.bottomNav');
  var brand = this.document.querySelector('.navbar-brand')
  headerTop.classList.toggle(".htAnimate", window.scrollY > 0);
  // nav.classList.toggle("stricky-fixed", window.scrollY > 1);
  bNav.classList.toggle('fix', this.window.scrollY > 1);
  brand.classList.toggle("smol", this.window.scrollY > 1);
});

/*
 * My adaptation of:
 *   Flux 3D Carousel
 *   Author: Dean Coulter
 *   Licensed under the MIT license
 *   Version 0.1
 *
 *   - Changed from figure element cards to any html.
 *   - Removed use of id, to allow multiple carousels.
 *   - Blocking of events on cards in the background.
 *   - Dimming of cards in the background.
 *   - Fixed continuous rotation.
 *   - Added functionality for multiple carousels.
 *   - Adding clickable arrow icon buttons on the sides.
 */
function cardCarousel3d(carousels) {
  var rotateHandler = function (evt) {
    var carousel = this.parentElement;
    if (carousel.classList.contains("card-carousel") === false) {
      var carousel = carousel.parentElement;
    }
    var rotate_int = parseInt(carousel.dataset.rotateInt || 0);
    if (this.classList.contains("counterclockwise")) {
      rotate_int += 1;
    } else if (this.classList.contains("clockwise")) {
      rotate_int -= 1;
    }
    carousel.dataset.rotateInt = rotate_int;
    animate_slider(carousel);
  };
  for (var i = 0; i < carousels.length; i++) {
    var carousel = carousels[i];
    var inner = carousel.querySelector(".inner-carousel");
    var cards = carousel.querySelectorAll(".inner-carousel > div");
    var size = cards.length;
    var panelSize = inner.clientWidth;
    var translateZ = Math.round(panelSize / 1.25 / Math.tan(Math.PI / size)) * 1.7;
    inner.style.transform = "rotateY(0deg) translateZ(-" + translateZ + "px)";
    var btnLeft = carousel.querySelector(".button-spin.counterclockwise");
    if (btnLeft !== null) {
      btnLeft.addEventListener("click", rotateHandler, false);
    }
    var btnRight = carousel.querySelector(".button-spin.clockwise");
    if (btnRight !== null) {
      btnRight.addEventListener("click", rotateHandler, false);
    }
    animate_slider(carousel);
  }

  function animate_slider(carousel) {
    var rotate_int = parseInt(carousel.dataset.rotateInt || 0);
    var inner = carousel.querySelector(".inner-carousel");
    var cards = carousel.querySelectorAll(".inner-carousel > div");
    var size = cards.length;
    var panelSize = inner.clientWidth;
    var translateZ = Math.round(panelSize / 2 / Math.tan(Math.PI / size)) * 1.7;
    var rotateY = 0;
    var ry = 360 / size;
    rotateY = ry * rotate_int;

    for (var i = 0; i < size; i++) {
      var z = rotate_int * ry + i * ry;
      var child = cards[i];
      child.style.transform =
        "rotateY(" +
        z +
        "deg) translateZ(" +
        translateZ +
        "px) rotateY(" +
        (-z).toString() +
        "deg)";
      child.classList.remove("clockwise");
      child.classList.remove("front");
      child.classList.remove("counterclockwise");
      child.classList.add('magnify');
      child.removeEventListener("click", rotateHandler, false);
      var zz = z % 360;
      if (zz === 0) {
        child.classList.add("front");
      } else if (zz === ry || zz === -360 + ry) {
        child.classList.add("clockwise");
        child.addEventListener("click", rotateHandler, false);
      } else if (zz === 360 - ry || zz === 0 - ry) {
        child.classList.add("counterclockwise");
        child.addEventListener("click", rotateHandler, false);
      }
    }
  }
}

cardCarousel3d(document.querySelectorAll(".card-carousel"));
