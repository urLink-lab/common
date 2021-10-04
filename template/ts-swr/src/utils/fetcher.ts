import { axios } from '@/modules/client';

export async function getDataFetcher(url: string) {
  return axios.get(url).then((response) => response.data);
}
