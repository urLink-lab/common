import Axios from 'axios';

const envMode = process.env.NODE_ENV;

/**
 * 	* Token type: []
 * 	* Security scheme type:	[HTTP / HTTPS]
 */
export const axiosSetting = {
  scheme: envMode === 'production' ? window.location.protocol.replace(':', '') : process.env.REACT_APP_SCHEME,
  host: envMode === 'production' ? window.location.host : process.env.REACT_APP_HOST,
  api: process.env.REACT_APP_API,
  port: envMode === 'production' ? '' : process.env.REACT_APP_PORT,
  server() {
    return `${this.scheme ? `${this.scheme}:` : ''}//${this.host}${this.port ? `:${this.port}` : ''}${this.api}`;
  },
};

export const axios = Axios.create({
  baseURL: axiosSetting.server(),
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // const accessToken = getAccessToken();
    const accessToken = '';
    let { headers } = config;
    if (accessToken)
      headers = {
        ...config.headers,
        Authorization: `${process.env.REACT_APP_SERVER_TOKEN} ${accessToken}`,
      };
    return { ...config, headers };
  },
  (error) => {
    return Promise.reject(error);
  },
);
