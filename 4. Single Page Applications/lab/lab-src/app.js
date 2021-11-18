import { showHomePage } from './home.js';
import { showCatalogPage } from './catalog.js';
import { showAboutPage } from './about.js';
import { showLoginPage } from "./login.js";

document.querySelector('nav').addEventListener('click', onNavigate);

const sections = {
  'homeBtn': showHomePage,
  'catalogBtn': showCatalogPage,
  'aboutBtn': showAboutPage,
  // 'registerBtn': showRegisterPage,
  'loginBtn': showLoginPage,
  // 'logoutBtn': showLogoutPage
}

showHomePage();

function onNavigate(event) {
  if (event.target.tagName === 'A') {
    const view = sections[event.target.id];
    if (typeof view == 'function') {
      event.preventDefault();
      view();
    }
  }

}