import typeEquality from './typeEquality.js';

/*
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
    typeEquality(expr))*/

typeEquality('[string, [ number ]]', ['dog', [ 100 ]])