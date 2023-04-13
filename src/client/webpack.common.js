const path = require('path')
const webpack = require('webpack'); // only add this if you don't have yet
require('dotenv').config({path: '../.env'});

module.exports = {
    entry: {
        moon: './src/client/spheres/earth-moon-simple.ts',
        simple: './src/client/simple.ts',
        trees: './src/client/trees-with-faces.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        // }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ]
}
