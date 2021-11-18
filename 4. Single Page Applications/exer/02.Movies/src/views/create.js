import {showView, userInfo} from "../dom.js";
import {catalogRefresher, showHome} from "./home.js";
import {postNewMovieRecord} from "../api/data.js";

const section = document.getElementById('add-movie');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onCreate);

export function showCreate() {
  showView(section);
}

async function onCreate(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const img = formData.get('imageUrl').trim();
  const _ownerId = userInfo().id()

  await postNewMovieRecord({title, description, img, _ownerId});

  form.reset();
  catalogRefresher();     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  showHome();
}