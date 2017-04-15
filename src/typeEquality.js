import TYPES from './typeTests.js';
import parseType from './typeNotation.js';

function error(type, value) {
    let a = type[0] === 'a' || type[0] === 'o' ? 'an' : 'a';
    throw `"${value}" expects to be ${a} ${type}`;
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

function comparison(type, value) {
    function walker(source, target) {

        if (TYPES.string(source)) {
            typeOf(source, target);
            return;
        }

        if (TYPES.array(source)) {
            typeOf('array', target);
            
            if (!source.length) {
                return;
            }
            let len = target.length;
            if (source.length > 1) {
                let last = source.length-1;
                for (let i=0; i<len; i++) {
                    walker(source[i] || source[last], target[i]);
                }
            } else {
                let src = source[0];
                for (let i=0; i<len; i++) {
                    walker(src, target[i]);
                }
            }  
            return;
        }
        
        if (TYPES.object(source)) {
            console.log('obj')
        }
    }

    walker(type, value);
    console.log('good!')
}

export default function(expr, value) {
    let type = parseType(expr);
    comparison(type, value);
}