import { useEffect, useState } from "react";
import { getAllPokemons } from "../../api/api";
import PokemonCard from "../PokemonCard/PokemonCard";
import axios from "axios";
import './PokemonList.css'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [previous, setPrevious] = useState(null)
  const [next, setNext] = useState([0])
  const limit = 24

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await getAllPokemons(limit, offset)
        const pokemonPromises = response.data.results.map((pokemon) => 
          axios.get(pokemon.url)
        )
        
        const pokemonsData = await Promise.all(pokemonPromises)
        
        setPokemons(pokemonsData.map(pokemonResponse => pokemonResponse.data))
        setNext(response.data.next)
        setPrevious(response.data.previous)
      } catch {
        console.error("Error fetching pokemons")
      } finally {
        setLoading(false)
      }
    }
    getPokemons()
  }, [offset])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [offset])

  return (
    <div >
      <div className="pokemon-list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} name={pokemon.name} sprites={pokemon.sprites} />
        ))
      )}
      </div>
      <div className="pagination-buttons">
        {previous && <button className="previous" onClick={() => setOffset(offset - limit)}>Previous</button>}
        {next && <button className="next" onClick={() => setOffset(offset + limit)}>Next</button>}
      </div>
    </div>
  )
}

export default PokemonList
