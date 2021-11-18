import {showView} from "../dom.js";
import {showHome} from "./home.js";
import {loggedOrGuestView} from "../app.js";
import {login} from "../api/data.js";

const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
section.remove();

async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email').trim();
  const password = formData.get('password').trim();

  await login(email, password);

  form.reset();
  showHome();
  loggedOrGuestView();
}

export function showLogin() {
  showView(section);
}

// {
//   "email": "peter@abv.bg",
//   "username": "Peter",
//   "_id": "35c62d76-8152-4626-8712-eeb96381bea8",
//   "accessToken": "65a9f14a414a8f1562a3a1681258d7d93fe343a631794151d71d5ec7027fc8e7"
// }
// {
//   "email": "peter@abv.bg",
//   "username": "Peter",
//   "_id": "35c62d76-8152-4626-8712-eeb96381bea8",
//   "accessToken": "83b62824da93b824d9e2fe553cbd110f023e888a71f2ca791ee780e7db5835b7"
// }