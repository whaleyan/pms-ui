const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const os = require('os');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: 'dist/', // 修改 https://iv...admin 这部分为你的服务器域名
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendors',
            // filename: 'vendors.[hash].js'
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            // 使用外部引入的新版本的js压缩工具
            parallel: true,
            uglifyOptions: {
                ie8: false,
                ecma: 6,
                warnings: false,
                mangle: true,
                // debug false
                output: {
                    comments: false,
                    beautify: false,
                    // debug true
                },
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console:true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars:true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars:true,
                }
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new UglifyJsParallelPlugin({
        //     workers: os.cpus().length,
        //     mangle: true,
        //     compressor: {
        //       warnings: false,
        //       drop_console: true,
        //       drop_debugger: true
        //      }
        // }),
        new CopyWebpackPlugin([{
                from: 'td_icon.ico'
            },
            {
                from: 'src/styles/fonts',
                to: 'fonts'
            },
            // {
            //     from: 'src/views/main-components/theme-switch/theme'
            // },
            // {
            //     from: 'src/views/my-components/text-editor/tinymce'
            // }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            favicon: './td_icon.ico',
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ]
});