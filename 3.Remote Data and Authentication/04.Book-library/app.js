let url = 'http://localhost:3030/jsonstore/collections/books';
const storageUrl = 'http://localhost:3030/jsonstore/collections/books';

const loadButton = document.getElementById('loadBooks');
loadButton.addEventListener('click', loadBooks);

const tableContent = document.querySelector('tbody');
tableContent.innerHTML = '';

const form = document.querySelector('form');
const formTitle = document.querySelector('form h3')
const submitBtn = document.querySelector('form button');
submitBtn.value = 'post';
submitBtn.addEventListener('click', submitRequest);

async function loadBooks() {
  tableContent.innerHTML = '';

  const res = await fetch(url);
  const data  = await res.json();

  for (const i in data) {
    tableContent.appendChild(createRowElement(i, data[i]));
  }
}

async function submitRequest(event) {
  event.preventDefault();

  const input = createRecord();

  if (!input) {
    return alert('Invalid input');
  }

  const method = this.value;

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  }

  try {
    const res = await fetch(url, options);

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
  } catch (err) {
    alert(err);
  }

  summonSubmitForm();
}

async function editBook() {
  const id = this.value;
  const editUrl = url + '/' + id;

  const res = await fetch(editUrl);
  const data = await res.json();

  summonEditForm(data.title, data.author, editUrl);
}

async function deleteBook() {
  const id = this.value;
  const deleteUrl = url + '/' + id;

  const options = {
    method: 'delete'
  }

  await Promise.all([
    fetch(deleteUrl, options),
    loadBooks()
  ]);
}

function createRowElement(id, element) {
  const row = document.createElement('tr');

  const title = document.createElement('td');
  title.textContent = element.title;

  const author = document.createElement('td');
  author.textContent = element.author;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.value = id;
  editBtn.addEventListener('click', editBook);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.value = id;
  deleteBtn.addEventListener('click', deleteBook);

  const action = document.createElement('td');
  action.appendChild(editBtn);
  action.appendChild(deleteBtn);

  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(action);

  return row;
}

function createRecord() {
  const data = new FormData(form);

  const title = data.get('title').trim()
  const author = data.get('author').trim()


  if (inputValidator(title, author)) {
    return {
      title: title,
      author: author
    }
  }
}

function inputValidator(title, author) {
  return title && author;
}

function summonEditForm(title, author, editUrl) {
  formTitle.textContent = 'Edit FORM'
  document.querySelector('input[name="title"]').value = title;
  document.querySelector('input[name="author"]').value = author;
  submitBtn.value = 'put';
  submitBtn.textContent = 'Save';
  url = editUrl;
}

function summonSubmitForm() {
  form.reset();
  url = storageUrl;

  formTitle.textContent = 'FORM'
  submitBtn.value = 'post';
  submitBtn.textContent = 'Submit';
}