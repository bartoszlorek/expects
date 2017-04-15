function isTypeOf(name) {
    return value => typeof value === name;
}
function isNull(value) {
    return value === null;
}
function isObject(value) {
    return value !== null && typeof value === 'object' && !isArray(value);
}
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

const types = {
    'string': isTypeOf('string'),
    'number': isTypeOf('number'),
    'boolean': isTypeOf('boolean'),
    'function': isTypeOf('function'),
    'object': isObject,
    'array': isArray,
    'null': isNull
}
export default Object.assign({
    'any': () => true,
    'typeof': (value) => {
        let key = Object.keys(types),
            len = key.length,
            i = 0;
        while (i < len) {
            if (types[key[i]](value)) {
                return key[i];
            }
            i += 1;
        }
    }
}, types);