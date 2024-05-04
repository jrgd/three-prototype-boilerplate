const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'cheap-module-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader', 
                    {
                                loader: "postcss-loader",
                                options: {
                                  postcssOptions: {
                                    plugins: [
                                      [
                                        "postcss-preset-env",
                                        {
                                          // Options
                                        },
                                      ],
                                    ],
                                  },
                                }},],
            },
            {
              test: /\.scss$/,
              use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
            }, 
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyPlugin({
          patterns: [
            {
              from: "src/assets/",
              to: "assets/",
            },
          ],
        }),
    ],
    devServer: {
        static: './dist',
        hot: true,
    },
};
