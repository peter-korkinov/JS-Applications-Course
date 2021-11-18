import {html, render} from 'https://unpkg.com/lit-html?module';


const articleTemplate = (data) => html`
      <article class="${data.color}">
        <h3>${data.title}</h3>
        <div class="content-body">
            <p>
                ${data.content}
            </p>
        </div>
        <footer class="page-footer amber darken-2">Author: ${data.author}</footer>
        <div class="comments">
            <p>Some comment</p>
        </div>
      </article>
`;

start();

async function start() {
  const data = await (await fetch('./data.json')).json();

  const content = document.getElementById('content');
  const renderBtn = document.getElementById('renderBtn')
  renderBtn.addEventListener('click', onRender);

  function onRender() {
    const result = data.map(articleTemplate);

    render(result, content);
  }
}
