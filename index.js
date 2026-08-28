// API: https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726
// API: https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726&s=(keyword)

let movies;
let searchKeyword = "";

async function renderMovies(filter) {
  const moviesWrapper = document.querySelector(".movies");
  moviesWrapper.innerHTML = `<i class="fas fa-spinner movies__loading--spinner"></i>`;
  moviesWrapper.classList.add("movies__loading");

  await new Promise(resolve => setTimeout(resolve, 800));

  movies = await getMovies(searchKeyword);
  moviesWrapper.classList.remove("movies__loading");

  if (filter === "ALPHA_A_Z") {
    movies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (filter === "ALPHA_Z_A") {
    movies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (filter === "NEW_OLD") {
    movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (filter === "OLD_NEW") {
    movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  const moviesHTML = movies
    .map((movie) => {
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
    .join("");

  moviesWrapper.innerHTML = moviesHTML;
}

async function getMovies(keyword) {
  const moviesList = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=1c6a2726&s=${keyword}`);
  const movieData = await moviesList.json();
  return movieData.Search || [];
}

function onSearchChange(event) {
  searchKeyword = event.target.value;
  renderMovies(document.querySelector("#filter").value);
}

function filterMovies(event) {
  renderMovies(event.target.value);
}

renderMovies();

//To target a string inside an object that will be used for sorting:
//1. target the variable we want to sort (movies) followed by the sort property (.sort(() => ))
//2. in the first parentheses add two parameters (a, b)
//3. after the arrow function (=>) add the first parameter (a) followed by a dot followed by the object element you want to target (a.Title) - this order of parameters is following asending order, to follow descending order flip a and b after the arrow function
//4. in the second parentheses do the same as step 3 but for the second paramter (b)
//5. after the first parameter/target add a dot followed by localeCompare which is followed by the second parentheses (a.Title.localeCompare(b.Title)) which will sort/compare the first string/parameter with the second just like (a.Year - b.Year) does for numbers
