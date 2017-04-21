/*
expects('string', 'failback')
expects('string|number')
expects('[string]')
expects('[string,number,number]')
expects('{product:string, price:number}')
*/

import parseType from './typeNotation.js';
import methods from './methods.js';
import types from './types.js';

// initialize predefined types
for (let name in types) {
    if (types.hasOwnProperty(name)) {
        methods.define(name, types[name]);
    }
}

function expects(value, expr) {
    if (typeof expr !== 'string') {
        throw 'second parameter must be an expression'
    }
    
    let parsed = parseType(expr);
    console.log( parsed );
}

module.exports = Object.assign(
    expects,
    methods
);