const { createHmac } = require('crypto');
const crypto = require('crypto');

const getSecureRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getToken = () => crypto.randomBytes(32).toString('hex');

const getHmac = (str, key) => {
    const hmac = createHmac('sha256', key);
    hmac.update(str);

    return hmac.digest('hex');
}

module.exports = {
    getHmac,
    getToken,
    getSecureRandom,
};