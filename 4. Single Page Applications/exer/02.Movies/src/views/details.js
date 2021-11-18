import {showView, userInfo, isLogged} from "../dom.js";
import {getMovie, getLikes} from "../api/data.js";

const section = document.getElementById('movie-example');
section.remove();

let likes;
let movie;

export async function showDetails(id) {
  [movie, likes] = await Promise.all([
    getMovie(id), getLikes(id)
  ])

  // movie.querySelector('#likeBtn')

  section.replaceChildren(createMovieElement(movie));

  showView(section);
}

async function onDeleteMovie() {

}

function createMovieElement(movie) {
  const element = document.createElement('div');
  element.className = 'container';

  if (!isLogged()) {
    element.innerHTML = `
      <div class="row bg-light text-dark">
          <h1>Movie title: ${movie.title}</h1>
    
          <div class="col-md-8">
              <img class="img-thumbnail" src="${movie.img}"
                   alt="Movie">
          </div>
          <div class="col-md-4 text-center">
              <h3 class="my-3 ">Movie Description</h3>
              <p>${movie.description}</p>
              <span class="enrolled-span">Likes ${likes}</span>
          </div>
      </div>
    `
  } else if (movie._ownerId === userInfo().id()) {
    element.innerHTML = `
      <div class="row bg-light text-dark">
          <h1>Movie title: ${movie.title}</h1>
    
          <div class="col-md-8">
              <img class="img-thumbnail" src="${movie.img}"
                   alt="Movie">
          </div>
          <div class="col-md-4 text-center">
              <h3 class="my-3 ">Movie Description</h3>
              <p>${movie.description}</p>
              <a id="deleteBtn" class="btn btn-danger" href="http://localhost:3030/data/movies/${movie._id}">Delete</a>
              <a id="editBtn" class="btn btn-warning" href="javascript:void(0)">Edit</a>
              <span class="enrolled-span">Likes ${likes}</span>
          </div>
      </div>
    `
    element.querySelector('#deleteBtn').addEventListener('click', onDeleteMovie)
  } else {
    element.innerHTML = `
      <div class="row bg-light text-dark">
          <h1>Movie title: ${movie.title}</h1>
    
          <div class="col-md-8">
              <img class="img-thumbnail" src="${movie.img}"
                   alt="Movie">
          </div>
          <div class="col-md-4 text-center">
              <h3 class="my-3 ">Movie Description</h3>
              <p>${movie.description}</p>
              <a id="likeBtn" class="btn btn-primary" href="javascript:void(0)">Like</a>
              <span class="enrolled-span">Likes ${likes}</span>
          </div>
      </div>
    `
  }

  return element;
}