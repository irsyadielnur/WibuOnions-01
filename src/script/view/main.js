import '../component/favorite';
import '../component/popular';
import '../component/search-anime';
import animeGenres from '../component/search-genre';
import '../component/footer';

const main = () => {
  const searchInput = document.querySelector('search-anime');
  const searchResults = document.querySelector('#showSearchAnime');

  const animeSource = async (query) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=20`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showSeachAnime = (data) => {
    searchResults.innerHTML = '';
    data.forEach((anime) => {
      searchResults.innerHTML += `
        <div class="col position-relative overflow-hidden anime-card">
              <div class="anime-poster">
                  <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
              </div>
                <div class="anime-info">
                  <p>${anime.title}</p>
                  <span>${anime.score}</span>
                </div>
         </div>`;
    });
  };

  const onInput = async () => {
    const query = searchInput.value;
    if (query.length > 2) {
      const dapat = await animeSource(query);
      showSeachAnime(dapat.data);
    } else {
      searchResults.innerHTML = '';
    }
  };

  searchInput.addEventListener('input', onInput);
};

document.addEventListener('DOMContentLoaded', animeGenres);

export default main;
