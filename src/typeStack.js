let index,
    charset,
    char;

function next(expected) {
    if (expected && expected !== char) {
        let text = charset.slice(0, index);
        throw `Expected "${expected}" instead of "${char}" in "${text}█"`;
    }
    index += 1;
    char = charset.charAt(index);
    return char;
}

function white() {
    while (char && char <= ' ') {
        next();
    }
}

function divider(chars) {
    if (chars.length > 1) {
        chars = chars.split('')
    }
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
        return text;
    }
}

function mapper(tags, type, callback) {
    const openingTag = tags[0];
    const closingTag = tags[1];

    return function() {
        let wrap = type === 'object'
            ? {} : [];
            
        next(openingTag);
        while (char) {
            callback(wrap);
            if (char === closingTag) {
                next(closingTag);
                return wrap;
            }
            next(',');
        }
        return wrap;
    }
}

const getProp = divider(':');
const getString = divider(',]}');

const getArray = mapper('[]', 'array', arr => {
    let val = getValue();
    if (val !== '') {
        arr.push(val);
    }
    white();
});

const getObject = mapper('{}', 'object', obj => {
    let key = getProp();
    next(':');
    let val = getValue();
    if (val !== '') {
        obj[key] = val;
    }
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

export default function(def) {
    if (typeof def !== 'string') {
        return false;
    }
    index = 0;
    charset = def;
    char = def[0];
    return getValue();
}