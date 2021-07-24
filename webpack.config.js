const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack config for the client bundle
 * Generate a static build for all source files from /client/src
 * Compile them into index.html and index.js files in /client/dist
*/

module.exports = {
  entry: "./client/src/index.js",
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "client", "dist")
  },
  plugins: [
    buildHTMLFileConfig()
  ],
  module: {
    rules: [
      buildSCSSLoader(),
      buildAssetsLoader()
    ]
  }
};

function buildHTMLFileConfig() {
    // Generates HTML file in the client build
    return new HtmlWebpackPlugin({
        title: "Memories"
    });
}
function buildSCSSLoader() {
    // Compiles SCSS files into the JS bundle
    return {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
    };
}
function buildAssetsLoader() {
    // Includes the asset files into the client build
    return {
        test: /\.png$/i,
        type: 'asset/resource',
      };
}
