const handleDelete = async (id) => {
  await fetch(`/products/delete/${id}`);

  showToast("Product moved to trash successfully.");

  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
const showToast = (message) => {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.remove("translate-x-full", "opacity-0");
  toast.classList.add("translate-x-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-x-0", "opacity-100");
    toast.classList.add("translate-x-full", "opacity-0");
  }, 2000);
};

const handleDeleteCategory = async (id) => {
  await fetch(`/categories/delete/${id}`);

  showToast("Category moved to trash successfully.");

  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

