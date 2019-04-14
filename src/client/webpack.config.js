const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/client')
  },
  resolve: { 
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'

        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' })
  ]
};