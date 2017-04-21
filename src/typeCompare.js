import TYPES from './types.js';

function errorType(type, value, context) {
    const valueType = TYPES.typeof(value);
    const a = text => (['a','o'].indexOf(text[0]) > -1
        ? 'an ' : 'a ') + text;

    if (TYPES.object(value)) {
        value = '{'+ Object.keys(value).join(',') +'}';

    } else if (TYPES.string(context)) {
        value = context.replace('*', value);
    }
    return `\`${value}\` expects to be ${a(type)} instead of ${a(valueType)}.`;
}

function checkType(type, value) {
    const valueType = TYPES.typeof(value);

    if (type.indexOf('|') > -1) {
        let alternative = type.split('|'),
            length = alternative.length,
            i = 0;
        while (i < length) {
            if (alternative[i] === valueType) {
                return true;
            }
            i += 1;
        }
    }
    return valueType === type;
}

function compare(type, value, context) {
    let result;

    console.log(type, value)

    if (! type) {
        return 'success';
    }
    if (TYPES.string(type)) {
        if (! checkType(type, value)) {
            return errorType(type, value, context);
        }
    }

    else if (TYPES.array(type)) {
        if (! checkType('array', value)) {
            return errorType('array', value, context);
        }
        if (!type.length) {
            return 'success';
        }
        let valueLength = value.length,
            i = 0;

        if (type.length > 1) {
            let last = type.length-1;
            while (i < valueLength) {
                result = compare(type[i] || type[last], value[i], '[*]');
                if (result !== 'success') {
                    return result;
                }
                i += 1;
            }
        } else {
            let monoType = type[0];
            if (monoType === 'any') {
                return 'success';
            }
            while (i < valueLength) {
                result = compare(monoType, value[i], '[*]');
                if (result !== 'success') {
                    return result;
                }
                i += 1;
            }
        }
    }
    
    else if (TYPES.object(type)) {
        if (! checkType('object', value)) {
            return errorType('object', value, context);
        }
        let keys = Object.keys(type),
            typeLength = keys.length,
            typeKey,
            i = 0;

        if (typeLength === 0) {
            return 'success';
        }
        while (i < typeLength) {
            typeKey = keys[i];
            if (! value.hasOwnProperty(typeKey)) {
                return `given object doesn't have \`${typeKey}\` property.`;
            }
            if (type[typeKey] !== 'any') {
                result = compare(type[typeKey], value[typeKey], `{${typeKey}:*}`);
                if (result !== 'success') {
                    return result;
                }
            }
            i += 1;
        }
    }
    
    return 'success';
}

export default compare;