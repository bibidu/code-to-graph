const path = require('path')
const MyPlugin = require('../src/index')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'nu.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@utils': resolve('util'),
      '@util/util': resolve('util'),
      '@util/axios': resolve('util'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": {
                  "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                },
              }],
              '@babel/preset-react',
            ],
            plugins: [
              ["@babel/plugin-transform-runtime"],
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ['@babel/plugin-proposal-class-properties'],
              MyPlugin(),
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}