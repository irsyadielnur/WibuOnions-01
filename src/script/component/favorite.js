const ITEMS_PER_PAGE = 6;
let currentPage = 2;
let animeData = [];

const getFavoriteAnime = (page) => {
  fetch(`https://api.jikan.moe/v4/top/anime?filter=favorite&page=${page}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.error) {
        console.log('Data Tidak Ditemukan!');
      } else {
        animeData = animeData.concat(json.data);
        showFavoriteAnime();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const showFavoriteAnime = () => {
  const showAnimeElement = document.querySelector('#showFavoriteAnime');
  const loadMoreButton = document.querySelector('#loadMoreFavorite');

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  for (let i = start; i < end; i++) {
    if (animeData[i]) {
      const anime = animeData[i];
      const animeElement = document.createElement('div');
      animeElement.className = 'col position-relative overflow-hidden anime-card';
      animeElement.innerHTML = `
        <div class="anime-poster">
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        </div>
        <div class="anime-info">
          <p>${anime.title}</p>
          <span>${anime.score}</span>
        </div>
      `;
      showAnimeElement.appendChild(animeElement);
    }
  }

  if (end >= animeData.length) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
};

getFavoriteAnime(currentPage);

document.getElementById('loadMoreFavorite').addEventListener('click', () => {
  currentPage++;
  showFavoriteAnime();
});
