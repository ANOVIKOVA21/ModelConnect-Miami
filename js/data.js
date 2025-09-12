import { formatDate } from './general.js';
export async function getData() {
  const data = await fetch('./data/people.json');
  const staticData = await data.json();
  const localData = JSON.parse(localStorage.getItem('people')) || [];
  return [...staticData, ...localData];
}
export async function getDataById(id) {
  const data = await getData();
  return data.filter((item) => item.id === id)[0];
}

export function saveProfileToLocalStorage(profile) {
  const saved = JSON.parse(localStorage.getItem('people')) || [];
  const id = Date.now();
  const date = new Date().toISOString();

  const newProfile = { id, date, images: ['default.avif'], ...profile };
  saved.push(newProfile);
  localStorage.setItem('people', JSON.stringify(saved));
  return newProfile;
}

export function filterData(data, filters = {}) {
  let filtered = data;
  for (const [key, value] of Object.entries(filters)) {
    if (value) filtered = filtered.filter((item) => item[key] === value);
  }
  return filtered;
}

export function sortData(data, sortField = 'date', order = 'desc') {
  return data.toSorted((a, b) => {
    if (!a[sortField] || !b[sortField]) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (sortField === 'date') {
      return order === 'asc'
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }
  });
}

export function renderCards(data) {
  const cardsContainer = document.querySelector('.card-list');
  if (!cardsContainer) return;
  if (!data) {
    cardsContainer.innerHTML = '<li class="empty-list-message">Нет результатов<li>';
    return;
  }
  const html = data
    .map(
      ({ id, name, city, role, images, alt, date }) => `
    <li class="card">
      <a href="./post.html?id=${id}" class="link card-link flex-column">
        <img src="./images/${images[0]}" alt="${alt}" loading="lazy" class="card-img" />
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

export async function createCards(filters = {}, sortField = 'date', order = 'desc') {
  const data = await getData();
  const filtered = filterData(data, filters);
  filtered.length > 0
    ? renderCards(sortData(filtered, sortField, order))
    : renderCards(null);
}
