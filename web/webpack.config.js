const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const customizeTheme = require('./theme');
const outputBase = path.join(__dirname, '..');
const outputDir = path.join(outputBase, 'www');
const publicDir = path.join(outputBase, 'public');

module.exports = (env, argv) => {
  const theme = customizeTheme(argv.mode);
  return {
    entry: {
      index: 'src/index.js'
    },
    output: {
      path: outputDir,
      filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader"},
            { loader: "less-loader", options: { javascriptEnabled: true, modifyVars: theme }}
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: "style-loader"},
            {loader: "css-loader"}
          ]
        },
        {
          test: /\.html$/,
          use: [
            {loader: "html-loader", options: {minimize: true }}
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        dva: "dva-react-router-3"
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            priority: 10,
            enforce: true,
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor'
          }
        }
      }
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new webpack.ProvidePlugin({
        "_": "lodash",
        "React": "react"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[id].css"
      }),
      new CleanWebpackPlugin([outputDir], { verbose: true, root: outputBase})
    ],
    performance: { hints: false },
    devServer: {
      port: 8080,
      historyApiFallback: true,
      contentBase: [outputDir, publicDir]
    }
  }
};
