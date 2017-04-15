import TYPES from './typeTests.js';
import parseType from './typeNotation.js';

function error(type, value) {
    let a = type[0] === 'a' || type[0] === 'o' ? 'an' : 'a',
        wrong = TYPES.typeof(value);
        
    throw `"${value}" expects to be ${a} ${type} instead of ${wrong}`;
}

function typeOf(type, value) {
    if (! TYPES.hasOwnProperty(type)) {
        return true;
    }
    // alternatives go here

    if (! TYPES[type](value)) {
        error(type, value);
    }
    return true;
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
            while (i < valueLength) {
                compare(monoType, value[i]);
                i += 1;
            }
        }  
        return;
    }
    
    if (TYPES.object(type)) {
        console.log('obj')
    }
}

export default function(expr, value) {
    compare(parseType(expr), value);

    console.log('done');
}