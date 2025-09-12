import { createCards, saveProfileToLocalStorage } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sortCards');
  let currentOrder = 'desc';
  createCards();

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentOrder = sortSelect.value === 'oldest' ? 'asc' : 'desc';
      createCards({}, 'date', currentOrder);
    });
  }
  const form = document.querySelector('.profile-form');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = {
      name: form.name.value.trim(),
      city: form.city.value.trim(),
      role: form.role.value,
      age: form.age.value,
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      description: form.description.value.trim(),
    };

    saveProfileToLocalStorage(formData);
    createCards({}, 'date', currentOrder);
    form.reset();
  });
});
