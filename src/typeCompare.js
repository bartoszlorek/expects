import TYPES from './types.js';

const a = function(text) {
    let an = ['a','o'].indexOf(text[0]) > -1;
    return (an ? 'an ' : 'a ') + text;
}

function checkType(type, value, context) {
    let valueType = TYPES.typeof(value),
        passError = true;

    if (type.indexOf('|') > -1) {
        let alternative = type.split('|'),
            length = alternative.length,
            i = 0;
        while (i < length) {
            if (alternative[i] === valueType) {
                passError = false;
                break;
            }
            i += 1;
        }
    }
    if (valueType !== type && passError) {
        if (TYPES.object(value)) {
            value = '{'+ Object.keys(value).join(',') +'}';
        }
        else if (TYPES.string(context)) {
            value = context.replace('*', value);
        }
        throw `\`${value}\` expects to be ${a(type)} instead of ${a(valueType)}.`;
    }
}

function compare(type, value, context) {
    if (! type) {
        return;
    }
    if (TYPES.string(type)) {
        checkType(type, value, context);
        return;
    }

    if (TYPES.array(type)) {
        checkType('array', value, context);

        if (!type.length) {
            return;
        }
        let valueLength = value.length,
            i = 0;

        if (type.length > 1) {
            let last = type.length-1;
            while (i < valueLength) {
                compare(type[i] || type[last], value[i], '[*]');
                i += 1;
            }
        } else {
            let monoType = type[0];
            if (monoType === 'any') {
                return;
            }
            while (i < valueLength) {
                compare(monoType, value[i], '[*]');
                i += 1;
            }
        }  
        return;
    }
    
    if (TYPES.object(type)) {
        checkType('object', value, context);

        let keys = Object.keys(type),
            typeLength = keys.length,
            typeKey,
            i = 0;

        if (typeLength === 0) {
            return;
        }
        while (i < typeLength) {
            typeKey = keys[i];
            if (! value.hasOwnProperty(typeKey)) {
                throw `given object doesn't have \`${typeKey}\` property.`;
            }
            if (type[typeKey] !== 'any') {
                compare(type[typeKey], value[typeKey], `{${typeKey}:*}`);
            }
            i += 1;
        }
    }
}

export default compare;