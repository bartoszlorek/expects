import { typeOf } from './types.js';

export default {
    typeof: typeOf,
    define: defineMethod,
    filter: filterOut,
    fallback: changeFallback,
    is: isMethod
}

const defined = {};
const an = function(text) {
    let isVowel = ['a','o','i','e','u','y'].indexOf(text[0]) > -1;
    return (isVowel ? 'an ' : 'a ') + text;
}

function validate(name, value) {
    if (typeof name !== 'string') {
        throw 'first parameter must be a defined name';
    }
    return typeof value !== 'undefined'
        && defined.hasOwnProperty(name);
}

function defineMethod(name, test, fallback) {
    if (typeof name !== 'string' || defined.hasOwnProperty(name)) {
        throw 'first parameter must be a unique name, not already defined';
    }
    if (typeof test !== 'function') {
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

function filterOut(name, value) {
    if (!validate(name, value)) {
        return;
    }
    let def = defined[name];
    if (def.test(value)) {
        return value;
    }
    if (typeof def.fallback === 'undefined') {
        let valueType = typeOf(value);
        throw `\`${value}\` [${valueType}] expects to be ${an(name)}`;
    }
    return def.fallback;
}

function isMethod(name, value) {
    if ( validate(name, value)) {
        return defined[name].test(value);
    }
    return false;
}

function changeFallback(name, value) {
    if (validate(name, value)) {
        defined[name].fallback = value;
    }
    return this;
}