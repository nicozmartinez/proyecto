const openFilter = document.querySelector("#open-filter");
const closeFilter = document.querySelector("#close-filter");
const aside = document.querySelector("aside");

openFilter.addEventListener("click", () => {
  aside.classList.add("open-aside");
});

closeFilter.addEventListener("click", () => {
  aside.classList.remove("open-aside");
});

btnCategory.forEach((btn) =>
  btn.addEventListener("click", () => {
    aside.classList.remove("open-aside");
  })
);
