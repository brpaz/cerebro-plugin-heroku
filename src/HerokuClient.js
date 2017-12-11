
const axios = require('axios');
const cachios = require('cachios');

const HEROKU_API_ENDPONT = 'https://api.heroku.com';

// Cache configurations to include Headers
cachios.getCacheIdentifier = (config) => {
  return {
    method: config.method,
    url: config.url,
    params: config.params,
    data: config.data,
    headers: config.headers,
  };
};

/**
 * Client to connect to Heroku API
 */
class HerokuClient {
  constructor() {
    this.api = cachios.create(axios.create({
      baseURL: HEROKU_API_ENDPONT,
      timeout: 5000,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
      }
    }), {
      stdTTL: 300, // 5 minutes
      checkperiod: 60
    });
  }

  /**
   * Sets the Access token required to do API requests.
   * @param {string} accessToken The access token for acessing to Heroku API
   */
  setAccessToken(accessToken) {
    this.api.axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  /**
   * Returns a list of apps from the configured Heroku account.
   * @returns {Promise}
   */
  async getApps() {

    try {
      const response = await this.api.get('/apps');

      return response.data;

    } catch (err) {
      return this.handleErrors(err);
    }
  }

  /**
   * Handles API errors
   * @param {object} error
   */
  handleErrors(error) {

    console.error(error.response);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('401 Unauthorized - Please check your Heroku access token is correctly configured in Plugin settings');
        case 429:
          throw new Error('Rate Limit Excedeed. Please wait until doing more requests to Heroku');
        default:
          throw new Error(`Error fetching information from Heroku. Heroku responded with: ${error.status} - ${error.statusText}`);
      }
    }

    throw new Error('An error ocurred with your request. Please try again later');
  }
}

module.exports = HerokuClient;
