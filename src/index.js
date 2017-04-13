import getStructure from './structure.js';

let query1 = '[ string, [string|number] ]',
    query2 = '{ name:string, price:{ dog:string|number} }';

console.log( getStructure(query1) )
console.log( getStructure(query2) )