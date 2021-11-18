const url = 'http://localhost:3030/jsonstore/collections/students';

const form = document.getElementById('form');
const table = document.querySelector('#results tbody');
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', postRecord);

async function postRecord(event) {
  event.preventDefault();

  const input = createRecord();

  if (!input) {
    return alert('Invalid input');
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  }

  try {
    const res = await fetch(url, options);

    if (res.status != 200) {
      throw new Error(res.statusText);
    }
  } catch (err) {
    alert(err);
  }

  form.reset();
  displayRecords()
}

function createRecord() {
  const data = new FormData(form);

  const firstName = data.get('firstName').trim()
  const lastName = data.get('lastName').trim()
  const facNum = data.get('facultyNumber').trim()
  const grade = data.get('grade').trim()

  if (inputValidator(firstName, lastName, facNum, grade)) {
    return {
      firstName: firstName,
      lastName: lastName,
      facultyNumber: facNum,
      grade: grade
    }
  }
}

async function displayRecords() {
  table.innerHTML = '';

  const res = await fetch(url);
  const data = await res.json();

  for (let i in data) {
    table.appendChild(createRowElement(data[i]));
  }
}

function createRowElement(element) {
  const row = document.createElement('tr');

  const firstName = document.createElement('td');
  const lastNAme = document.createElement('td');
  const facNum = document.createElement('td');
  const grade = document.createElement('td');

  firstName.textContent = element.firstName;
  lastNAme.textContent = element.lastName;
  facNum.textContent = element.facultyNumber;
  grade.textContent = element.grade;

  row.appendChild(firstName);
  row.appendChild(lastNAme);
  row.appendChild(facNum);
  row.appendChild(grade);

  return row;
}

function inputValidator(first, second, facNum, grade) {
  if (!(first && second && facNum && grade)) {
    return false;
  }
  if (facNum.length !== 11 || facNum.includes(' ') || isNaN(facNum)) {
    return false;
  }
  if (grade.includes(' ') || isNaN(grade)) {
    return false
  }
  return true;
}

displayRecords();