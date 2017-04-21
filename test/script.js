(function() {

    /*let expr = '[string!empty, { name, price:string|number }]',
        arrayA = ['dog', { name:'Rocky', price:100 }],
        arrayB = ['cat', { name:'Kitty', price:'150' }];

    arrayA = expects(arrayA, expr);
    arrayB = expects(arrayB, expr);
    console.log(arrayA, arrayB);*/

    //expects(null, '[string, { name: string & addString, price: string|number }]');

    expects.define('greaterOrEqual', value => value > 20, 20);

    console.log( expects.filter( 'greaterOrEqual', 15 ));
    console.log( expects.filter( 'greaterOrEqual', 25 ));
    console.log( expects.filter( 'greaterOrEqual', 35 ));

}())