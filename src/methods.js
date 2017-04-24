import { typeOf } from './types.js';

export default {
    typeof: typeOf,
    define: defineMethod,
    exists: existsMethod,
    fallback: changeFallback,
    filter: filterValue,
    is: testValue
}

const defined = {};
const an = function(text) {
    let isVowel = ['a','o','i','e','u','y']
        .indexOf(text[0]) > -1;
    return (isVowel ? 'an ' : 'a ') + text;
}

function defineMethod(name, test, fallback) {
    if (typeOf(name) !== 'string' || defined.hasOwnProperty(name)) {
        throw 'first parameter must be a unique name, not already defined';
    }
    if (typeOf(test) !== 'function') {
        throw 'second parameter must be a function';
    }
    let shouldBeBoolean = test();
    if (typeOf(shouldBeBoolean) !== 'boolean') {
        throw 'second parameter must return a boolean value';
    }
    defined[name] = {
        test: test.bind(null),
        fallback
    }
    return this;
}

function existsMethod(name) {
    return typeOf(name) === 'string' && defined.hasOwnProperty(name);
}

function validateName(name) {
    if (! existsMethod(name)) {
        throw 'first parameter must be a defined name';
    }
}

function changeFallback(name, value) {
    validateName(name);
    defined[name].fallback = value;
    return this;
}

function testValue(name, value) {
    validateName(name);
    return defined[name].test(value);
}

function filterValue(name, value, ignoreError) {
    validateName(name);
    if (defined[name].test(value)) {
        return value;
    }
    return execFallback(name, value, ignoreError);
}

function execFallback(name, value, ignoreError) {
    let method = defined[name],
        fallback = method && method.fallback;
        
    if (typeOf(fallback) === 'undefined' && !ignoreError) {
        let valueType = typeOf(value);
        throw `\`${value}\` [${valueType}] expects to be ${an(name)}`;
    }
    return fallback;
}