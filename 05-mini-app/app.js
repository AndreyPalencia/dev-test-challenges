import { getGithubUser } from './server/api.js';

const searchInput = document.getElementById('search-input');
const avatarImg = document.querySelector('.img-avatar-img');
const fullNameEl = document.querySelector('.fullname');
const usernameEl = document.querySelector('.username');
const bioEl = document.querySelector('.bio');
const infoId = document.querySelector('.info-id');
const infoType = document.querySelector('.info-type');
const infoViewType = document.querySelector('.info-view-type');
const infoUrl = document.getElementById('info-url');
const infoCreated = document.querySelector('.info-created');
const infoUpdated = document.querySelector('.info-updated');
const infoFollowers = document.querySelector('.info-followers');
const infoFollowing = document.querySelector('.info-following');
const boxInfoGithub = document.querySelector('.box-info-github');
const historyBox = document.querySelector('.history-box');
const listSearchHistory = document.querySelector('.list-search-history');
const defaultText = 'No disponible';
const STORAGE_KEY = 'github-search-history';

function getSearchHistory() {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
}

function saveSearchHistory(username) {
  let history = getSearchHistory();
  const trimmed = username.trim();
  
  if (!history.includes(trimmed)) {
    history.unshift(trimmed);
    if (history.length > 10) history.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

function renderSearchHistory() {
  const history = getSearchHistory();
  listSearchHistory.innerHTML = '';


  history.forEach((username) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = username;
    item.addEventListener('click', () => {
      searchInput.value = username;
      loadGithubUser(username);
      toggleVisibility();
    });
    listSearchHistory.appendChild(item);
  });
}

function toggleVisibility() {
  const isEmpty = searchInput.value.trim() === '';
  
  if (isEmpty) {
    boxInfoGithub.style.display = 'none';
    historyBox.style.display = 'block';
    renderSearchHistory();
  } else {
    boxInfoGithub.style.display = 'flex';
    historyBox.style.display = 'none';
  }
}


function formatDate(dateString) {
  if (!dateString) return 'No disponible';
  return new Date(dateString).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function setInfoUser(user) {
  if (!user || user.message === 'Not Found') {
    infoId.textContent = defaultText;
    infoType.textContent = defaultText;
    infoViewType.textContent = defaultText;
    infoUrl.textContent = defaultText;
    infoUrl.href = '#';
    infoCreated.textContent = defaultText;
    infoUpdated.textContent = defaultText;
    infoFollowers.textContent = '0';
    infoFollowing.textContent = '0';
    return;
  }

  infoId.textContent = user.id || defaultText;
  infoType.textContent = user.type || defaultText;
  infoViewType.textContent = user.site_admin
    ? 'Administrador'
    : 'Usuario público';
  infoUrl.textContent = user.html_url || defaultText;
  infoUrl.href = user.html_url || '#';
  infoCreated.textContent = formatDate(user.created_at);
  infoUpdated.textContent = formatDate(user.updated_at);
  infoFollowers.textContent = user.followers != null ? user.followers : '0';
  infoFollowing.textContent = user.following != null ? user.following : '0';
}

function setInfoAvatar(user) {
  if (!user) {
    avatarImg.style.backgroundImage = '-';
    fullNameEl.textContent = 'Usuario no encontrado';
    usernameEl.textContent = '-';
    bioEl.textContent = '-';
    return;
  }

  avatarImg.style.backgroundImage = `url(${user.avatar_url})`;
  fullNameEl.textContent = user.name || user.login;
  usernameEl.textContent = `@${user.login}`;
  bioEl.textContent = user.bio || 'Sin biografía pública';
}

async function loadGithubUser(username) {
  const trimmed = username?.trim();
  if (!trimmed) return;

  saveSearchHistory(trimmed);
  toggleVisibility();

  try {
    const user = await getGithubUser(trimmed);
    setInfoAvatar(user);
    setInfoUser(user);
  } catch (error) {
    console.error('Error cargando usuario:', error);
    fullNameEl.textContent = 'Error al cargar usuario';
    setInfoAvatar(null);
    setInfoUser(null);
  }
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    loadGithubUser(searchInput.value);
  }
});

searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() === '') {
    toggleVisibility();
  }
});

// Inicializar visibilidad al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  toggleVisibility();
});
