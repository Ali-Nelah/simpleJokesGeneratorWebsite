const FAVORITES_KEY = 'favoriteJokes';

const favoritesList = document.querySelector('#favorites-list');
const emptyState = document.querySelector('#empty-state');
const clearButton = document.querySelector('#clear-favorites-btn');

const getFavorites = () => {
  const rawFavorites = localStorage.getItem(FAVORITES_KEY);
  if (!rawFavorites) {
    return [];
  }

  try {
    const parsedFavorites = JSON.parse(rawFavorites);
    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

const setFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const renderFavorites = () => {
  const favorites = getFavorites();
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  favorites.forEach((joke, index) => {
    const item = document.createElement('li');
    item.className = 'favorite-item';

    const text = document.createElement('p');
    text.className = 'favorite-joke';
    text.innerText = joke;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'button-danger';
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => {
      const updatedFavorites = getFavorites().filter((_, currentIndex) => currentIndex !== index);
      setFavorites(updatedFavorites);
      renderFavorites();
    });

    item.append(text, removeButton);
    favoritesList.append(item);
  });
};

clearButton.addEventListener('click', () => {
  setFavorites([]);
  renderFavorites();
});

renderFavorites();
