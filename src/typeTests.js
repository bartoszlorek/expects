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
    'typeof': (value, type) => {
        if (typeof type === 'string') {
            if (types.hasOwnProperty(type)) {
                return types[type](value);
            }
            return false;

        } else {
            let keys = Object.keys(types),
                length = keys.length,
                i = 0;
            while (i < length) {
                if (types[keys[i]](value)) {
                    return keys[i];
                }
                i += 1;
            }
        }
    }
}, types);