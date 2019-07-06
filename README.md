在 webpack 中可以使用条件语句

一个例子  
webpack.config.js

```js
const webpackConfig = {
  mode: mode,
  entry: {
    //entry通过扫描pages下的目录自动生成
  },
  output: {
    path: distPath,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 8192
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue: "vue/dist/vue.js"
    }
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "./public")
      }
    ]),
    {
      condition: production,
      ifTrue: new CompressionWebpackPlugin({
        test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
        // asset: "[path].gz[hash]",
        algorithm: "gzip",
        threshold: 10240,
        minRatio: 0.8
      })
    }
  ],
  devServer: {
    contentBase: distPath,
    proxy: {
      "/api": "http://localhost:8080"
    },
    port: 8000,
    hot: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: "/Index.html" }]
    }
  },
  externals: {
    condition: production,
    ifTrue: {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "vue-router": "VueRouter"
    },
    ifFalse: {}
  }
}
module.exports = webpackConfigFilter(webpackConfig)
```
