const animeGenres = () => {
  const searchResults = document.querySelector('#showSearchGenre');
  const searchAnimeByGenre = async (genre) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?limit=18&genres_exclude=${genre}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showSearchResults = (data) => {
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

  const handleGenreSelection = async () => {
    const selectedGenre = document.querySelector('#genreSelect').value;
    if (selectedGenre) {
      const searchResults = await searchAnimeByGenre(selectedGenre);
      showSearchResults(searchResults.data);
    }
  };

  document.querySelector('#genreSelect').addEventListener('change', handleGenreSelection);
};

export default animeGenres;
