// API: https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726
// API: https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726&s=(keyword)

let movies;
let searchKeyword = '';

async function renderMovies(filter) {
  const moviesWrapper = document.querySelector(".movies");
  moviesWrapper.innerHTML = `<i class="fas fa-spinner movies__loading--spinner"></i>`;
  moviesWrapper.classList.add("movies__loading");

  movies = await getMovies(searchKeyword);
  moviesWrapper.classList.remove("movies__loading");

  if (filter === "ALPHA_A_Z") {
    movies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (filter === "ALPHA_Z_A") {
    movies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (filter === "NEW_OLD") {
    movies.sort((a, b) => b.Year - a.Year);
  } else if (filter === "OLD_NEW") {
    movies.sort((a, b) => a.Year - b.Year);
  }

  const moviesHTML = movies.map((movie) => {
    // const poster = movie.Poster !== "N/A" ? movie.Poster : "./assets/movie_logo.jpg";
    return `<div class="movie">
      <figure class="movie__img--wrapper">
        <img class="movie__img" src="${movie.Poster}" alt=""
        onerror="this.onerror=null; this.src='./assets/movie_logo.jpg';">
      </figure>
      <div class="movie__description">
        <h3 class="movie__title">${movie.Title}</h3>
        <h4 class="movie__year">${movie.Year}</h4>
      </div>
    </div>`;
  })
  .join('');

  moviesWrapper.innerHTML = moviesHTML;
}

async function getMovies(keyword) {
  const moviesList = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726&s=${keyword}`,
  );
  const movieData = await moviesList.json();
  return movieData.Search || [];
}

function onSearchChange(event) {
  searchKeyword = event.target.value;
  renderMovies(document.querySelector('#filter').value);
}

function filterMovies(event) {
  renderMovies(event.target.value);
}

renderMovies();

//To target a string inside an object that will be used for sorting:
//1. target the variable we want to sort (movies) followed by the sort property (.sort(() => ))
//2. in the first parentheses add two parameters (a, b)
//3.  

