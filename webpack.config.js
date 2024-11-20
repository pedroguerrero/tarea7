'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/main.js',
    home: './src/js/home.js',
    'equipo-medico': './src/js/equipo-medico.js',
    contacto: './src/js/contacto.js',
    citasPacientes: './src/js/citas-pacientes.js',
  },
  output: {
    filename: 'assets/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main', 'home'],
    }),
    new HtmlWebpackPlugin({
      filename: 'contacto.html',
      template: './src/contacto.html',
      chunks: ['main', 'contacto'],
    }),
    new HtmlWebpackPlugin({
      filename: 'equipo-medico.html',
      template: './src/equipo-medico.html',
      chunks: ['main', 'equipo-medico'],
    }),
    new HtmlWebpackPlugin({
      filename: 'citas-pacientes.html',
      template: './src/citas-pacientes.html',
      chunks: ['main', 'citasPacientes'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/img', to: 'img' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
