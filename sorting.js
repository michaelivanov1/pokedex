// file to sort/filter pokemon data by asc/desc, types, searchbar, etc

// hide single type checkbox on app launch
document.getElementById("checkbox-label").style.visibility = "hidden";

// default colors
let buttonAscId = document.getElementById("sort-id-asc");
buttonAscId.style.backgroundColor = "#f3d943";
let buttonAscHeight = document.getElementById("sort-height-asc");
buttonAscHeight.style.backgroundColor = "#f3d943";
let buttonAscWeight = document.getElementById("sort-weight-asc");
buttonAscWeight.style.backgroundColor = "#f3d943";

// sorting the pokemons
const sortPokemon = (e) => {
  // re-style the buttons
  let buttonAsc, buttonDesc, list, htmlCOLLECTION, arrOrder;

  arrOrder = e.id.split("-");
  list = document.getElementById("pokedex");
  htmlCOLLECTION = list.getElementsByTagName("button");
  let elementsArray = [].slice.call(htmlCOLLECTION);

  //set the style for the arrow buttons
  if (arrOrder[2] === "asc") {
    buttonAsc = document.getElementById(e.id);
    buttonAsc.style.backgroundColor = "#f3d943";
    buttonAsc.style.cursor = "auto";
    buttonDesc = document.getElementById(`${arrOrder[0]}-${arrOrder[1]}-desc`);
    buttonDesc.style.backgroundColor = "white";
    buttonDesc.style.cursor = "pointer";
  } else if (arrOrder[2] === "desc") {
    buttonDesc = document.getElementById(e.id);
    buttonDesc.style.backgroundColor = "#f3d943";
    buttonDesc.style.cursor = "auto";
    buttonAsc = document.getElementById(`${arrOrder[0]}-${arrOrder[1]}-asc`);
    buttonAsc.style.backgroundColor = "white";
    buttonAsc.style.cursor = "pointer";
  }
  // clear the sort
  else {
    clearSortColorValues();
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
    return;
  }

  //the sorting
  switch (e.id) {
    // Id sort
    case "sort-id-asc":
      elementsArray.sort(function (a, b) {
        return a.id - b.id;
      });
      break;
    case "sort-id-desc":
      elementsArray.sort(function (a, b) {
        return b.id - a.id;
      });
      break;
    // value sorts
    case "sort-height-asc":
    case "sort-weight-asc":
      elementsArray.sort(function (a, b) {
        return (
          a.getElementsByClassName(e.value).item(0).id -
          b.getElementsByClassName(e.value).item(0).id
        );
      });
      break;
    case "sort-height-desc":
    case "sort-weight-desc":
      elementsArray.sort(function (a, b) {
        return (
          b.getElementsByClassName(e.value).item(0).id -
          a.getElementsByClassName(e.value).item(0).id
        );
      });
      break;
    default:
      break;
  }
  elementsArray.forEach(function (el) {
    el.parentNode.appendChild(el);
  });
};

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
    document.getElementById("checkbox-label").style.visibility = "hidden";
  else {
    document.getElementById("checkbox-label").style.visibility = "visible";
    document.getElementById("checkbox-label").style.display = "block";
  }
};

// filter pokemon single types
let checkboxSingleType = document.querySelector("#single-type");

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
    let secondType =
      li[i].getElementsByClassName("card-type").length === 2
        ? li[i].getElementsByClassName("card-type").item(1).innerHTML
        : "";

    // match types with selected type & display list items accordingly
    if (selectedType === "") {
      button[i].style.display = "";
    } else if (
      firstType === selectedType &&
      secondType === "" &&
      checkboxSingleType.checked
    ) {
      button[i].style.display = "";
    } else if (
      (firstType === selectedType || secondType === selectedType) &&
      !checkboxSingleType.checked
    ) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }

  // this loop is for updating the pokemon list items if the user selects/deselects the single type checkbox
  checkboxSingleType.addEventListener("change", (event) => {
    if (event.currentTarget.checked || !event.currentTarget.checked) {
      // loop all the li
      for (let i = 0; i < li.length; i++) {
        // determine pokemon type count
        let firstType = li[i]
          .getElementsByClassName("card-type")
          .item(0).innerHTML;
        let secondType =
          li[i].getElementsByClassName("card-type").length === 2
            ? li[i].getElementsByClassName("card-type").item(1).innerHTML
            : "";

        // match types with selected type & display list items accordingly
        if (selectedType === "") {
          button[i].style.display = "";
        } else if (
          firstType === selectedType &&
          secondType === "" &&
          checkboxSingleType.checked
        ) {
          button[i].style.display = "";
        } else if (
          (firstType === selectedType || secondType === selectedType) &&
          !checkboxSingleType.checked
        ) {
          button[i].style.display = "";
        } else {
          button[i].style.display = "none";
        }
      }
    }
  });
};

const clearSortColorValues = () => {
  let buttonAscId = document.getElementById("sort-id-asc");
  buttonAscId.style.backgroundColor = "#f3d943";
  let buttonDescId = document.getElementById("sort-id-desc");
  buttonDescId.style.backgroundColor = "white";
  let buttonAscHeight = document.getElementById("sort-height-asc");
  buttonAscHeight.style.backgroundColor = "#f3d943";
  let buttonDescHeight = document.getElementById("sort-height-desc");
  buttonDescHeight.style.backgroundColor = "white";
  let buttonAscWeight = document.getElementById("sort-weight-asc");
  buttonAscWeight.style.backgroundColor = "#f3d943";
  let buttonDescWeight = document.getElementById("sort-weight-desc");
  buttonDescWeight.style.backgroundColor = "white";
  buttonDescId.style.cursor = "pointer";
  buttonDescHeight.style.cursor = "pointer";
  buttonDescWeight.style.cursor = "pointer";
  buttonAscId.style.cursor = "auto";
  buttonAscHeight.style.cursor = "auto";
  buttonAscWeight.style.cursor = "auto";
};

// start app with selected asc buttons
clearSortColorValues();
