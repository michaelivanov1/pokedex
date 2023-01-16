// fetch pokemon on page load
const fetchPokemon = async () => {
  let pokeArray = [];
  try {
    renderLoading();
    disableSidebarOnInitialLoad();

    // max count: 905
    for (let i = 1; i <= 905; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

      await fetch(url).then((response) => {
        pokeArray.push(response.json());
      });
    }
    Promise.all(pokeArray).then((results) => {
      const parsePokemon = results.map((data) => ({
        name: data.name,
        id: "#" + data.id,
        image:
          data.sprites.versions["generation-v"]["black-white"].animated[
            "front_default"
          ] || data.sprites["front_default"],
        height: data.height * 10 >= 100 ? data.height * 10 : data.height / 10,
        weight: data.weight / 10,
        type: data.types.map((type) => type.type.name),
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
    Promise.resolve(currJson).then((data) => {
      const currPokemon = {
        name: data.name,
        id: "#" + data.id,
        image:
          data.sprites.other["dream_world"]["front_default"] ||
          data.sprites["front_default"],
        type: data.types.map((type) => type.type.name),
        order: data.order,
        abilities: data.abilities.map((ability) => ability.ability.name),
        height: data.height,
        weight: data.weight,
        base_stat: data.stats.map((stat) => stat.base_stat),
        stat_name: data.stats.map((stat) => stat.stat.name),
      };
      currentPokemonInfo(currPokemon);
    });
  } catch (err) {
    console.error(`error fetching from api: ${err}`);
  }
};

// fetch pokemon descriptions
const fetchPokemonDescription = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  let flavorDescEntry;

  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const filteredDescription = data.flavor_text_entries.filter(
        (element) => element.language.name === "en"
      );
      flavorDescEntry =
        filteredDescription.length > 0 ? filteredDescription[0] : {};
      flavorDescEntry["flavor_text"] = flavorDescEntry["flavor_text"].replace(
        /(\n|\r|\f)/gm,
        " "
      );
    });
  return flavorDescEntry["flavor_text"];
};

// render pokemon cards
const renderPokemon = (pokemon) => {
  // check the types and make a html string for it
  let TypeOnPoke = [];
  let currTypes;
  // enable pokemon container scrollbar after page loading is completed
  let pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.style.overflowY = "auto";
  let rotatingPokeball = document.getElementById("pokeball-loading");
  rotatingPokeball.style.display = "none";

  pokemon.map((p) => {
    if (p.type.length > 1) {
      currTypes = `<p class="card-type ${typeColorCodes(p.type[0])} ">${
        p.type[0]
      }</p><p class="card-type ${typeColorCodes(p.type[1])} ">${p.type[1]}</p>`;
    } else {
      currTypes = `<p class="card-type ${typeColorCodes(p.type[0])}">${
        p.type[0]
      }</p>`;
    }
    TypeOnPoke.push(currTypes);
  });
  const HTMLString = pokemon
    .map(
      (p) => `
        <button class="card-full" onclick=onPokemonClick(this) id="${p.order}">
            <li class="card-li">
                <img class="card-image" src="${p.image}"/>
                <h3 class="card-id">${p.id}</h3>
                <h2 class="card-title">${p.name}</h2>
                ${TypeOnPoke[p.order - 1]}
                <p class="Height" id=${p.height}></p>
                <p class="Weight" id=${p.weight}></p>
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
  let sidebar = document.getElementById("sidebar-container");
  let typeString = "";
  let descString = "";
  let abilitiesTitleString = "";
  let statsString = "";

  const HTMLString = `
      <img class="selected-card-image" src="${pokemon.image}"/>
      <h3 class="selected-card-id">${pokemon.id}</h3>
      <h2 class="selected-card-title" >${pokemon.name}</h2>
  `;

  pokemon.type.forEach((p) => {
    typeString += `
    <div class="selected-card-type-container">
      <p class="selected-card-type ${typeColorCodes(p)}">${p}</p>
    </div>
    `;
  });

  pokemonSidebarStyling();

  fetchPokemonDescription(pokemon.id.slice(1)).then((d) => {
    descString += `<p class="selected-card-description">${d}</p>`;
    abilitiesTitleString += `<p class="selected-card-abilities-title">Abilities</p>`;
    pokemon.abilities.forEach((a) => {
      abilitiesTitleString += `
        <div class="selected-card-abilities-container"
          <p>${a}</p>
        </div>
      `;
    });

    let heightweightDataString = `
    <div class="selected-card-height-weight-title-container">
      <p class="height-title">Height</p>
      <p class="weight-title">Weight</p>
    </div>
    <div class="selected-card-height-weight-data-container">
      <p class="height-data">${
        pokemon.height * 10 >= 100
          ? pokemon.height / 10 + "m"
          : pokemon.height * 10 + "cm"
      }</p>
      <p class="weight-data">${pokemon.weight / 10 + "kg"}</p>
    </div>
    `;

    let shortenedStats = shortenPokemonStatName(pokemon.stat_name);
    let statsTitleString = `<p class="selected-card-stat-title">Stats</p>`;
    for (let i = 0; i < shortenedStats.length; i++) {
      statsString += `
        <div class="selected-card-stats-full-container">
          <p class="stats-name ${statColorCodes(shortenedStats[i])}">${
        shortenedStats[i]
      }</p>
          <p class="stats-value">${pokemon.base_stat[i]}</p>
        </div>
      `;
    }
    let statsFullString = statsTitleString + statsString;

    // the final string for the whole card
    sidebar.innerHTML =
      HTMLString +
      typeString +
      descString +
      abilitiesTitleString +
      heightweightDataString +
      statsFullString;
  });
};

// searchbar functionality
const searchForPokemon = () => {
  var searchBar, filter, pokeList, li, button, txtValue;
  searchBar = document.getElementById("search-bar");
  filter = searchBar.value.toUpperCase();
  pokeList = document.getElementById("pokedex");
  li = pokeList.getElementsByTagName("li");
  button = pokeList.getElementsByTagName("button");

  // loop through all list items and filter them out
  for (var i = 0; i < li.length; i++) {
    pokeName = li[i].getElementsByTagName("h2")[0];
    txtValue = pokeName.textContent || pokeName.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }
};
// Pokemon sorting using the class name and the id as stat and number
const sortPokemonList = (topic) => {
  let list, b;
  list = document.getElementById("pokedex");
  b = list.getElementsByTagName("button");
  sortHTML(b, topic.value);
};

/* HELPER FUNCTIONS */

// set color code classes based on pokemon type
const typeColorCodes = (pokemonType) => {
  let colorClass = "";

  if (pokemonType == "normal") colorClass = "normal";
  else if (pokemonType == "fire") colorClass = "fire";
  else if (pokemonType == "water") colorClass = "water";
  else if (pokemonType == "electric") colorClass = "electric";
  else if (pokemonType == "grass") colorClass = "grass";
  else if (pokemonType == "ice") colorClass = "ice";
  else if (pokemonType == "fighting") colorClass = "fighting";
  else if (pokemonType == "poison") colorClass = "poison";
  else if (pokemonType == "ground") colorClass = "ground";
  else if (pokemonType == "flying") colorClass = "flying";
  else if (pokemonType == "psychic") colorClass = "psychic";
  else if (pokemonType == "bug") colorClass = "bug";
  else if (pokemonType == "rock") colorClass = "rock";
  else if (pokemonType == "ghost") colorClass = "ghost";
  else if (pokemonType == "dragon") colorClass = "dragon";
  else if (pokemonType == "dark") colorClass = "dark";
  else if (pokemonType == "steel") colorClass = "steel";
  else if (pokemonType == "fairy") colorClass = "fairy";

  return colorClass;
};

// set color code classes based on pokemon stat
const statColorCodes = (pokemonStatName) => {
  let colorClass = "";

  if (pokemonStatName == "HP") colorClass = "hp";
  else if (pokemonStatName == "ATK") colorClass = "attack";
  else if (pokemonStatName == "DEF") colorClass = "defense";
  else if (pokemonStatName == "SpA") colorClass = "special-attack";
  else if (pokemonStatName == "SpD") colorClass = "special-defense";
  else if (pokemonStatName == "SPD") colorClass = "speed";

  return colorClass;
};

// expand/shrink pokemon container & sidebar
const pokemonSidebarStyling = () => {
  // enable sidebar upon selected pokemon
  let sidebar = document.getElementById("sidebar-container");
  sidebar.style.display = "block";
  sidebar.style.width = "18%";
  // shrink pokemon container upon selecting pokemon
  let pokeContainer = document.getElementById("pokemon-container");
  pokeContainer.style.width = "50%";
};

// abbreviate pokemon stat names
const shortenPokemonStatName = (stat_name) => {
  let statsArray = [];

  stat_name.forEach((s) => {
    if (s == "hp") statsArray.push("HP");
    else if (s == "attack") statsArray.push("ATK");
    else if (s == "defense") statsArray.push("DEF");
    else if (s == "special-attack") statsArray.push("SpA");
    else if (s == "special-defense") statsArray.push("SpD");
    else if (s == "speed") statsArray.push("SPD");
  });
  return statsArray;
};

// run animation while pokemon are loading
const renderLoading = () => {
  const HTMLString = `
    <h1>Fetching Pokémon...</h1>
    `;

  // hide scrollbar when loading
  let pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.style.overflowY = "hidden";
  let ol = document.getElementById("pokedex");
  ol.innerHTML = HTMLString;
};

// keep sidebar disabled until user clicks a pokemon in the grid
const disableSidebarOnInitialLoad = () => {
  let sidebar = document.getElementById("sidebar-container");
  let pokeContainer = document.getElementById("pokemon-container");
  sidebar.style.display = "none";
  // keep pokemon container wide until a pokemon is selected
  pokeContainer.style.width = "70%";
};

// sorting section-----------------------------------------------------------------
function sortHTML(htmlCollection, attribute) {
  var elementsArray = [].slice.call(htmlCollection);
  elementsArray.sort(function (a, b) {
    return (
      a.getElementsByClassName(attribute).item(0).id -
      b.getElementsByClassName(attribute).item(0).id
    );
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

// const quicksort = (array, left, right, topic) => {
//   var pivot, partitionIndex;

//   if (left < right) {
//     pivot = right;
//     partitionIndex = partition(array, pivot, left, right, topic);

//     //sort left and right
//     quicksort(array, left, partitionIndex - 1, topic);
//     quicksort(array, partitionIndex + 1, right, topic);
//   }
//   return array;
// };

// const partition = (array, pivot, left, right, topic) => {
//   var pivotValue = array[pivot].getElementsByClassName(topic).item(0).id,
//     partitionIndex = left;

//   for (var i = left; i < right; i++) {
//     if (array[i].getElementsByClassName(topic).item(0).id < pivotValue) {
//       swap(array, i, partitionIndex);
//       partitionIndex++;
//     }
//   }
//   swap(array, right, partitionIndex);
//   return partitionIndex;
// };

// const swap = (array, i, j) => {
//   var temp = array[i];
//   array[i] = array[j];
//   array[j] = temp;
// };

fetchPokemon();
