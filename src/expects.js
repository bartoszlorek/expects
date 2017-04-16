/*
expects('string', 'failback')
expects('string|number')
expects('[string]')
expects('[string,number,number]')
expects('{product:string, price:number}')
*/

import parseType from './typeNotation.js';
import compare from './typeCompare.js';

module.exports = function(expr, value) {
    compare(parseType(expr), value);
    return value;
}