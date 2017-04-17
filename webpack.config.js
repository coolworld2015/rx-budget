var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    //entry: './app/redux.js',
    //entry: './app/redux-router.js',
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './build',
        port: 8000
    },
    resolve: {
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]'
            },
			{	
				test: /\.(jp?g|png|gif|svg)$/i, 
				loader: 'file-loader?name=[name].[ext]'
			}
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};
