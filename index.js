/*
Desde la siguiente URL: https://superheroapi.com podemos obtener un listado de superheroes y sus diferentes características.

El reto es el siguiente:
- Es necesario un listado de todos los superheroes que hay disponibles cuando consumimos esa API.
- Para evitar tener que hacer una llamada cada vez que se refresca la pantalla es necesario que los datos se queden almacenados en el navegador
- Evidentemente la primera vez que hacemos la consulta es necesario realizar la consulta, si o si, pero en posteriores ocasiones no debería ser necesario.
- La información se puede mostrar en la consola del navegador, no es necesario crear ninguna página.
- Mostrar por consola también, cuando se hace la llamada a la API o cuando se usan los datos almacenados.
- Solo se debe usar JS, nada de librerías y/o frameworks.
- [Opcional]: Si estas muy inspirado y te apetece trastear puedes crear una pagina donde muestres un listado con toda la información.

*/

const API_TOKEN = 6228623630514317;
const API_URL = 'https://superheroapi.com/api/6228623630514317';
const arraySize = Array.from({ length: 20 }, (_, i) => i + 1);

const getSuperHeroes = async () => {
  const dataInStorage = JSON.parse(localStorage.getItem('superHeroes'));
  if (dataInStorage) {
    printSuperHeroes(dataInStorage);
    console.log('LocalStorage', dataInStorage);
  } else {
    const promises = [];
    for (let i = 1; i < arraySize.length + 1; i++) {
      const promise = fetch(`${API_URL}/${i}`).then((response) =>
        response.json()
      );
      promises.push(promise);
    }
    try {
      const results = await Promise.all(promises);
      printSuperHeroes(results);
      console.log('API', results);

      localStorage.setItem('superHeroes', JSON.stringify(results));
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

const printSuperHeroes = (superHeroes) => {
  const container = document.getElementById('superheroes-container');
  superHeroes.forEach((superhero) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('h2');
    name.textContent = superhero.name;

    const powerstats = document.createElement('p');
    powerstats.textContent = `Powerstats: ${JSON.stringify(
      superhero.powerstats
    )}`;

    const biography = document.createElement('p');
    biography.textContent = `Biography: ${JSON.stringify(superhero.biography)}`;

    // Agregar más elementos según las propiedades que deseas mostrar

    card.appendChild(name);
    card.appendChild(powerstats);
    card.appendChild(biography);

    container.appendChild(card);
  });
};
getSuperHeroes();
