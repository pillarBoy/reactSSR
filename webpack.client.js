const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')


// 服务端webpack
module.exports = {
  mode: 'development',
  entry: './client/index.js',
  // 客户端输出
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.csr.html',
      template: path.resolve(__dirname, './src/index.csr.html'),
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // 才能支持import, jsx
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env']]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
          }
        }]
      }
    ]
  }
}