import { getDataById } from './data.js';
function createImg(imgName, alt, classNames) {
  const img = new Image();
  img.src = `./images/${imgName}`;
  img.alt = alt;
  img.loading = 'lazy';
  if (classNames && classNames.length > 0) img.classList.add(...classNames);
  return img;
}
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const data = await getDataById(id);
  const profileTitle = document.querySelector('.title');
  if (!data) {
    document.querySelector('.profile-container').innerHTML = '';
    profileTitle.textContent = 'Профиль не найден';
    return;
  }
  const { name, city, role, images, alt, age, phone, email, description } = data;
  const profileList = document.querySelector('.profile-list');
  const photoContainer = document.querySelector('.profile-photos');
  const profileDescription = document.querySelector('.profile-description');
  const profileEmail = document.querySelector('.profile-email');
  const profilePhone = document.querySelector('.profile-phone');
  profileTitle.textContent = `${name} — ${role}`;
  profileList.innerHTML = `
  <li>Имя: ${name}</li>
  <li>Возраст: ${age}</li>
  <li>Город: ${city}</li>
  <li>Рубрика: ${role}</li>
`;
  profileDescription.textContent = description;
  profileEmail.textContent = email;
  profileEmail.href = `mailto:${email}`;
  profilePhone.textContent = phone;
  profilePhone.href = `tel:${phone}`;
  images.forEach((img) =>
    photoContainer.appendChild(createImg(img, alt, ['profile-photo']))
  );
});
