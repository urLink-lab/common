import { pokemonAxios } from '@/modules/client/pokemon';

export async function getDataFetcher(url: string) {
  return pokemonAxios.get(url).then((response) => response.data);
}
