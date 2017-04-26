(function() {

    let expr = '[string, { name, price: string|number }]',
        dataA = ['dog', { name: 'Rocky', price: 100 }],
        dataB = ['cat', { name: 'Kitty', price: '150' }];

    dataA = expects(expr, dataA);
    dataB = expects(expr, dataB);

    console.log(expr, dataA, dataB);

    /*expects.define('greaterThan20', value => value > 20, 'fdail');

    console.log( expects.filter( 'greaterThan20', 15 ));
    console.log( expects.filter( 'greaterThan20', 25 ));
    console.log( expects.filter( 'greaterThan20', 35 ));

    console.log( '----' );

    console.log( expects.is( 'greaterThan20', 25 ));
    console.log( expects.is( 'greaterThan20', 25 ));
    console.log( expects.is( 'greaterThan20', 35 ));

    console.log( '----' );

    console.log( expects.exists( 'string' ));
    console.log( expects.exists( 1233 ));*/

}())