var currentPage;

function initPageHandle() {
  Array.prototype.filter.call(
    document.getElementsByClassName("main-selection"),
    (e) => (e.onclick = () => activatePage(e.innerText))
  );

  currentPage = document.getElementById("main");
}

function activatePage(tag) {
  wheelActivate = tag != "main";
  let old = currentPage;
  currentPage = document.getElementById(tag);
  current = 0;

  old.classList.remove("is-current");
  old.classList.add("is-next");

  currentPage.classList.remove("is-next");
  currentPage.classList.add("is-current");
}
