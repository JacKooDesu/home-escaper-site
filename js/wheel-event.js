var wheelActivate = false;

var currentChild = 0;
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

  let old = currentChild;
  if (y > 0) currentChild = Math.min(currentChild + 1, children.length - 1);
  else currentChild = Math.max(currentChild - 1, 0);

  if (old == currentChild) return;

  children[old].classList.remove("is-current");
  children[old].classList.add("is-next");

  children[currentChild].classList.remove("is-next");
  children[currentChild].classList.add("is-current");
}

function reloadContainer() {
  let children = currentPage.children;
  Array.prototype.filter.call(children, (e, index) =>
    setActivate(e, index == currentChild)
  );
}
