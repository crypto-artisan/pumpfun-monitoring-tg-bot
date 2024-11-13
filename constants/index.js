// constants/index.js
const config = require('./config');
const query = require('./query');
const constant = require('./constant');

module.exports = {
    ...config,
    ...query,
    ...constant
};