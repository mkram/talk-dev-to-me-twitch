const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: "./src/AccountDetails",
    mode: "development",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3005,
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
        name: "AccountDetails",
        filename: "remoteEntry.js",
        exposes:{
          "./AccountDetails": "./src/AccountDetails"
        },
        shared: {
          react: {
            singleton: true,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: '18.2.0'            
          },
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
          }
        }
      }),
    ],
  };