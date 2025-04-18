const fetchBtn = document.querySelector('#fetch-btn');
const xhrBtn = document.querySelector('#xhr-btn');
const form = document.querySelector('form');
const titleInput = document.querySelector('#post-title');
const bodyInput = document.querySelector('#post-body');
const idInput = document.querySelector('#post-id');
const submitBtn = document.querySelector('#submit-btn');
const updateBtn = document.querySelector('#update-btn');
const msg = document.querySelector('#form-msg');

fetchBtn.addEventListener('click', fetchData);
xhrBtn.addEventListener('click', fetchDataXHR);
submitBtn.addEventListener('click', submitPost);
updateBtn.addEventListener('click', updatePost);

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
      msg.innerHTML = `Form submitted! <br />
      Post Title: ${data.title} <br />
      Post Body: ${data.body} <br />
      Post ID: ${data.id} <br />
      `;
    })
    .catch(err => {
      console.error('Error submitting data:', err);
      msg.innerText = `Error submitting the form!`;
    });
}

function updatePost(e) {
  e.preventDefault();
  const title = document.forms[0]['post-title'].value;
  const body = document.forms[0]['post-body'].value;
  const id = document.forms[0]['post-id'].value;

  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log('Post successfully updated.');
        console.log(data);
        msg.innerHTML = `Post Updated! <br />
          Post ID: ${data.id} <br />
          Title: ${data.title} <br />
          Body: ${data.body}`;
      } else {
        console.error('Error updating post:', xhr.statusText);
        msg.innerText = 'Error updating the post!';
      }
    }
  };
  xhr.send(
    JSON.stringify({
      title,
      body,
      id,
    })
  );
}
