const path = require('path')
const dev = process.env.NODE_ENV == "development"
const liveServer = require("live-server")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')

if(dev){
    liveServer.start({
        root: "./",
        file: "index.html"
    })
}

// mode no lo tengo que declarar porque le llega solo cuando declaro la variable NODE_ENV
module.exports = {
    watch: dev,
    entry: "./fe-src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                use: {
                    loader: "file-loader",
                    options: {}
                }

            },
            {
                test: /\.css$/i,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts','.js']
    },
    output: {
        path : path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
}