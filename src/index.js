import typeEquality from './typeEquality.js';

//typeEquality( '[string, [number]]', ['dog', [100]] )
typeEquality( '[string, { name, price:number }]', ['dog', { name:'Rocky', price:100 }] )