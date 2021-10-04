import Axios from 'axios';

/**
 * 	* Token type: [open api]
 * 	* Security scheme type:	[HTTPS]
 */
export const pokemonAxiosSetting = {
  scheme: 'https',
  host: 'pokeapi.co',
  api: '/api/v2',
  port: '',
  server() {
    return `${this.scheme ? `${this.scheme}:` : ''}//${this.host}${this.port ? `:${this.port}` : ''}${this.api}`;
  },
};

export const pokemonAxios = Axios.create({
  baseURL: pokemonAxiosSetting.server(),
});
