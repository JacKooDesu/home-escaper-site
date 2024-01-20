var wheelActivate = false;

var current = 0;
var last;
var interval = 800;

var touchLast = null;
var touchTimeLast;
var touchInterval = 500;

function initWheelHandle() {
  let x = document.getElementById("slide-container");
  x.addEventListener("wheel", (w) => changeCurrent(w.deltaY));
  bindTouch(x);
  last = Date.now();
}

function bindTouch(x) {
  let touchStartHandler = function (e) {
    if (touchLast != null) return;
    touchLast = e.changedTouches[0];
    touchTimeLast = Date.now();
  };

  let touchEndHandler = function (e) {
    if (Date.now() - touchTimeLast < touchInterval)
      changeCurrent(touchLast.clientY - e.changedTouches[0].clientY);
    touchLast = null;
  };
  if ("ontouchstart" in window) {
    x.addEventListener("touchstart", touchStartHandler);
    x.addEventListener("touchend", touchEndHandler);
  }
}

function changeCurrent(y) {
  if (!wheelActivate) return;
  if (Date.now() - last < interval) return;
  last = Date.now();

  let children = currentPage.children;

  let old = current;
  if (y > 0) current = Math.min(current + 1, children.length - 1);
  else current = Math.max(current - 1, 0);

  if (old == current) return;

  children[old].classList.remove("is-current");
  children[old].classList.add("is-next");

  children[current].classList.remove("is-next");
  children[current].classList.add("is-current");
}
