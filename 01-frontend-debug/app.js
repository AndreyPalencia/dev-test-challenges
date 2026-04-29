// app.js

let cachedUser = null;
let lastIdUser = null;

async function loadUser() {
  const userId = document.getElementById('userId').value;

  if (userId === '') {
    showResult('Please enter a valid ID');
    return;
  }

  const id = Number(userId);

  if (isNaN(id) || id <= 0) {
    showResult('ID must be positive', true);
    return;
  }

  try {

    if (!cachedUser || lastIdUser !== id) {
      cachedUser = fetchUser(id);
      lastIdUser = id;
    }

    const user = await cachedUser;

    const resultEl = document.getElementById('result');
    resultEl.className = '';
    resultEl.textContent = '';

    const nameEl = document.createElement('strong');
    nameEl.textContent = user.name;
    resultEl.appendChild(nameEl);
    resultEl.appendChild(document.createElement('br'));
    resultEl.appendChild(document.createTextNode(user.email));
    resultEl.appendChild(document.createElement('br'));
    resultEl.appendChild(document.createTextNode(user.website));

  } catch (error) {
    cachedUser = null;
    lastUserId = null;
    return showResult('Failed to load user', true);
  }
}

function showResult(message, isError = false) {
  const el = document.getElementById('result');
  el.className = isError ? 'error' : '';
  el.textContent = message;
}
