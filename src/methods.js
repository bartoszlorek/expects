import types, { typeOf } from './types.js';
import error from './error.js';

export default {
    typeof: typeOf,
    define: defineMethod,
    exists: existsMethod,
    fallback: handleFallback,
    filter: filterValue,
    is: testValue
}

const defined = {};

function existsMethod(name) {
    return types.isString(name)
        && defined.hasOwnProperty(name);
}

function defineMethod(name, test, fallback) {
    if ( existsMethod(name)) {
        error('unique');
    }
    if (!types.isFunction(test)) {
        error('func');
    }
    let shouldBeBoolean = test();
    if (!types.isBoolean(shouldBeBoolean)) {
        error('bool');
    }
    defined[name] = {
        test: test.bind(null),
        fallback
    }
    return this;
}

function validateName(name, ignoreError) {
    let exists = existsMethod(name);
    if (exists || ignoreError) {
        return exists;
    } error('name');
}

function handleFallback(name, value) {
    validateName(name);
    if (types.isUndefined(value)) {
        return defined[name].fallback;
    }
    defined[name].fallback = value;
    return this;
}

function testValue(name, value) {
    if (validateName(name, true)) {
        return defined[name].test(value);
    } return false;
}

function filterValue(name, value) {
    validateName(name);
    let method = defined[name];
    if (method.test(value)) {
        return value;
    } else {
        let fallback = method.fallback;
        if (types.isUndefined(fallback)) {
            error('expects')(name, value);
        } return fallback;
    }
}