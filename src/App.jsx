import { useState, useEffect } from 'react';
import fetchPokemonData from './fetch';
import './App.css';

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  function shuffleData(data) {
    const dataCopy = data.slice();
    for (
      let currentIndex = dataCopy.length - 1;
      currentIndex > 0;
      currentIndex -= 1
    ) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      const tempVariable = dataCopy[randomIndex];
      dataCopy[randomIndex] = dataCopy[currentIndex];
      dataCopy[currentIndex] = tempVariable;
    }
    setPokemonData(dataCopy);
  }

  function updateGame(pokemonId) {
    if (selectedPokemons.includes(pokemonId)) {
      setHighScore(currentScore > highScore ? currentScore : highScore);
      setCurrentScore(0);
      setSelectedPokemons([]);
    } else {
      setCurrentScore(currentScore + 1);
      setSelectedPokemons([...selectedPokemons, pokemonId]);
    }
    shuffleData(pokemonData);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPokemonData();
      shuffleData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <header>
        <h1>Memory Card Game</h1>
        <p>
          Get points by clicking on a pokemon but don&#39;t click on any more
          than once!
        </p>
        <div>
          <p>Current Score: {currentScore}</p>
          <p>High Score: {highScore}</p>
        </div>
      </header>
      <main>
        {loading && <h1 className="loading">Loading...</h1>}
        {!loading && (
          <>
            {pokemonData.map((pokemon) => {
              return (
                <button
                  key={pokemon.id}
                  className="pokemon"
                  onClick={() => updateGame(pokemon.id)}
                >
                  <img src={pokemon.sprites.front_default} alt="" />
                  {pokemon.name.slice(0, 1).toUpperCase() +
                    pokemon.name.slice(1)}
                </button>
              );
            })}
          </>
        )}
      </main>
      <footer>
        Developed by{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Ngonidzashe-Zvenyika"
        >
          Ngonidzashe Zvenyika
        </a>{' '}
        | Powered by{' '}
        <a target="_blank" rel="noreferrer" href="https://pokeapi.co/">
          PokeAPI
        </a>{' '}
      </footer>
    </>
  );
}
