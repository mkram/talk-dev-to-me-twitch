const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: "./src/SignIn",
    mode: "development",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3003,
    },
    output: {
      publicPath: "auto",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        {
          test: /\.js?$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "SignIn",
        filename: "remoteEntry.js",
        exposes:{
          "./SignIn": "./src/SignIn"
        },
        shared: {
          "@mui/material": {
            singleton: true,
            requiredVersion: '5.11.2'
          },
          "@emotion/react": {
              singleton: true,
              requiredVersion: '11.10.5'
          },
          "@emotion/styled": {
              singleton: true,
              requiredVersion: '11.10.5'
          },
          "react-router-dom": {
            singleton: true,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: '18.2.0'
          },
          react: {
            singleton: true,
            requiredVersion: '18.2.0'
          },
        },
      })
    ],
  };