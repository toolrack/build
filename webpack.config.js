const path = require('path');
const webpack = require('webpack');
require('dotenv').config({ path: './.env' });

const env = Object.entries(process.env).reduce((acc, v) => {
  if (v[0].match(/^REACT_.*/)) {
    acc[v[0]] = v[1];
  }
  return acc;
}, {NODE_ENV: process.env.NODE_ENV});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(sass|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|jpg|jpeg|png|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  resolveLoader: {
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env)
    }),
  ],
  output: {
    filename: 'bundle.js',
    publicPath: "/",
    path: path.resolve(process.cwd(), 'build'),
  },
};
