
document.getElementById('pokemon-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemon = document.getElementById('pokemon').value.trim().toLowerCase();
    const resultDiv = document.querySelector('.pokemon-result');
    resultDiv.innerHTML = ''; // Clear previous results
    
    if (!pokemon) {
        resultDiv.innerHTML = '<p>Please enter a Pokémon name or ID.</p>';
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonData(data);
        })
        .catch(() => {
            searchPokemonByName(pokemon, resultDiv);
        });
});

const displayPokemonData = (data) => {
    const resultDiv = document.querySelector('.pokemon-result');
    resultDiv.style.display = 'flex';
    let html = `
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <div class="pokemon-details">
            <h2><span>${capitalizeFirstLetter(data.name)}</span></h2>
            <p>ID: <span>${data.id}</span></p>
            <p>Base Experience: <span>${data.base_experience}</span></p>
            <p>Height: <span>${data.height}</span></p>
            <p>Weight: <span>${data.weight}</span></p>
            <p>Abilities: <span><br>${data.abilities.map(ability => ability.ability.name).join('<br>')}</span></p>
            <p>Types: <span><br>${data.types.map(type => type.type.name).join('<br>')}</span></p>
        </div>`;
    resultDiv.innerHTML = html;
}

const searchPokemonByName = (name, resultDiv) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const pokemon = data.results.find(pokemon => pokemon.name.includes(name));
            if (pokemon) {
                return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                    .then(response => response.json())
                    .then(data => displayPokemonData(data));
            } else {
                resultDiv.innerHTML = '<p>Pokémon not found. Please check the name or ID and try again.</p>';
            }
        })
        .catch(error => {
            resultDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}