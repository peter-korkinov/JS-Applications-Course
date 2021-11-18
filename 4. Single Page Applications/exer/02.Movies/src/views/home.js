import {showView, isLogged} from "../dom.js";
import {showCreate} from "./create.js";
import {showDetails} from "./details.js";
import {getAllMovies} from "../api/data.js"

let movieCache = null;
let lastLoaded = null;
const maxAge = 60000;

const section = document.getElementById('home-page');
section.remove();

section.querySelector('#add-movie-page-button').addEventListener('click', (event) => {
  event.preventDefault();
  try {
    if (!isLogged()) {
      throw new Error('You must be logged in to add new content.');
    }
    showCreate();
  } catch (err) {
    alert(err.message);
  }
});

const moviesCatalog = section.querySelector('#movies-catalog');

moviesCatalog.addEventListener('click', (event) => {
  event.preventDefault();

  let target = event.target;

  if (target.tagName === 'BUTTON') {
    target = target.parentElement;
  }

  if (target.tagName === 'A') {
    const id = target.dataset.id;
    showDetails(id);
  }
})

async function loadMovies() {
  moviesCatalog.replaceChildren('Loading...');

  const now = Date.now();

  if (movieCache == null || (now - lastLoaded) > maxAge) {
    lastLoaded = now;

    movieCache = await getAllMovies();
  }

  moviesCatalog.replaceChildren(...movieCache.map(createMovieCard));
}

function createMovieCard(movie) {
  // const element =  e('div', {className: 'card mb-4'});
  const element =  document.createElement('div');
  element.className = 'card mb-4';
  element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
         alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id="${movie._id}" href="javascript:void(0)">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>
  `;

  return element;
}

export function catalogRefresher() {
  movieCache = null;
}

export function showHome() {
  showView(section);

  loadMovies();
}
