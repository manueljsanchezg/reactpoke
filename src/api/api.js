import axios from "axios";

const url = 'https://pokeapi.co/api/v2/pokemon';

const getAllPokemons = (limit, offset) => {
  return axios.get(`${url}?limit=${limit}&offset=${offset}`);
};

export { getAllPokemons };
