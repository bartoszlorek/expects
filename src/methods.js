import { typeOf } from './types.js';
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

function defineMethod(name, test, fallback) {
    if (typeof name !== 'string' ||
        defined.hasOwnProperty(name)) {
            error('unique');
        }
    if (typeof test !== 'function') {
        error('func');
    }
    let beBoolean = test();
    if (typeof beBoolean !== 'boolean') {
        error('bool');
    }
    defined[name] = {
        test: test.bind(null),
        fallback
    }
    return this;
}

function existsMethod(name) {
    return typeof name === 'string' &&
        defined.hasOwnProperty(name);
}

function validateName(name, ignoreError) {
    let exists = existsMethod(name);
    if (exists || ignoreError) {
        return exists;
    } error('name');
}

function handleFallback(name, value) {
    validateName(name);
    if (typeof value === 'undefined') {
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
        if (typeof fallback === 'undefined') {
            error('expects')(name, value);
        } return fallback;
    }
}