var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var env = process.env.NODE_ENV || 'develop'
var config = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    })
  ],
  module: {
    rules: [ // "style-loader!css-loader!less-loader" can only be used with module.loaders;
      {
        test: /\.jsx?/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader",
            {
              loader: 'postcss-loader',
              options: {
                plugins:[
                  autoprefixer({
                    browsers: ['last 2 versions']
                  })
                ]
              }
            },
            "less-loader"]
        })
      }
    ]
  },
};


module.exports = config