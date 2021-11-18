function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const messagesArea = document.getElementById('messages');
    messagesArea.value = '';

    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', onSubmit);
    refreshBtn.addEventListener('click', onRefresh);

    async function onSubmit() {
        const author = document.querySelector('#controls input[name="author"]');
        const message = document.querySelector('#controls input[name="content"]');

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { author: author.value.trim(), content: message.value.trim() })
        }

        console.log(options);

        try {
            const res = await fetch(url, options);

            if (res.status != 200) {
                throw new Error(res.statusText);
            }
        } catch (err) {
            alert(err);
        }

        author.value = '';
        message.value = '';
    }

    async function onRefresh() {
        messagesArea.value = '';

        try {
            const res = await fetch(url);

            if (res.status != 200) {
                throw new Error(res.statusText);
            }

            const data = await res.json();

            messagesArea.value = processMessages(data);
        } catch (err) {
            alert(err);
        }
    }

    function processMessages(rawObj) {
        let outputArr = [];

        for (let i in rawObj) {
            let tempStr = '';
            tempStr += rawObj[i].author;
            tempStr += ': ';
            tempStr += rawObj[i].content;

            outputArr.push(tempStr);
        }

        return outputArr.join('\n');
    }
}

attachEvents();