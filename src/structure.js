let index,
    charset,
    char;

function next() {
    index += 1;
    char = charset.charAt(index);
    return char;
}

function white() {
    while (char && char <= ' ') {
        next();
    }
}

function until(chars) {
    const test =
            typeof chars !== 'string'
        ? char => chars.indexOf(char) > -1
        : char => chars === char;

    return function() {
        let text = '';
        while (char) {
            if (char !== ' ') {
                if (test(char)) {
                    return text;
                }
                text += char;
            }
            next();
        }
    }
}

function mapper(chars, type, callback) {
    const openChar = chars[0];
    const closeChar = chars[1];

    return function() {
        let wrap = type === 'object'
            ? {} : [];
        next(); // skip open char
        while (char) {
            callback(wrap);
            if (char === closeChar) {
                next(); // close
                return wrap;
            }
            next(); // separator
        }
        return wrap;
    }
}

const getProp = until(':');
const getString = until([',',']','}']);

const getArray = mapper('[]', 'array', arr => {
    arr.push(getValue());
    white();
});
const getObject = mapper('{}', 'object', obj => {
    let key = getProp();
    next(); // separator
    obj[key] = getValue();
    white();
});

const getValue = function() {
    white();
    switch(char) {
        case '[':
            return getArray();
        case '{':
            return getObject();
        default:
            return getString();
    }
}

export default function(query) {
    index = 0;
    charset = query;
    char = query[0];
    return getValue();
}