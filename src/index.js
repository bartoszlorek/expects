import { typeEquality } from './expects.js';

let defs = [
    'string|number',
    '[ string ]',
    '[ array|object ]',
    '{ name: string, price: number }',
    '[ string, { dog, cat: string|array } ]',
    '{ store:string, products:[] }',
    null
]

defs.forEach(def => typeEquality(def))