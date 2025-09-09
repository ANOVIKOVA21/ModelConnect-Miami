import { formatDate } from './general.js';
export async function getData() {
  const data = await fetch('./data/people.json');
  return data.json();
}
export async function createCards(city = null, role = null) {
  const data = await getData();
  const cardsContainer = document.querySelector('.card-list');
  if (!cardsContainer) return;
  let filtered = data;
  if (city) {
    filtered = filtered.filter((item) => item.city === city);
  }
  if (role) {
    filtered = filtered.filter((item) => item.role === role);
  }

  const html = filtered
    .map(
      ({ name, city, role, image, alt, date }) => `
    <li class="card">
      <a href="./post.html" class="link card-link flex-column">
        <img src="${image}" alt="${alt}" loading="lazy" class="card-img" />
        <div class="card-content flex-column">
          <h2 class="card-title">${name}, ${city}, ${role}</h2>
          <time datetime="${date}" class="card-time">${formatDate(date)}</time>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  cardsContainer.innerHTML = html;
}
