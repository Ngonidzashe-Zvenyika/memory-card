export default async function fetchPokemonData() {
  const pokemons = [
    'bulbasaur',
    'pikachu',
    'ninetales',
    'machoke',
    'bellsprout',
    'rapidash',
    'geodude',
    'voltorb',
    'mewtwo',
    'sudowoodo',
    'ursaring',
    'swellow',
  ];

  const pokemonData = [];
  try {
    for (const pokemon of pokemons) {
      let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
      data = await data.json();
      pokemonData.push(data);
    }
    return pokemonData;
  } catch (error) {
    console.log(error);
  }
}
