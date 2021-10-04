import useSWR from 'swr';

import { getDataFetcher } from '@/utils/pokemonFetcher';

import { GET_LIST_READ_POKEMON_API, ListReadPokemonRes, ListReadPokemonUrlQuery } from '../api';

export default function useListReadPokemon(query: ListReadPokemonUrlQuery) {
  const result = useSWR<ListReadPokemonRes>(GET_LIST_READ_POKEMON_API(query), (url) => getDataFetcher(url));

  return {
    ...result,
    data: result.data?.results,
    totalCount: result.data?.count || 0,
  };
}
