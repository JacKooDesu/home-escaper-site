var currentPage;
var backMainBtn;

function initPageHandle() {
  Array.prototype.filter.call(
    document.getElementsByClassName("main-selection"),
    (e) => (e.onclick = () => activatePage(e.innerText))
  );

  backMainBtn = document.getElementById("back-main");
  backMainBtn.classList.add("is-next");
  backMainBtn.onclick = () => activatePage("main");

  currentPage = document.getElementById("main");
}

function activatePage(tag) {
  wheelActivate = tag != "main";

  setActivate(backMainBtn, wheelActivate);

  let old = currentPage;
  currentPage = document.getElementById(tag);
  currentChild = 0;
  reloadContainer();

  setActivate(old, false);
  setActivate(currentPage, true);
}

function setActivate(target, b) {
  target.classList.remove(!b ? "is-current" : "is-next");
  target.classList.add(b ? "is-current" : "is-next");
}
