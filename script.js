const fetchBtn = document.querySelector('#fetch-btn');
const xhrBtn = document.querySelector('#xhr-btn');
const form = document.querySelector('form');
const titleInput = document.querySelector('#post-title');
const bodyInput = document.querySelector('#post-body');
const msg = document.querySelector('#form-msg');

fetchBtn.addEventListener('click', fetchData);
xhrBtn.addEventListener('click', fetchDataXHR);
form.addEventListener('submit', submitPost);

function fetchData() {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      const { title, body } = data;
      displayData(title, body, 'fetch');
    })
    .catch(err => console.error('Error fetching data:', err));
}

function fetchDataXHR() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        const { title, body } = data;
        displayData(title, body, 'xhr');
      } else {
        console.error('Error fetching data:', xhr.statusText);
      }
    }
  };

  xhr.send();
}

function displayData(title, body, type) {
  if (type === 'fetch') {
    const fetchTitleEl = document.querySelector('#fetch-title');
    const fetchBodyEl = document.querySelector('#fetch-body');

    fetchTitleEl.innerText = title;
    fetchBodyEl.innerText = body;
  } else {
    const xhrTitleEl = document.querySelector('#xhr-title');
    const xhrBodyEl = document.querySelector('#xhr-body');

    xhrTitleEl.innerText = title;
    xhrBodyEl.innerText = body;
  }
}

function submitPost(e) {
  e.preventDefault();
  const title = document.forms[0]['post-title'].value;
  const body = document.forms[0]['post-body'].value;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log('Form successfully submitted.');
      console.log(data);
      msg.innerText = `Form submitted! Response data: ${data.id}`;
    })
    .catch(err => {
      console.error('Error submitting data:', err);
      msg.innerText = `Error submitting the form!`;
    });
}
