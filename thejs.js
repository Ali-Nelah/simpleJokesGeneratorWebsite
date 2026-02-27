const FAVORITES_KEY = 'favoriteJokes';
let currentJoke = '';

const getJokes = async () => {
  try {
    const config = { headers: { Accept: 'application/json' } };
    const res = await axios.get('https://icanhazdadjoke.com/', config);
    return res.data.joke;
  } catch (e) {
    console.log(e);
    return 'Could not fetch a joke right now. Try again.';
  }
};

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

const getJokeButton = document.querySelector('#get-joke-btn');
const saveFavoriteButton = document.querySelector('#save-favorite-btn');
const jokeHeading = document.querySelector('.joke-text');
const feedback = document.querySelector('.feedback');

getJokeButton.addEventListener('click', async () => {
  getJokeButton.disabled = true;
  getJokeButton.innerText = 'Loading...';
  currentJoke = await getJokes();
  jokeHeading.innerText = currentJoke;
  feedback.innerText = '';
  getJokeButton.disabled = false;
  getJokeButton.innerText = 'Get a joke';
});

saveFavoriteButton.addEventListener('click', () => {
  if (!currentJoke || currentJoke === 'Could not fetch a joke right now. Try again.') {
    feedback.innerText = 'Load a joke first, then save it.';
    return;
  }

  const favorites = getFavorites();
  if (favorites.includes(currentJoke)) {
    feedback.innerText = 'This joke is already in your favorites.';
    return;
  }

  favorites.push(currentJoke);
  setFavorites(favorites);
  feedback.innerText = 'Saved to favorites.';
});
