const path = require('path')

module.exports = {
    entry: {
        moon: './src/client/spheres/earth-moon-simple.ts',
        common: './src/client/common.ts',
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
}
