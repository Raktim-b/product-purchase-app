const toggleFilter = () => {
  const menu = document.getElementById("filterMenu");
  menu.classList.toggle("hidden");
};

const setFilter = (name) => {
  document.getElementById("filterLabel").innerText = name;
};

const toggleSort = () => {
  const sortMenu = document.getElementById("sortMenu");
  sortMenu.classList.toggle("hidden");
};
