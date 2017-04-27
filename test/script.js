(function() {

    let expr = '[string, { name, price: string|number }]',
        dataA = ['dog', { name: 'Rocky', price: 100 }],
        dataB = ['cat', { name: 'Kitty', price: '150' }];

    console.log(expr);
    
    dataA = expects(expr, dataA);
    dataB = expects(expr, dataB);

    console.log(dataA);
    console.log(dataB);

}())