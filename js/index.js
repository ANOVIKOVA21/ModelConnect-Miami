import { createCards } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sortCards');
  createCards();

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const order = sortSelect.value === 'oldest' ? 'asc' : 'desc';
      createCards({}, 'date', order);
    });
  }
});
