const fetchPokemon = async () => {

    let pokeArray = []

    try {
        for (let i = 1; i <= 50; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

            await fetch(url).then((response) => { pokeArray.push(response.json()) })
        }

        Promise.all(pokeArray).then(results => {
            const parsePokemon = results.map(data => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(', ') // for multiple types
            }));
            renderPokemon(parsePokemon)
        })
    } catch (err) {
        console.error(`error fetching from api: ${err}`)
    }
}

const renderPokemon = (pokemon) => {

    const HTMLString = pokemon.map(p =>
        `
        <li class="card-full">
            <img class="card-image" src="${p.image}"/>
            <h2 class="card-title">${p.id}. ${p.name}</h2>
            <p class="card-type">Type: ${p.type}</p
        </li>
        `
    ).join('');

    let ol = document.getElementById('pokedex');
    ol.innerHTML = HTMLString;
}

fetchPokemon()