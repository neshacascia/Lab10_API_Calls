const fetchBtn = document.querySelector('#fetch-btn');

fetchBtn.addEventListener('click', fetchData);

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
      displayData(title, body);
    })
    .catch(err => console.error('Error fetching data:', err));
}

function displayData(title, body) {
  const titleEl = document.querySelector('#title');
  const bodyEl = document.querySelector('#body');

  titleEl.innerText = title;
  bodyEl.innerText = body;
}
