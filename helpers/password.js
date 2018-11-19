const crypto = require('crypto');
const {hashAlgorithm, salt} = require('../config');

function createHash(pass) {
    const hash = crypto.createHmac(hashAlgorithm, salt);
    hash.update(pass);
    return hash.digest('hex');
}

module.exports = createHash;