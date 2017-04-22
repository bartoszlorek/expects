/*
expects('string', 'failback')
expects('string|number')
expects('[string]')
expects('[string,number,number]')
expects('{product:string, price:number}')
*/

import parseType from './typeNotation.js';
import methods from './methods.js';
import { forEachType } from './types.js';

forEachType((name, test) => {
    methods.define(name, test);
});

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