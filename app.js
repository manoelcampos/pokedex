const getPokemonUrl = id => 'https://pokeapi.co/api/v2/pokemon/' + id

const insertPokemonIntoPage = pokemonsHtml => {
    const ul = document.querySelector('[data-js=pokedex]')
    ul.innerHTML = pokemonsHtml
}

const generatePokemonHtmlItem = pokemon => {
    const {id, name, types} = pokemon
    const typeNames = types.map(info => info.type.name).join(" | ")

    const html = 
        `<li class='card ${types[0].type.name}'>
            <img class='card-image' src='https://pokeres.bastionbot.org/images/pokemon/${id}.png' />
            <h2 class='card-title'>${id}. ${name}</h2>
            <p class='card-subtitle'>${typeNames}</p>
        </li>`
        
    return html
}

const generatePokemonsHtml = pokemonArray => pokemonArray.map(generatePokemonHtmlItem).join("\n")

const fetchPokemon = id => fetch(getPokemonUrl(id)).then(response => response.json())

const generatePokemonPromisses = () => Array(150).fill().map((_, i) => fetchPokemon(i + 1))

Promise.all(generatePokemonPromisses())
       .then(generatePokemonsHtml)
       .then(insertPokemonIntoPage)
