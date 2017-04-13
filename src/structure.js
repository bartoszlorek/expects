

let index,
    charset,
    char,

    next = function() {
        index += 1;
        char = charset.charAt(index);
        return char;
    },

    white = function() {
        while (char && char <= ' ') {
            next();
        }
    },

    until = function(chars) {
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
    },

    mapper = function(chars, type, callback) {
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
    },

    getProp = until(':'),
    getString = until([',',']','}']),
    getArray = mapper('[]', 'array', arr => {
        arr.push(getValue());
        white();
    }),
    getObject = mapper('{}', 'object', obj => {
        let key = getProp();
        next(); // separator
        obj[key] = getValue();
        white();
    }),

    getValue = function() {
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