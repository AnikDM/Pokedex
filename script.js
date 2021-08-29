const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 898; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));
        displayPokemon(pokemon);
        // detailsPokemon(pokemon);
    })
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(pokeman => `
    <div class="bg" onclick="detailsPokemon()">
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title" >${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
    </li>
    </div>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

// const detailsPokemon = (pokemon) => {
//     const String = pokemon.map(poke => `
//     <div class="bg" onclick="detailsPokemon()">
//     <li class="card">
//         <img class="card-image" src="${pokeman.image}"/>
//         <h2 class="card-title" >${pokeman.id}. ${pokeman.name}</h2>
//         <p class="card-subtitle">Type: ${pokeman.type}</p>
//     </li>
//     </div>
//     `).join('');
//     console.log(`${pokemon.name}`)
// };
fetchPokemon();
