import {isLogged} from "../dom";


let movieCache = null;
let lastLoaded = null;
const maxAge = 60000;

const section = document.getElementById('home-page');
section.remove();

section.querySelector('#add-movie-page-button').addEventListener('click', onAdd);

function onAdd(event) {
  event.preventDefault();
  try {
    if (!isLogged()) {
      throw new Error('You must be logged in to add new content.');
    }
    showCreate();
  } catch (err) {
    alert(err.message);
  }
}

