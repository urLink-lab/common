import { pokemonAxios } from '@/modules/client/pokemon';

import { Pokemon } from '../@types';

/**
 * * 포켓몬 목록 조회 POST
 * * url: /pokemon?offset=:offset&limit=:limit
 * * body: ListReadPokemonUrlQuery
 * * res: ListReadPokemonRes
 */
export type ListReadPokemonUrlQuery = {
  offset: number;
  limit: number;
};
export interface ListReadPokemonRes extends PokemonListReadCommonRes {
  results: Pokemon[];
}
export function GET_LIST_READ_POKEMON_API(url: ListReadPokemonUrlQuery) {
  return `/pokemon?offset=${url.offset}&limit=${url.limit}`;
}
export const requestEditBoard = (url: ListReadPokemonUrlQuery) => {
  return pokemonAxios.get<ListReadPokemonRes>(GET_LIST_READ_POKEMON_API(url));
};
