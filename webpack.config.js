const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const THIS_DIR = path.join(__dirname, "./");

const BASE_CONFIG = {
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              modifyVars: {
                "primary-color": "#FF81C3",
              },
              javascriptEnabled: true,
            },
          },
        ],
      },

      {
        test: /\.jpg$/,
        loader: "file-loader",
      },
      {
        test: /\.gif$/,
        loader: "file-loader",
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
    ],
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
      src: THIS_DIR.concat("src/"),
    },
    extensions: [
      ".ts",
      ".tsx",
      ".wasm",
      ".mjs",
      ".jsx",
      ".js",
      ".json",
      ".png",
    ],
  },

  entry: {
    main: THIS_DIR.concat("src/index.tsx"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: THIS_DIR.concat("index.html"),
      favicon: THIS_DIR.concat("logo.png"),
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  watch: false,
  output: {
    path: THIS_DIR.concat("build/"),
    filename: "[name].[contenthash].js",
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};

module.exports = (_, argv) => {
  if (argv.mode === "development") {
    return {
      ...BASE_CONFIG,
      devtool: "cheap-module-eval-source-map",
      output: {
        ...BASE_CONFIG.output,
        publicPath: "/",
        filename: "[name].js",
      },
    };
  }
  return BASE_CONFIG;
};
