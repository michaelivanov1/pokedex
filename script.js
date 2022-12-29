const fetchData = async () => {

    let url = 'https://pokeapi.co/api/v2/pokemon/'

    try {
        let response = await fetch(url)
        return await response.json()
    } catch (err) {
        console.error('error fetching data: ' + err)
    }
}

const renderData = async () => {
    let pokemon = await fetchData()
    let t = pokemon.results
    // let d = t.map((n) => n.name)
    // console.log(d)

    let renderToHTML = '';

    t.forEach(pokemon => {
        let htmlSegment = `<div>
                                <h3>${JSON.stringify(pokemon.name)}</h3>
        
                            </div>`

        renderToHTML += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = renderToHTML;
}

renderData()

// FetchData()