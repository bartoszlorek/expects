/*
Based on object notation syntax with some rules:
- the expression is always a string value
- white spaces are for readability purposes
- don't use quotation marks
- allow multidimensional data structures
- object property without value gets type of "any"
- array without values gets type of "any"
- "|" and "&" are proper logical operators

Examples of type expressions:
'string'
'string|number'
'[ array|object ]'
'{ name:string, price:number }'
'{ dog, cat:string }' // any dog's type
'{ store:string, products:[ string ] }'
*/

import createCache from './cache.js';
const cache = createCache(20);

const ANY_TYPE = 'any';
const BINARY_OP = {
    '|': 1,
    '&': 2
};

let index,
    charset,
    char;

export default function(expr) {
    if (typeof expr !== 'string') {
        throw 'first parameter must be a string';
    }
    expr = expr.trim();

    let cached = cache(expr);
    if (cached !== false) {
        return cached;
    }
    index = 0;
    charset = expr;
    char = expr[0];

    let result = getValue();
    return cache(expr, result);
}

const getProp = divider(':,}');
const getToken = divider('|&,]}{[');
const getBinaryOp = operator(BINARY_OP);

const getArray = mapper('[]', 'array', map => {
    let val = getValue();
    if (val.value !== ANY_TYPE) {
        if (map.length && map[0].value === ANY_TYPE) {
            map.length = 0;
        }
        map.push(val);
    } else if (!map.length) {
        map.push(val);
    }
    white();
});

const getObject = mapper('{}', 'object', map => {
    let key = getProp();
    if (key === '') {
        return;
    }
    if (char !== ':') {
        map.push(block('value', ANY_TYPE, key));
        return;
    }
    next(':');
    let val = getValue();
    if (val !== '') {
        val.prop = key;
        map.push(val);
    }
    white();
});

const getValue = function() {
    white();
    switch(char) {
        case '[': return getArray();
        case '{': return getObject();
        default : return getBinaryExpression();
    }
}

// implementation of recursive descent by Steve Oney
// from JavaScript Expression Parser (JSEP) http://jsep.from.so/
// MIT license

function getBinaryExpression() {
    let stack, node, left, right, biop, biopInfo, prec, i;

    left = getToken();
    biop = getBinaryOp();

    if (!biop) {
        return block('value', left);
    }
    biopInfo = { value: biop, prec: binaryPrecedence(biop) };
    right = getToken();
    stack = [ left, biopInfo, right ];

    while((biop = getBinaryOp())) {
        prec = binaryPrecedence(biop);
        if (prec === 0) {
            break;
        }
        biopInfo = { value: biop, prec: prec };

        while ((stack.length > 2) && (prec <= stack[stack.length-2].prec)) {
            right = stack.pop();
            biop = stack.pop().value;
            left = stack.pop();
            node = [left, biop, right];
            stack.push(node);
        }
        node = getToken();
        stack.push(biopInfo, node);
    }

    i = stack.length - 1;
    node = stack[i];
    while (i > 1) {
        node = [
            stack[i-2],
            stack[i-1].value,
            node
        ];
        i -= 2;
    }
    return block('value', node);
}

function binaryPrecedence(biop) {
    return BINARY_OP[biop] || 0;
}

/* ---------------------------------------- */

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

// for better performance set
// the chars from frequent to rare
function divider(chars) {
    if (chars.length > 1) {
        chars = chars.split('');
    }
    const test =
            typeof chars !== 'string'
        ? char => chars.indexOf(char) !== -1
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

function operator(chars) {
    let keys = Object.keys(chars);

    return function() {
        if (keys.indexOf(char) !== -1) {
            let op = char;
            next();
            return op;
        }
        return false;
    }    
}

function mapper(tags, type, callback) {
    const oTag = tags[0];
    const cTag = tags[1];

    return function() {
        let map = [];
            
        next(oTag);
        while (char) {
            callback(map);
            if (char === cTag) {
                next(cTag);
                break;
            }
            next(',');
        }
        return block(type, map);
    }
}

function block(type, value, prop) {
    let data = {
        type: type || 'value',
        value: value || ANY_TYPE
    }
    if (typeof prop === 'string') {
        data.prop = prop;
    }
    return data;
}