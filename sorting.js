// file to sort/filter pokemon data

let sortOrderHeight = false;
let sortOrderWeight = false;
let sortOrderPokeCount = false;

function sortPokemonHeightHTML(htmlCollection, attribute) {
  let height = document.getElementById("height-id");

  sortOrderHeight = !sortOrderHeight;
  let elementsArray = [].slice.call(htmlCollection);
  elementsArray.sort(function (a, b) {
    if (sortOrderHeight) {
      height.classList.add("uparrow");
      height.classList.remove("downarrow");
      return (
        a.getElementsByClassName(attribute).item(0).id -
        b.getElementsByClassName(attribute).item(0).id
      );
    } else {
      height.classList.add("downarrow");
      height.classList.remove("uparrow");
      return (
        b.getElementsByClassName(attribute).item(0).id -
        a.getElementsByClassName(attribute).item(0).id
      );
    }
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

function sortPokemonWeightHTML(htmlCollection, attribute) {
  let weight = document.getElementById("weight-id");

  sortOrderWeight = !sortOrderWeight;
  let elementsArray = [].slice.call(htmlCollection);
  elementsArray.sort(function (a, b) {
    if (sortOrderWeight) {
      weight.classList.add("uparrow");
      weight.classList.remove("downarrow");
      return (
        a.getElementsByClassName(attribute).item(0).id -
        b.getElementsByClassName(attribute).item(0).id
      );
    } else {
      weight.classList.add("downarrow");
      weight.classList.remove("uparrow");
      return (
        b.getElementsByClassName(attribute).item(0).id -
        a.getElementsByClassName(attribute).item(0).id
      );
    }
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

function sortPokemonOrderHTML(htmlCollection) {
  let order = document.getElementById("order-id");

  sortOrderPokeCount = !sortOrderPokeCount;
  let elementsArray = [].slice.call(htmlCollection);
  elementsArray.sort(function (a, b) {
    if (sortOrderPokeCount) {
      order.classList.add("uparrow");
      order.classList.remove("downarrow");
      return a.id - b.id;
    } else {
      order.classList.add("downarrow");
      order.classList.remove("uparrow");
      return b.id - a.id;
    }
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

//clear sorts back to order\\
// only with sorts not filters yet
function clearSortPokemonHTML(htmlCollection) {
  let weight = document.getElementById("weight-id");
  let height = document.getElementById("height-id");
  let order = document.getElementById("order-id");

  sortOrderWeight = false;
  sortOrderHeight = false;
  sortOrderPokeCount = false;

  let elementsArray = [].slice.call(htmlCollection);
  elementsArray.sort(function (a, b) {
    weight.classList.remove("downarrow");
    height.classList.remove("downarrow");
    order.classList.remove("downarrow");
    weight.classList.add("uparrow");
    height.classList.add("uparrow");
    order.classList.add("uparrow");
    return a.id - b.id;
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

// Pokemon sorting using the class name and the id as stat and number
const sortPokemonHeight = (topic) => {
  let list, b;
  list = document.getElementById("pokedex");
  b = list.getElementsByTagName("button");
  sortPokemonHeightHTML(b, topic.value);
};

const sortPokemonWeight = (topic) => {
  let list, b;
  list = document.getElementById("pokedex");
  b = list.getElementsByTagName("button");
  sortPokemonWeightHTML(b, topic.value);
};

const sortPokemonOrder = () => {
  let list, b;
  list = document.getElementById("pokedex");
  b = list.getElementsByTagName("button");
  sortPokemonOrderHTML(b);
};

const sortClear = () => {
  let list, b;
  list = document.getElementById("pokedex");
  b = list.getElementsByTagName("button");
  clearSortPokemonHTML(b);
};

// filter section --------------------
// searchbar functionality
const searchForPokemon = () => {
  let searchBar, filter, pokeList, li, button, txtValue;
  searchBar = document.getElementById("search-bar");
  filter = searchBar.value.toUpperCase();
  pokeList = document.getElementById("pokedex");
  li = pokeList.getElementsByTagName("li");
  button = pokeList.getElementsByTagName("button");

  // loop through all list items and filter them out
  for (let i = 0; i < li.length; i++) {
    pokeName = li[i].getElementsByTagName("h2")[0];
    txtValue = pokeName.textContent || pokeName.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }
};

// type filtering ------------------------
const filterPokeTypes = () => {
  // the type Select
  // get the html docs
  let pokeList, li, button;
  let selectedType = document.getElementById("typeSelect").value;
  pokeList = document.getElementById("pokedex");
  li = pokeList.getElementsByTagName("li");
  button = pokeList.getElementsByTagName("button");

  // loop all the li
  for (let i = 0; i < li.length; i++) {
    //find out if they have two
    let firstType = li[i].getElementsByClassName("card-type").item(0).innerHTML;
    let secondType =
      li[i].getElementsByClassName("card-type").length === 2
        ? li[i].getElementsByClassName("card-type").item(1).innerHTML
        : "";

    //check the types if they match
    if (selectedType === "") {
      button[i].style.display = "";
    } else if (firstType === selectedType || secondType === selectedType) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }
};
