import {showView} from "../dom.js";
import {showHome} from "./home.js";
import {loggedOrGuestView} from "../app.js";
import {register} from "../api/data.js";

const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
section.remove();

async function onRegister(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email').trim();
  const password = formData.get('password').trim();
  const passwordRepeat = formData.get('repeatPassword').trim();

  if (password !== passwordRepeat) {
    form.reset();

    return alert('Passwords do not match!');
  }

  await register(email, password);

    form.reset();
    showHome();
    loggedOrGuestView();
}

export function showRegister() {
  showView(section);
}