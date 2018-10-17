const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("bundle.css"),
    //new webpack.HotModuleReplacementPlugin()
  ],
  "devServer": {
    "contentBase": "./",
    open: true,
    //hot: true,
    //inline: true,
    publicPath: path.resolve(__dirname, '/dist/'),
  },
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      },
      {
        test:/\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test:/\.scss.dev$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          //presets: ['es2015'],
          //presets: ['env'],

          presets: [
            ["env", {
              "targets": {
                "browsers": [
                  "last 2 versions",
                  //"safari >= 7",
                  "ie >= 10"
                ],

              },
              "debug": false,
              "include": ["es6.array.from"],
            }]
          ],

          //presets: ['@babel/preset-env'],

        },
        exclude: [/node_modules\/hls/],
        //include: [/node_modules\/MY_MODULE/]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      }
    ],

  },
};
