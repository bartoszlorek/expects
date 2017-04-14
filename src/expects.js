/*
expects('string', 'failback')
expects('string|number')
expects('[string]')
expects('[string,number,number]')
expects('{product:string, price:number}')
*/


//throw new Error('fname expects first parameter as a string');

import parseType from './typeDefinition.js';
import typeTest from './typeTests.js';

export function typeEquality(def, value) {
    let type = parseType(def);

    console.log(type)
}