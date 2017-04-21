const isArray = Array.isArray || function(value) {
    return isTypeof('Array', value);
}

function isTypeof(name, value) {
    return Object.prototype.toString.call(value) === '[object '+ name +']';
}

function isUndefined(value) {
    return value === undefined;
}

function isNull(value) {
    return value === null;
}

function isNaN(value) {
    return value !== value;
}

function isNumber(value) {
    return !isNaN(value) && isTypeof('Number', value);
}

function isString(value) {
    return isTypeof('String', value);
}

function isObject(value) {
    return value !== null && isTypeof('Object', value) && !isArray(value);
}

function isFunction(value) {
    return typeof value === 'function' || isTypeof('Function', value);
}

function isBoolean(value) {
    return value === true || value === false || isTypeof('Boolean', value);
}

function isRegExp(value) {
    return isTypeof('RegExp', value);
}

export default {
    'string': isString,
    'number': isNumber,
    'boolean': isBoolean,
    'function': isFunction,
    'undefined': isUndefined,
    'object': isObject,
    'array': isArray,
    'null': isNull,
    'regex': isRegExp
}