import { createCards } from './data.js';
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role');
  const textTitle = document.querySelectorAll('.role-name');
  textTitle.forEach(
    (elem) => (elem.textContent = role === 'Модель' ? 'Модели' : role + 'ы')
  );
  createCards({ role: role });
});
