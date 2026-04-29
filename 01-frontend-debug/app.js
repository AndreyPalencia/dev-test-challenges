// app.js

let cachedUser = null;

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

    if (!cachedUser) {
      cachedUser = fetchUser(id);
    }

    const user = await cachedUser;

    document.getElementById('result').innerHTML =
      `<strong>${user.name}</strong><br>${user.email}<br>${user.website}`;

  } catch (error) {
    cachedUser = null;
    return showResult('Failed to load user', true);
  }
}

function showResult(message, isError = false) {
  const el = document.getElementById('result');
  el.className = isError ? 'error' : '';
  el.textContent = message;
}
