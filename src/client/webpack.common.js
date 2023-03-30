const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        moon: './src/client/spheres/earth-moon-simple.ts',
        common: './src/client/common.ts',
        trees : './src/client/trees-with-faces.ts'
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
    plugins: [
        new Dotenv,
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
}
