window.isOnline = () => this.navigator.onLine;
const getById = (id) => document.getElementById(id);

const newsContainer = getById('content_news');

const itemTemplate = (title, body, picture) => `
    <div id="content_wrapper_news">
      <a href="#" class="news_table">
        <img src="${picture}" alt="${title}">
        <h1>${body}</h1>
      </a>
`

const initAndRenderData = (online) => {
  const data = localStorage.getItem('news_data');

  if (!isOnline()) return;

  if (!data) {
    console.log('No available local data found');
  } else {
    JSON.parse(data).forEach(({ title, body, picture}) => {
        console.log(title, body);
        $('#content_news').append(
          itemTemplate(title, body, picture),
        );
    });
  }
}

const onOnline = () => {
    initAndRenderData();
  console.log('Network status: online');
}

const onOffline = () => {
    initAndRenderData();
  console.log('Connection lost');
}

//method of adding an event and specifying function by event occuring 
window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);

