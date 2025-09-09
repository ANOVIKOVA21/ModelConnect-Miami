import { createCards } from './data.js';
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const city = params.get('city');
  const textTitle = document.querySelectorAll('.region-name');
  textTitle.forEach((elem) => (elem.textContent = city));
  createCards(city);
});
