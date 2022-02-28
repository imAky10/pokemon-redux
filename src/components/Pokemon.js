import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/pokemonActions";
import _ from "lodash";

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <div className="pokemon-wrapper">
          <div className="item">
            <h1>Sprites</h1>
            <img
              src={pokeData.sprites.front_default}
              alt=""
              width="130px"
              height="130px"
            />
            <img
              src={pokeData.sprites.back_default}
              alt=""
              width="130px"
              height="130px"
            />
            <img
              src={pokeData.sprites.front_shiny}
              alt=""
              width="130px"
              height="130px"
            />
            <img
              src={pokeData.sprites.back_shiny}
              alt=""
              width="130px"
              height="130px"
            />
          </div>
          <div className="item">
            <h1>Stats</h1>
            {pokeData.stats.map((el) => {
              return (
                <h4>
                  {el.stat.name} : {el.base_stat}
                </h4>
              );
            })}
          </div>
          <div className="item">
            <h1>Abilities</h1>
            {pokeData.abilities.map((el) => {
              return <h4>{el.ability.name}</h4>;
            })}
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>error getting pokemon</p>;
  };

  return (
    <div className={"poke"}>
      <h1>{pokemonName}</h1>
      {ShowData()}
    </div>
  );
};

export default Pokemon;
