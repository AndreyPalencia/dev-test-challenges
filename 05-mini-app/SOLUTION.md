# 🚀 API Explorer Dashboard - Mini App

A modern web application to explore GitHub user information using its REST API.

## 📋 Description

**API Explorer Dashboard** is a mini-application that allows:

- 🔍 Search for GitHub users by username
- 📊 View detailed profile information (ID, type, URL, dates, followers, etc.)
- 💾 Save searches in localStorage
- 📜 Access search history
- 🎨 Modern and responsive visual interface

## 🎯 Features

### 1. **User Search**

- Search input with validation
- Press `Enter` to search
- Autocomplete from history

### 2. **User Information**

Displays the following GitHub data:

- **ID**: Unique user identifier
- **Type**: Account type (User, Organization, etc.)
- **Viewed as**: Administrator or public user
- **GitHub URL**: Direct link to profile
- **Created**: Account creation date
- **Updated**: Last account update date
- **Followers**: Number of followers
- **Following**: Number of users followed

### 3. **User Avatar**

- Automatic loading from GitHub
- Responsive circular design
- Full name, username, and biography

### 4. **Search History**

- Stored in `localStorage`
- Maximum 10 saved searches
- Clickable to fill the input
- Displayed when input is empty

## 🛠️ Project Structure

```
05-mini-app/
├── index.html          # HTML structure
├── style.css           # CSS styles
├── app.js              # Main logic (module)
├── server/
│   └── api.js          # GitHub API integration
└── README-MINI-APP.md  # This file
```

## 📱 Main Components

### **index.html**

- Semantic HTML5 structure
- Search section (#search-box)
- History section (.history-box)
- User information section (.box-info-github)
- User avatar and information
- Account details in 2-column grid

### **style.css**

- Responsive design with Flexbox and Grid
- Color palette: #183153 (primary), #F0F2F2 (background)
- Floating cards with shadows
- Smooth transitions
- Fonts: Work Sans and Roboto

### **app.js**

Main functions:

- `getSearchHistory()`: Gets history from localStorage
- `saveSearchHistory(username)`: Saves search to localStorage
- `renderSearchHistory()`: Renders the search list
- `toggleVisibility()`: Toggles between history and information
- `loadGithubUser(username)`: Loads GitHub data
- `setInfoAvatar(user)`: Updates avatar and basic information
- `setInfoUser(user)`: Updates account details

### **server/api.js**

```javascript
export async function getGithubUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) =>
    res.json(),
  );
}
```

## 🚀 How to Use

### 1. **Installation**

```bash
# No installation required, just open index.html in a browser
```

### 2. **User Search**

- Type the GitHub username
- Press `Enter`
- Data will load automatically

### 3. **View History**

- Clear the input (Ctrl+A + Delete)
- History will appear automatically
- Click any previous search to fill the input

### 4. **Navigate**

- When clicking on history, the input is filled and search executes
- View changes from history to user information
- Clearing input returns to history view

## 💾 Local Storage

### **localStorage: `github-search-history`**

```javascript
[
  'torvalds',
  'guido',
  'antirez',
  // ... maximum 10 searches
];
```

## 🎨 Color Palette

| Color           | Code      | Usage                  |
| --------------- | --------- | ---------------------- |
| Primary Blue    | `#183153` | Text, borders, buttons |
| Light Blue      | `#2d5a8c` | Hover, links           |
| Gray Background | `#F0F2F2` | Main background        |
| White           | `#ffffff` | Cards, backgrounds     |
| Light Gray      | `#f7f9fc` | Item backgrounds       |
| Text Gray       | `#5a6b8c` | Labels                 |

## 📊 Responsive Layout

### **Desktop (100% width)**

- Avatar: 25% width
- Information: 65% width (2-column grid)
- History: 75% width

### **Components**

- **Floating cards**: Soft box-shadow
- **Search input**: Height 3.2rem, padding 18px
- **History items**: Hover effect with translate
- **Info items**: 2-column grid in info-user section

## 🔧 JavaScript Events

| Event              | Action                |
| ------------------ | --------------------- |
| `keydown` (Enter)  | Search user           |
| `input`            | Detect if empty       |
| `click` (history)  | Fill input and search |
| `DOMContentLoaded` | Initialize visibility |

## ⚠️ Considerations

- **CORS**: GitHub API allows public requests without authentication
- **Rate Limit**: 60 requests/hour without authentication, 6000 with token
- **Validation**: Does not accept empty searches
- **Duplicates**: History does not save duplicate searches

## 🚫 Limitations

- No authentication required (limited by rate limit)
- Does not display all GitHub data (only requested data)
- History only on local machine (localStorage)
- No advanced search (username only)

## ✨ Future Improvements

- [ ] GitHub OAuth authentication
- [ ] Show user repositories
- [ ] Statistics graphs
- [ ] Export data to CSV/JSON
- [ ] Advanced search
- [ ] Cloud synchronization
- [ ] Dark mode
- [ ] Share profiles

## 🎓 Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Flexbox, Grid, animations
- **JavaScript (ES6+)**: Modules, async/await
- **GitHub API**: `/users/{username}` endpoint
- **localStorage API**: Data persistence

## 📝 Development Notes

### Main Flow

1. User enters name → presses Enter
2. `loadGithubUser()` validates and fetches data
3. Automatically saved to localStorage
4. View updates
5. History hides, information shows

### Error Handling

- User not found: Shows "Not available"
- Network error: Shows "Error loading user"
- Empty input: Does not perform search

## 📄 License

This project is for educational and demonstration purposes.

---

**Version**: 1.0.0  
**Last updated**: April 2026
