import TYPES from './typeTests.js';
import parseType from './typeNotation.js';

const a = function(text) {
    let an = ['a','o'].indexOf(text[0]) > -1;
    return (an ? 'an ' : 'a ') + text;
}

function error(type, value) {
    let wrong = TYPES.typeof(value);
    throw `\`${value}\` expects to be ${a(type)} instead of ${a(wrong)}.`;
}

function typeOf(type, value) {
    // alternatives go here

    if (! TYPES.typeof(value, type)) {
        error(type, value);
    }
}

function compare(type, value) {
    if (! type) {
        return;
    }
    if (TYPES.string(type)) {
        typeOf(type, value);
        return;
    }

    if (TYPES.array(type)) {
        typeOf('array', value);

        if (!type.length) {
            return;
        }
        let valueLength = value.length,
            i = 0;

        if (type.length > 1) {
            let last = type.length-1;
            while (i < valueLength) {
                compare(type[i] || type[last], value[i]);
                i += 1;
            }
        } else {
            let monoType = type[0];
            if (monoType === 'any') {
                return;
            }
            while (i < valueLength) {
                compare(monoType, value[i]);
                i += 1;
            }
        }  
        return;
    }
    
    if (TYPES.object(type)) {
        typeOf('object', value);

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
                compare(type[typeKey], value[typeKey]);
            }
            i += 1;
        }
    }
}

export default function(expr, value) {
    compare(parseType(expr), value);
    console.log('done');
}