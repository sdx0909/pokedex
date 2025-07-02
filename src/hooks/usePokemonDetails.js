import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function usePokemonDetails(id, pokemonName) {
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    try {
      let response;
      if (pokemonName) {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }

      const pokemonOfSameTypes = axios.get(
        `https://pokeapi.co/api/v2/type/${
          response.data.types ? response.data.types[0].type.name : ""
        }`
      );

      toast.success("Founded !!!");

      setPokemon((state) => ({
        ...state,
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemons: response.data.pokemon,
      }));

      pokemonOfSameTypes.then((response) => {
        setPokemon((state) => ({
          ...state,
          similarPokemons: response.data.pokemon,
        }));
      });

      setPokemonListState({
        ...pokemonListState,
        type: response.data.types ? response.data.types[0].type.name : "",
      });
    } catch (e) {
      toast.error("Not Found!");
      console.log("something went wrong:", e.message);
    }
  }

  const [pokemonListState, setPokemonListState] = useState({});

  useEffect(() => {
    downloadPokemon();
  }, []);

  return [pokemon];
}

export default usePokemonDetails;
