import { showSection } from './dom.js';

const section = document.getElementById('aboutSection');
section.remove();

export function showAboutPage() {
  showSection(section);
}