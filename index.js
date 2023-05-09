import { TOKEN } from './security.js';

const loading = () => setInterval(() => {
  console.count(`Loading....`);
}, 1000);

const API = ({ url, index }) => new Promise((resolve, reject) => {
  fetch(`${url}/${TOKEN}/${index + 1}`)
  .then((response) => response.json())
  .then((data) => resolve(data))
  .catch((error) => reject(error));
});

(async () => {
  let superHeroeData = [];
  const hasStorage = window.localStorage.getItem('superheroe-data');
  let load = loading();
  if (!hasStorage) {
    console.info('LOAD FROM API');
    try {
      const url = 'https://superheroapi.com/api';
      const totalSuperheroes = 732;
      const arrApiCall = new Array(totalSuperheroes).fill('').map((_, index) => API({ url, index }));
      superHeroeData = await Promise.allSettled(arrApiCall);
      window.localStorage.setItem('superheroe-data', JSON.stringify(superHeroeData));
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(load);
    }
  } else {
    console.info('LOAD FROM MEMORY');
    superHeroeData = JSON.parse(hasStorage);
  }
  clearInterval(load);
  console.table(superHeroeData);
})();