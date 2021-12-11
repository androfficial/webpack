const webpack = require('webpack');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (folder, hash = '[fullhash]', ext = '[ext]') =>
  isDev ? `${folder}/[name].${ext}` : `${folder}/[name].${hash}.${ext}`;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  };

  if (isProd) {
    config.minimize = true;
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      filename: path.resolve(__dirname, 'build/index.html'),
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.svg'),
      inject: 'body',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: filename('css', undefined, 'css'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ];
  if (isDev) {
    base.push(
      new ReactRefreshWebpackPlugin(),
      new StyleLintPlugin({
        configFile: path.resolve(__dirname, '.stylelintrc.json'),
        context: path.resolve(__dirname, 'src/styles'),
        files: '**/*.s?(a|c)ss',
      }),
      new ESLintPlugin({
        context: path.resolve(__dirname, 'src'),
        files: '**/*.{js,jsx}',
        emitWarning: true,
      })
    );
  }
  return base;
};

const babelOptions = (preset) => {
  const opts = {
    presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3.19 }]],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      isDev && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
  },
  output: {
    filename: filename('js', undefined, 'js'),
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss'],
  },
  optimization: optimization(),
  devServer: {
    client: {
      overlay: true,
    },
    port: 3000,
    open: true,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              removeCR: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: filename('images', '[hash]'),
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: filename('fonts', '[hash]'),
        },
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
    ],
  },
};
