// file to sort/filter pokemon data

let sortOrderHeight = false;
let sortOrderWeight = false;
let sortOrderPokeCount = false;

function sortPokemonHeightHTML(htmlCollection, attribute) {
    let height = document.getElementById("height-id");

    sortOrderHeight = !sortOrderHeight;
    var elementsArray = [].slice.call(htmlCollection);
    elementsArray.sort(function (a, b) {
        if (sortOrderHeight) {
            console.log("asc");
            height.classList.add("uparrow")
            height.classList.remove("downarrow")
            return (
                a.getElementsByClassName(attribute).item(0).id -
                b.getElementsByClassName(attribute).item(0).id
            );
        } else {
            console.log("desc");
            height.classList.add("downarrow")
            height.classList.remove("uparrow")
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
    var elementsArray = [].slice.call(htmlCollection);
    elementsArray.sort(function (a, b) {
        if (sortOrderWeight) {
            console.log("asc");
            weight.classList.add("uparrow")
            weight.classList.remove("downarrow")
            return (
                a.getElementsByClassName(attribute).item(0).id -
                b.getElementsByClassName(attribute).item(0).id
            );
        } else {
            console.log("desc");
            weight.classList.add("downarrow")
            weight.classList.remove("uparrow")
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
    var elementsArray = [].slice.call(htmlCollection);
    elementsArray.sort(function (a, b) {
        if (sortOrderPokeCount) {
            console.log("asc");
            order.classList.add("uparrow")
            order.classList.remove("downarrow")
            return a.id - b.id;
        } else {
            console.log("desc");
            order.classList.add("downarrow")
            order.classList.remove("uparrow")
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

    var elementsArray = [].slice.call(htmlCollection);
    elementsArray.sort(function (a, b) {
        weight.classList.remove("downarrow")
        height.classList.remove("downarrow")
        order.classList.remove("downarrow")
        weight.classList.add("uparrow")
        height.classList.add("uparrow")
        order.classList.add("uparrow")
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