
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PokeDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState ([true]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json`)
    .then(response =>{
      if(!response.ok) {
        throw new Error (`HTTP error! status: ${response.status}`)
      }
      return response.json();
    })
    .then(data => {
      const filteredPokemon = data.find(
        pokemon => pokemon.id === parseInt(id)
      );
      if(filteredPokemon) {
        setPokemon(filteredPokemon);
      } else {
        setError('Pokemon not found');
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    });
  }, [id]);
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return(
    <div className="poke-details" >
     {pokemon && (
      <div className="poke-container">
        <div className="left-column">
          <div className="poke-details">
            <h2>{pokemon.name.english}</h2>
            <p>Type: {pokemon.type.join(", ")}</p>
          </div>
          <div className="stat-value">
            {Object.entries(pokemon.base).map(([stat, value]) => {
              const statClass = stat.toLowerCase().replace(' ', '-');
              const barStyle = { width: `${(value / 255) * 100}%` };
              return (
                <div key={stat} className={`stat-item ${statClass}`}>
                  <p className="stat-name">{stat}</p>
                  <div className="stat-bar-container">
                    <div className="stat-bar" style={barStyle}>
                      <span className="stat-value-text">{value}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="right-column">
          <div className="image-details">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
            />
          </div>
          <p className="text-overlay"># {pokemon.id}</p>
        </div>
      </div>
    )}
    </div>
  )};




 
export default PokeDetails