var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "./build");
var APP_DIR = path.resolve(__dirname, "./src/client");

module.exports = {
  entry: {
    main: APP_DIR + "/index.js"
  },
  output: {
    filename: "bundle.js",
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true, camelCase: true } }
        ]
      },
      {
        test: /\.(js)?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["react", "env"],
              plugins: ["syntax-dynamic-import", "transform-class-properties"]
            }
          }
        ]
      }
    ]
  }
};
