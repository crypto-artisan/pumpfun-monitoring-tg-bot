const dotenv = require('dotenv');

dotenv.config();

function retrieveEnvVariable(variableName) {
    const variable = process.env[variableName] || '';
    if (!variable) {
        console.log(`${variableName} is not set`);
        process.exit(1);
    }
    return variable;
};

module.exports = { retrieveEnvVariable }