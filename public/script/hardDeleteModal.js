const openDeleteModal = (deleteUrl) => {
  const modal = document.getElementById("deleteModal");
  const deleteBtn = document.getElementById("confirmDeleteBtn");

  deleteBtn.href = deleteUrl;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

const closeDeleteModal = () => {
  const modal = document.getElementById("deleteModal");

  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

const openCategpryDeleteModal = (deleteUrl) => {
  const modal = document.getElementById("deleteModal");
  const deleteBtn = document.getElementById("confirmDeleteBtn");

  deleteBtn.href = deleteUrl;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};
