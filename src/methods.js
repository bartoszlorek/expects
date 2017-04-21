const defined = {};

function assign(method, defaultValue) {
    return {
        filter: value => method(value) === true ? value : defaultValue,
        method: method.bind(null)
    }
}

function define(name, method, defaultValue) {
    if (typeof name !== 'string' || defined.hasOwnProperty(name)) {
        throw 'first parameter must be a unique name, not already defined';
    }
    if (typeof method !== 'function') {
        throw 'second parameter must be a function'; 
    }
    defined[name] = assign(method, defaultValue);
    return this;
}

function validate(method) {
    return (name, value) => {
        if (typeof name !== 'string') {
            throw 'first parameter must be a defined name';
        }
        if (typeof value === 'undefined' || !defined.hasOwnProperty(name)) {
            return false;
        }
        return defined[name][method](value);
    }
}

export default {
    define,
    filter: validate('filter'),
    is: validate('method')
}