// create placeholder modules for every view
// configure and test nav
// implement modules
// - create async funcs
// - implement DOM logic

// order of views:
// - catalog (home)
// - login/register
// - create
// - details
// - edit
// - delete

import {showHome} from "./views/home.js";
import {showDetails} from "./views/details.js";
import {showEdit} from "./views/edit.js";
import {showLogin} from "./views/login.js";
import {showRegister} from "./views/register.js";
import {userInfo, isLogged} from "./dom.js";
import {logout} from "./api/data.js";

document.querySelector('nav').addEventListener('click', onNavigate);

const navLogout = document.getElementById('nav-logout')
const navWelcomeMsg = document.getElementById('welcome-msg')
const navLogin = document.getElementById('nav-login')
const navRegister = document.getElementById('nav-register')

const views = {
  'nav-home': showHome,
  'nav-logout': onLogout,
  'nav-login': showLogin,
  'nav-register': showRegister,
}

showHome();
loggedOrGuestView();

function onNavigate(event) {
    const view = views[event.target.id];
    if (typeof view === 'function') {
      event.preventDefault();
      view();
    }
}

export function loggedOrGuestView() {
  if (isLogged()) {
    navWelcomeMsg.textContent = `Welcome, ${userInfo().email()}`;

    navWelcomeMsg.style.display = '';
    navLogout.style.display = '';
    navLogin.style.display = 'none';
    navRegister.style.display = 'none';

    document.getElementById('add-movie-page-button').style.display = '';
  } else {
    navWelcomeMsg.style.display = 'none';
    navLogout.style.display = 'none';
    navLogin.style.display = '';
    navRegister.style.display = '';

    document.getElementById('add-movie-page-button').style.display = 'none';
  }
}

async function onLogout() {
    await logout();
    loggedOrGuestView();
    showLogin();
}