export function isLogged() {
  return !(localStorage.getItem('userData') == null);
}

