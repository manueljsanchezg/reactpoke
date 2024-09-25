/* eslint-disable react/prop-types */
import './PokemonCard.css';

const PokemonCard = ({ name, sprites }) => {
  return (
    <div className="pokemon-card">
      <img src={sprites.front_default} alt={name} height="180px" width="180px" />
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
    </div>
  )
}

export default PokemonCard;
