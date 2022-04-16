const div = document.querySelector('.main__pokedex');
const form = document.querySelector('form');

function showDialog() {
  // Show Status Pokemon
}

const showPokemons = objeto => {
  const pokedex = objeto.map(pokemon => {
    div.innerHTML += `
    <dialog>
    <h1>Hola</h1>
    <p>XD</p>
    <button id="exit">Salir</button>
    </dialog>
    <div class="pokemon" id="show" onclick="showDialog()">
    <h1 class="text__id__title">${pokemon.id}</h1>
    <p class="text__subtitle__pokemon">${pokemon.name}</p>
    <img
      src="${pokemon.image}"
      class="image__pokemon"
    />
  </div>
    `;
  });
};

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 153; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
  }
  Promise.all(promises).then(results => {
    const objeto = results.map(item => ({
      id: item.id,
      name: item.name,
      image: item.sprites.other.dream_world.front_default,
    }));
    showPokemons(objeto);
  });
};

fetchPokemon();

form.addEventListener('submit', e => {
  e.preventDefault();
  let target = e.target.search.value;
  let value = target.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const objeto = {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
      };
      div.innerHTML = '';
      div.innerHTML += `
      <div class="pokemon">
      <h1 class="text__id__title">${objeto.id}</h1>
      <p class="text__subtitle__pokemon">${objeto.name}</p>
      <img
        src="${objeto.image}"
        class="image__pokemon"
      />
    </div>
      `;
    });
});
