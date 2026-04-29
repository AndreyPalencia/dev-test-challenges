// app.js

let cachedUser = null;

async function loadUser() {
  const userId = document.getElementById('userId').value;

  if (userId === '') {
    showResult('Please enter a valid ID');
    return;
  }

  if (userId > 0 === false) {
    showResult('ID must be positive', true);
    return;
  }

  if (!cachedUser) {
    cachedUser = fetchUser(userId);
  }

  const user = await cachedUser;

  document.getElementById('result').innerHTML =
    `<strong>${user.name}</strong><br>${user.email}<br>${user.website}`;
}

function showResult(message, isError = false) {
  const el = document.getElementById('result');
  el.className = isError ? 'error' : '';
  el.textContent = message;
}
