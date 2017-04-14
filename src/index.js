import parseDefs from './typeDefine.js';

let defs = [
    'string|number',
    '[ string|number ]',
    '[ string ]',
    '{ name:string, price:number }',
    null
]

defs.forEach(def => console.log( parseDefs(def) ))