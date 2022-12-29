const fetchPokemon = async () => {
    let pokeArray = [];

    try {
        for (let i = 1; i <= 20; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

            await fetch(url).then((response) => {
                pokeArray.push(response.json());
            });
        }

        Promise.all(pokeArray).then((results) => {
            const parsePokemon = results.map((data) => ({
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                id: '#' + data.id,
                image: data.sprites.versions["generation-v"]["black-white"].animated["front_default"] || data.sprites["front_default"],
                type: data.types.map((type) => type.type.name).join(", ")
            }));
            renderPokemon(parsePokemon);
        });
    } catch (err) {
        console.error(`error fetching from api: ${err}`);
    }
};

const onPokemonClick = (e) => {
    console.log(e);
};

const renderPokemon = (pokemon) => {
    // pokemon.map(p => {
    //     console.log(p.type)
    // })

    const HTMLString = pokemon.map((p) =>
        `
        <button class="card-full" onclick=onPokemonClick(this)>
        <li class="card-li">
            <img class="card-image" src="${p.image}"/>
            <h3 class="card-id">${p.id}</h3>
            <h2 class="card-title">${p.name}</h2>
            <p class="card-type">${p.type
        // == 'fire'
        // ?
        // document.querySelector('.card-title').style.color = 'red'
        // :
        // document.querySelector('.card-title').style.color = "black"
        }
            </p>
        </li>
        </button>
        `
    )
        .join("");

    let ol = document.getElementById("pokedex");
    ol.innerHTML = HTMLString;
};

fetchPokemon();
