
const { retrieveEnvVariable } = require('../utils/utils')

const TELEGRAM_TOKEN = retrieveEnvVariable('TELEGRAM_TOKEN');
const CHANNEL_ID = retrieveEnvVariable('CHANNEL_ID');

const BITQUERY_API_KEY = retrieveEnvVariable('BITQUERY_API_KEY');
const BITQUERY_AUTH_TOKEN = retrieveEnvVariable('BITQUERY_AUTH_TOKEN');
const POLLING_TIME = retrieveEnvVariable('POLLING_TIME');

const MODE = retrieveEnvVariable('MODE');

const QUERY_BASE_URL = 'https://streaming.bitquery.io/eap';
const HEADERS = {
    'Content-Type': 'application/json',
    'X-API-KEY': BITQUERY_API_KEY,
    'Authorization': BITQUERY_AUTH_TOKEN,
};

module.exports = { TELEGRAM_TOKEN, CHANNEL_ID, BITQUERY_API_KEY, BITQUERY_AUTH_TOKEN, POLLING_TIME, MODE, QUERY_BASE_URL, HEADERS }