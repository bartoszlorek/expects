export {
    forEachType,
    typeOf
}

const types = {
    'string': isString,
    'number': isNumber,
    'nan': isNaN,
    'boolean': isBoolean,
    'function': isFunction,
    'undefined': isUndefined,
    'object': isObject,
    'array': isArray,
    'null': isNull,
    'regex': isRegExp,
    'date': isDate
}

function forEachType(callback) {
    let key = Object.keys(types),
        len = key.length,
        result,
        i = 0;
        
    while (i < len) {
        result = callback(key[i], types[key[i]]);
        if (result === false) {
            return;
        }
        if (!isUndefined(result)) {
            return result;
        }
        i += 1;
    }
}

function typeOf(value) {
    return forEachType((name, test) => {
        if (test(value)) {
            return name;
        }
    });
}

function isTypeofProto(name, value) {
    return Object.prototype.toString.call(value) === '[object '+ name +']';
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

function isNull(value) {
    return value === null;
}

function isNaN(value) {
    return value !== value;
}

function isNumber(value) {
    return !isNaN(value) && isTypeofProto('Number', value);
}

function isString(value) {
    return isTypeofProto('String', value);
}

function isRegExp(value) {
    return isTypeofProto('RegExp', value);
}

function isDate(value) {
    return isTypeofProto('Date', value);
}

function isBoolean(value) {
    return value === true || value === false || isTypeofProto('Boolean', value);
}

function isObject(value) {
    return value !== null && isTypeofProto('Object', value) && !isArray(value);
}

function isArray(value) {
    return isTypeofProto('Array', value);
}

function isFunction(value) {
    return typeof value === 'function' || isTypeofProto('Function', value);
}