const messages = {
    '0': 'success',
    '100001': 'request params invalid',
};

function code(code, data = '', message = '') {
    if (message === '') {
        message = messages[code];
    }

    return { code, data, message }
}

module.exports = code;
