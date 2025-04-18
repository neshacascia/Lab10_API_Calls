const fetchBtn = document.querySelector('#fetch-btn');
const xhrBtn = document.querySelector('#xhr-btn');

fetchBtn.addEventListener('click', fetchData);
xhrBtn.addEventListener('click', fetchDataXHR);

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
