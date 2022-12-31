const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: "./src/MyAccount",
    mode: "development",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3004,
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
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "MyAccount",
        filename: "remoteEntry.js",
        exposes:{
          "./MyAccount": "./src/MyAccount"
        },
        remotes: {
          AccountDetails: "AccountDetails@http://localhost:3005/remoteEntry.js",
          PaymentDetails: "PaymentDetails@http://localhost:3006/remoteEntry.js"
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
          }
        }
      })
    ],
  };