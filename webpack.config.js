const ContainerReferencePlugin = require('webpack/lib/container/ContainerReferencePlugin');

const ReactRouterHtmlPlugin = require('./webpack/ReactRouterHtmlPlugin');

const routes = require('./src/routes.js').map((route) => route.path);

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,
  entry: './src/index',
  output: {
    publicPath: '/',
  },
  devtool: 'source-map',
  optimization: {
    minimize: mode === 'production',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      "fs": false,
      "path": false
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ContainerReferencePlugin({
      remoteType: 'var',
      remotes: {
        'federated_library_boilerplate': 'federated_library_boilerplate',
      },
      overrides: ['react', 'react-dom', 'react-router-dom'],
    }),
    new ReactRouterHtmlPlugin({
      template: './public/index.html',
      routes,
    }),
  ],
};