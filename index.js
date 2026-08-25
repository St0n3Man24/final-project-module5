// API: https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726
// API: https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726&s=(keyword)

let movies;

async function renderMovies(filter) {
  const moviesWrapper = document.querySelector('.movies');
  moviesWrapper.classList += ' movies__loading'

  if (!movies) {
    movies = await getMovies()
  }

  moviesWrapper.classList.remove('movies__loading')

  if (filter === "ALPHA_A_Z") {
    movies.sort((a, b) => (a.title - b.title));
  } else if (filter === "ALPHA_Z_A") {
    movies.sort((a, b) => (b.title - a.title));
  } else if (filter === "NEW_OLD") {
    movies.sort((a, b) => (b.year - a.year));
  } else if (filter === "OLD_NEW") {
    movies.sort((a, b) => (a.year - b.year));
  }

  const moviesHTML = movies.map((movie) => {
    return `<div class="movie">
      <figure class="movie__img--wrapper">
        <img class="movie__img" src="${movie.poster}" alt="">
      </figure>
      <div class="movie__description">
        <h3 class="movie__title">${movie.title}</h3>
        <h4 class="movie__year">${movie.year}</h4>
      </div>
    </div>`
  })
}

async function getMovies() {
  const moviesList = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726&s=(keyword)`);
  const movieData = moviesList.json();
}
getMovies()