const baseUrl = 'https://pokeapi.co/api/v2';

export const urlConfig = Object.freeze({
  pokemonType: (searchParam: string) => `${baseUrl}/type/${searchParam}`,
  allPokemonsTypes: `${baseUrl}/type/`,
});
