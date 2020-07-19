//разрешение пути
const path = require('path');
//css minimize
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//html 
const HtmlWebpackPlugin = require('html-webpack-plugin');
//хэширование
const WebpackMd5Hash = require('webpack-md5-hash');
//режим сборки
const webpack = require('webpack');

//
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
    //точка входа, и выхода
    entry: {main: './src/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: 
        [{
            test: /\.js$/,
            use: {loader: 'babel-loader', options: {
                plugins: ['transform-class-properties']
              }},
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            //use:  [(isDev ? 'style-loader': MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
            use:  [(isDev ? 'style-loader': MiniCssExtractPlugin.loader), {loader:'css-loader', options: {importLoaders: 2}}, 'postcss-loader']
        },
        {
            test: /\.(gif|png|jpe?g|jpg|svg|ico)$/i,
            use: [
              'file-loader?name=./images/[name].[ext]',
              {
                loader: 'image-webpack-loader',
                options: {}
              },
            ],
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        }]
    },

    plugins: [ 
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
        ]
}