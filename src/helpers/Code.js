const messages = {
    '0': 'success',
    '100001': 'request params invalid',
    '100002': 'user already exist',
    '100003': 'token invalid',
    '100004': 'have no right',
    '100005': 'resource not exist',
    '100006': 'server error',
};

function code(code, data = '', message = '') {
    if (message === '') {
        message = messages[code];
    }

    return { code, data, message };
}

module.exports = code;
