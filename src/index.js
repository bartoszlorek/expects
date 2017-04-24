/*
expects('string', 'failback')
expects('string|number')
expects('[string]')
expects('[string,number,number]')
expects('{product:string, price:number}')
*/

import parse from './parse.js';
import methods from './methods.js';

import { forEachType } from './types.js';
import createCompare from './compare.js';
const compare = createCompare(methods);

forEachType((name, test) => {
    methods.define(name, test);
});

function expects(expr, value) {
    if (typeof expr !== 'string') {
        throw 'first parameter must be an expression'
    }
    let parsed = parse(expr),
        result = compare(parsed, value);

    console.log(result);
}

module.exports = Object.assign(
    expects,
    methods
);