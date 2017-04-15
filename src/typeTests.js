function isTypeOf(name) {
    return value => typeof value === name;
}

function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

function isObject(value) {
    return value !== null && typeof value === 'object' && !isArray(value);
}

let isString = isTypeOf('string'),
    isNumber = isTypeOf('number'),
    isBoolean = isTypeOf('boolean'),
    isFunction = isTypeOf('function'),
    isNull = value => value === null;

export default {
    'any': () => true,
    'string': isString,
    'number': isNumber,
    'boolean': isBoolean,
    'object': isObject,
    'array': isArray,
    'function': isFunction,
    'null': isNull
}