(function() {

    /*let expr = '[string!empty, { name, price:string|number }]',
        arrayA = ['dog', { name:'Rocky', price:100 }],
        arrayB = ['cat', { name:'Kitty', price:'150' }];

    arrayA = expects(arrayA, expr);
    arrayB = expects(arrayB, expr);
    console.log(arrayA, arrayB);*/

    //expects(null, '[string, { name: string & addString, price: string|number }]');


    expects.define('greaterThan20', value => value > 20, 'fail');

    console.log( expects.filter( 'greaterThan20', 15 ));
    console.log( expects.filter( 'greaterThan20', 25 ));
    console.log( expects.filter( 'greaterThan20', 35 ));

    console.log( expects.is( 'greaterThan20', 15 ));
    console.log( expects.is( 'greaterThan20', 25 ));
    console.log( expects.is( 'greaterThan20', 35 ));

}())