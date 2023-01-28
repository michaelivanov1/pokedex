// file to sort/filter pokemon data by asc/desc, types, searchbar, etc

// hide single type checkbox on app launch
document.getElementById("checkbox-label").style.visibility = "hidden"

const sortPokemonIdAsc = () => {

  let list, htmlCOLLECTION;
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");

  let elementsArray = [].slice.call(htmlCOLLECTION);
  elementsArray.sort(function (a, b) {
    return a.id - b.id;
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

const sortPokemonIdDesc = () => {

  let list, htmlCOLLECTION;
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");

  let elementsArray = [].slice.call(htmlCOLLECTION);
  elementsArray.sort(function (a, b) {
    return b.id - a.id;
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

const sortPokemonHeightAsc = (attribute) => {

  let list, htmlCOLLECTION;
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");

  let elementsArray = [].slice.call(htmlCOLLECTION);
  elementsArray.sort(function (a, b) {
    return (
      a.getElementsByClassName(attribute.value).item(0).id -
      b.getElementsByClassName(attribute.value).item(0).id
    );
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

const sortPokemonHeightDesc = (attribute) => {

  let list, htmlCOLLECTION;
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");

  let elementsArray = [].slice.call(htmlCOLLECTION);
  elementsArray.sort(function (a, b) {
    return (
      b.getElementsByClassName(attribute.value).item(0).id -
      a.getElementsByClassName(attribute.value).item(0).id
    );
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

const sortPokemonWeightAsc = (attribute) => {

  let list, htmlCOLLECTION;
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");

  let elementsArray = [].slice.call(htmlCOLLECTION);
  elementsArray.sort(function (a, b) {
    return (
      a.getElementsByClassName(attribute.value).item(0).id -
      b.getElementsByClassName(attribute.value).item(0).id
    );
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

const sortPokemonWeightDesc = (attribute) => {

  let list, htmlCOLLECTION;
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");

  let elementsArray = [].slice.call(htmlCOLLECTION);
  elementsArray.sort(function (a, b) {
    return (
      b.getElementsByClassName(attribute.value).item(0).id -
      a.getElementsByClassName(attribute.value).item(0).id
    );
  });
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
}

//clear sorts back to order\\
// only with sorts not filters yet
const clearSortPokemonHTML = () => {
  let list, htmlCOLLECTION;
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");

  let elementsArray = [].slice.call(htmlCOLLECTION);
  elementsArray.sort(function (a, b) { return a.id - b.id; });
  elementsArray.forEach(function (el) { el.parentNode.appendChild(el); });
}


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

// hide all types checkbox when a type other than "All Types" is selected
const disableCheckbox = () => {
  var e = document.getElementById("typeSelect");
  var text = e.options[e.selectedIndex].text;
  if (text === "All Types")
    document.getElementById("checkbox-label").style.visibility = "hidden"
  else {
    document.getElementById("checkbox-label").style.visibility = "visible"
    document.getElementById("checkbox-label").style.display = "block"
  }
}

// filter pokemon single types
let checkboxSingleType = document.querySelector('#single-type');

const filterPokeTypes = (selectedType) => {
  let pokeList, li, button;
  pokeList = document.getElementById("pokedex");
  li = pokeList.getElementsByTagName("li");
  button = pokeList.getElementsByTagName("button");
  disableCheckbox();
  // this loop runs outside of the checkbox event listener 
  // (user can select pokemon types without selecting single type)
  for (let i = 0; i < li.length; i++) {

    // determine pokemon type count
    let firstType = li[i].getElementsByClassName("card-type").item(0).innerHTML;
    let secondType = li[i].getElementsByClassName("card-type").length === 2
      ? li[i].getElementsByClassName("card-type").item(1).innerHTML
      : "";

    // match types with selected type & display list items accordingly 
    if (selectedType === "") {
      button[i].style.display = "";
    }
    else if (firstType === selectedType && secondType === "" && checkboxSingleType.checked) {
      button[i].style.display = "";
    }
    else if ((firstType === selectedType || secondType === selectedType) && !checkboxSingleType.checked) {
      button[i].style.display = "";
    }
    else {
      button[i].style.display = "none";
    }
  }

  // this loop is for updating the pokemon list items if the user selects/deselects the single type checkbox
  checkboxSingleType.addEventListener('change', (event) => {
    if (event.currentTarget.checked || !event.currentTarget.checked) {
      // loop all the li
      for (let i = 0; i < li.length; i++) {
        // determine pokemon type count
        let firstType = li[i].getElementsByClassName("card-type").item(0).innerHTML;
        let secondType = li[i].getElementsByClassName("card-type").length === 2
          ? li[i].getElementsByClassName("card-type").item(1).innerHTML
          : "";

        // match types with selected type & display list items accordingly 
        if (selectedType === "") {
          button[i].style.display = "";
        }
        else if (firstType === selectedType && secondType === "" && checkboxSingleType.checked) {
          button[i].style.display = "";
        }
        else if ((firstType === selectedType || secondType === selectedType) && !checkboxSingleType.checked) {
          button[i].style.display = "";
        }
        else {
          button[i].style.display = "none";
        }
      }
    }
  })
};