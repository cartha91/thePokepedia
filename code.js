function getPokemon() {
    let pokemonName = document.getElementById('pokemonInput').value;
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
        .then(response => response.json())
        .then(data => {
            let pokemonInfo = document.getElementById('pokemonInfo');
            pokemonInfo.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Height: ${data.height}</p>
                <p>Weight: ${data.weight}</p>
            `;
        })
        .catch(error => console.error(error));
}