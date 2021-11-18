import {html, render} from 'https://unpkg.com/lit-html?module';


const articleTemplate = (onSubmit, data) => html`
      <article class="${data.color}">
        <h3>${data.title}</h3>
        <div class="content-body">
            <p>
                ${data.content}
            </p>
        </div>
        <footer class="page-footer amber darken-2">Author: ${data.author}</footer>
        <div class="comments">
            <form @submit="${onSubmit}">
                <textarea name="comment"></textarea>
                <button id="submitBtn">Submit comment</button>
            </form>
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
    const result = data.map(a => articleTemplate(onSubmit.bind(null, a), a));

    render(result, content);
  }
}

function onSubmit(article, event) {
  event.preventDefault();
  console.log(article);
}
