/*
Based on object notation syntax with some rules:
- the expression is always a string value
- white spaces are for readability purposes
- don't use quotation marks
- allow multidimensional data structures
- object property without value gets type of "any"
- array without values gets type of "any"

Examples of type expressions:
'string'
'string|number'
'[ array|object ]'
'{ name:string, price:number }'
'{ dog, cat:string }' // any dog's type
'{ store:string, products:[ string ] }'
*/

const ANY_TYPE = 'any';
const cached = {};

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
        chars = chars.split('');
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

const getProp = divider(':,}');
const getString = divider(',]}');

const getArray = mapper('[]', 'array', arr => {
    let val = getValue();
    if (val !== '') {
        if (arr[0] === ANY_TYPE) {
            arr.length = 0;
        }
        arr.push(val);
    } else if (! arr.length) {
        arr.push(ANY_TYPE);
    }
    white();
});

const getObject = mapper('{}', 'object', obj => {
    let key = getProp();
    if (key === '') {
        return;
    }
    if (char !== ':') {
        obj[key] = ANY_TYPE;
        return;
    }
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

export default function(expr) {
    if (typeof expr !== 'string') {
        return false;
    }
    expr = expr.trim();
    if (cached.hasOwnProperty(expr)) {
        return cached[expr];
    }
    if (expr[0] === '[' ||
        expr[0] === '{') {
            index = 0;
            charset = expr;
            char = expr[0];
            
            let result = getValue();
            cached[expr] = result;
            return result;
        }
    return expr;
}