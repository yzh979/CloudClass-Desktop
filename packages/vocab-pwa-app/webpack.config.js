const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/js/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(mp3|wav|ogg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'audio/[name].[hash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
      ...(isProduction
        ? [
            new GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
              runtimeCaching: [
                {
                  urlPattern: /^https:\/\/translate\.google\.com\//,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'google-tts-cache',
                    expiration: {
                      maxEntries: 100,
                      maxAgeSeconds: 7 * 24 * 60 * 60,
                    },
                  },
                },
              ],
            }),
          ]
        : []),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true,
    },
    resolve: {
      extensions: ['.js', '.json'],
    },
  };
};
