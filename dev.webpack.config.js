const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "https://dev.beatapps.net/munibonds/financials/pod/ui/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },


  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "public/icons/[name].[ext]",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "Financials",
      filename: "mbFinancialsEntry.js",
      remotes: {},
      exposes: {
        "./Financials":"./src/exports",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true
        },
      },
    }),
     new HtmlWebPackPlugin({
      template: "./src/template/index.html",
      favicon: "./src/assets/images/BEAT-favicon.svg"
    }),
  ],
};
