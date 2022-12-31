// fetch pokemon on page load
const fetchPokemon = async () => {
  let pokeArray = [];
  try {
    renderLoading();
    // max count: 905
    for (let i = 1; i <= 42; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

      await fetch(url).then((response) => {
        pokeArray.push(response.json());
      });
    }
    Promise.all(pokeArray).then((results) => {
      const parsePokemon = results.map((data) => ({
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        id: "#" + data.id,
        image:
          data.sprites.versions["generation-v"]["black-white"].animated[
            "front_default"
          ] || data.sprites["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
        order: data.id,
      }));
      renderPokemon(parsePokemon);
    });
  } catch (err) {
    console.error(`error fetching from api: ${err}`);
  }
};

// fired upon clicking a card
const onPokemonClick = async (e) => {
  let currJson;
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${e.id}`;
    await fetch(url).then((response) => {
      currJson = response.json();
    });
    Promise.resolve(currJson).then((results) => {
      const currPokemon = {
        name: results.name.charAt(0).toUpperCase() + results.name.slice(1),
        id: "#" + results.id,
        image:
          results.sprites.other["dream_world"]["front_default"] ||
          results.sprites["front_default"],
        type: results.types.map((type) => type.type.name).join(", "),
        order: results.order,
      };
      currentPokemonInfo(currPokemon);
    });
  } catch (err) {
    console.error(`error fetching from api: ${err}`);
  }
};

// run animation while pokemon are loading
const renderLoading = () => {
  const HTMLString = `
        <h1>loading...</h1>
        `;

  let ol = document.getElementById("pokedex");
  ol.innerHTML = HTMLString;
};

// render pokemon cards
const renderPokemon = (pokemon) => {
  const HTMLString = pokemon
    .map(
      (p) => `
        <button class="card-full" onclick=onPokemonClick(this) id="${p.order}">
            <li class="card-li">
                <img class="card-image" src="${p.image}"/>
                <h3 class="card-id">${p.id}</h3>
                <h2  class="card-title" >${p.name}</h2>
                <p class="card-type">${p.type}</p>
            </li>
        </button>
        `
    )
    .join("");

  let ol = document.getElementById("pokedex");
  ol.innerHTML = HTMLString;
};

// the display that comes up for currently selected pokemon
const currentPokemonInfo = (pokemon) => {
  console.log(pokemon);
  const HTMLString = `
        <div class="selected-card-full"> 
            <img class="selected-card-image" src="${pokemon.image}"/>
            <h3 class="selected-card-id">${pokemon.id}</h3>
            <h2 class="selected-card-title" >${pokemon.name}</h2>
            <p class="selected-card-type">${pokemon.type}</p>
        </div>
        `;

  let info = document.getElementById("pokemon-info");
  info.innerHTML = HTMLString;
};

function searchForPokemon() {
  // Declare variables
  var searchBar, filter, pokeList, li, button, txtValue;
  searchBar = document.getElementById("search-bar");
  filter = searchBar.value.toUpperCase();
  pokeList = document.getElementById("pokedex");
  li = pokeList.getElementsByTagName("li");
  button = pokeList.getElementsByTagName("button");

  // Loop through all list items and filter them out
  for (var i = 0; i < li.length; i++) {
    pokeName = li[i].getElementsByTagName("h2")[0];
    txtValue = pokeName.textContent || pokeName.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }
}

fetchPokemon();
