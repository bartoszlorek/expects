import { typeEquality } from './expects.js';

[
    'string|number',
    '[ string ]',
    '[ array|object ]',
    '{ name: string, price: number }',
    '[ string, { dog, cat: string|array } ]',
    '{ store:string, products:[] }',
    null
]
.forEach(expr =>
    typeEquality(expr))