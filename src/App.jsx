import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [pokemonName, setPokemonName] = useState(""); // For search input
  const [data, setData] = useState(null); // Pokemon data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null); // Reset error on every fetch
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokemon not found. Please try again.");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (pokemonName.trim() !== "") {
      fetchPokemon();
    } else {
      setError("Please enter a Pokemon name.");
    }
  };

  return (
    <div className="pokedex">
      <h1>POKEDEX</h1>
      <div className="input-btn">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="output">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && (
          <div className="pokemon-details">
            <h2>{data.name.toUpperCase()}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <p>
              <strong>Height:</strong> {data.height}
            </p>
            <p>
              <strong>Weight:</strong> {data.weight}
            </p>
            <p>
              <strong>Abilities:</strong> {data.abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
