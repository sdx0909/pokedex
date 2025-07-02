import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
// import PokemonList0 from "../PokemonList/PokemonList0";
import Search from "../Search/Search";
// importing the css
import "./Pokedex.css";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import { Toaster } from "react-hot-toast";

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="pokedex-wrapper">
      <Toaster position="bottom-right" />
      <Search updateSearchTerm={setSearchTerm} />
      <br />
      {!searchTerm ? (
        <PokemonList />
      ) : (
        // todo:check:  reconsilation-algorithm
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
      )}
    </div>
  );
}
export default Pokedex;
