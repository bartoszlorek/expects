(function() {

    let expr = '[string, { name, price:string|number }]',
        arrayA = expects(expr, ['dog', { name:'Rocky', price:100 }] ),
        arrayB = expects(expr, ['cat', { name:'Kitty', price:'150' }] );

    console.log(arrayA, arrayB);

}())