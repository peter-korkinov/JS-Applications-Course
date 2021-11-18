function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', displayRecords);

    const createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', createRecord);

    const phonebookList = document.getElementById('phonebook');

    async function getData() {
        try {
            const res = await fetch(url);

            if (res.status != 200) {
                throw new Error(res.statusText);
            }

            const data = await res.json();

            return data;

        } catch (err) {
            alert(err)
        }
    }

    async function displayRecords() {
        phonebookList.innerHTML = '';

        const raw = await getData();

        for (let i in raw) {
            const newListEl = document.createElement('li');

            newListEl.textContent = `${raw[i].person}: ${raw[i].phone} `;

            const button = document.createElement('button');
            button.textContent = 'Delete';
            button.value = i;
            button.addEventListener('click', deleteRecord);

            newListEl.appendChild(button);

            phonebookList.appendChild(newListEl);
        }
    }

    async function createRecord() {
        const name = document.getElementById('person');
        const phone = document.getElementById('phone');

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'applicaton/json'
            },
            body: JSON.stringify({ person: name.value.trim(), phone: phone.value.trim() })
        }

        try {
            const res = await fetch(url, options);

            if (res.status != 200) {
                throw new Error(res.statusText);
            }
        } catch (err) {
            alert(err);
        }

        name.value = '';
        phone.value = '';

        await displayRecords();
    }

    async function deleteRecord() {
        const id = this.value;
        const urlDel = url + '/' + id;

        const options = {
            method: 'delete'
        }

        await fetch(urlDel, options);

        await displayRecords();
    }
}

attachEvents();