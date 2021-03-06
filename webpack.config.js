var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'expects.min.js',
        library: 'expects',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}