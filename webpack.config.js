const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

//* убираем хеш есть это build *//
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]

  if (isDev) {
    loaders.push('@babel/eslint-parser')
  }

  return loaders
}

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 4200,
    hot: isDev,
    open: true
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    // вынос всего кода css в отдельный файл
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/favicon.ico')
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@':path.resolve(__dirname, 'src'),
      '@Core':path.resolve(__dirname, 'src/core'),
    }
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?(js|ts)$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ],
  },
  // сжатие css js
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({}),
      new TerserPlugin({})
    ]
  },
}