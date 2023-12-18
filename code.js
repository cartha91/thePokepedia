document.getElementById('pokemonInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        getPokemon();
    }
});

document.getElementById('pokemonInput').addEventListener('change', function() {
    let pokemonName = this.value.toLowerCase();
    if (pokemonName) {
        getPokemon();
    } else {
        alert('Please enter a Pokemon name.');
    }
});

document.getElementById('searchButton').addEventListener('mouseover', function() {
    this.style.backgroundColor = '#888'; 
});
document.getElementById('searchButton').addEventListener('mouseout', function() {
    this.style.backgroundColor = ''; 
});

function getPokemon() {
    let pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            let pokemonInfo = document.getElementById('Pokemoninfo');
            pokemonInfo.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}" class="pokemon-sprite">
                <p>Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p>Abilities: ${data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
                <p>Stats:</p>
                <ul>
                    ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
            `;
            fetch(data.species.url)
                .then(response => response.json())
                .then(speciesData => {
                    if (speciesData.evolves_from_species) {
                        pokemonInfo.innerHTML += `<p>Evolves from: ${speciesData.evolves_from_species.name}</p>`;
                    }
                    fetch(speciesData.habitat.url)
                        .then(response => response.json())
                        .then(habitatData => {
                            pokemonInfo.innerHTML += `<p>Habitat: ${habitatData.name}</p>`;
                        });
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}