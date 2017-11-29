const messages = {
    '0': 'success',
    '100001': 'request params invalid',
    '100002': 'user already exist',
    '100003': 'token invalid',
};

function code(code, data = '', message = '') {
    if (message === '') {
        message = messages[code];
    }

    return { code, data, message }
}

module.exports = code;
