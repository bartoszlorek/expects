import typeEquality from './typeEquality.js';

let expr = '[string, { name, price:number }]';
typeEquality(expr, ['dog', { name:'Rocky', price:100 }] )
typeEquality(expr, ['cat', { name:'Kitty', price:150 }] )