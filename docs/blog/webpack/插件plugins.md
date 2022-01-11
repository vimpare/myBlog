# 插件

loader 用于转换某些类型的模块，而**插件**则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(`option`)自定义。你也可以在一个配置文件中因为不同目的而**多次使用同一个插件**，这时需要通过使用 new 操作符来创建它的一个实例。

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```
webpack **插件**是一个具有 `apply` 方法的 JavaScript 对象.

`apply` 方法会被 `webpack compiler` 调用，并且在**整个**编译生命周期都可以访问 `compiler` 对象。

```
const fsExtra = require('fs-extra');

function CopyDistWebpackPlugin(options) {

    if (typeof options.from !== 'string' || !options.from) {
        throw new Error('缺少 options.from 参数');
    }
    if (typeof options.to !== 'string' || !options.to) {
        throw new Error('缺少 options.to 参数');
    }
    this.from = options.from;
    this.to = options.to;
}

CopyDistWebpackPlugin.prototype.apply = function(compiler) {

    compiler.plugin('done', (compilation) => {
        var from = resolve(this.from);
        var to = resolve(this.to);
        fsExtra.copy(from, to).then(() => {
            logger.success(`[${new Date().toLocaleString()}] copy [${from}] to [${to}] successfy.`);
        }).catch(err => {
            logger.error(`[${new Date().toLocaleString()}] copy [${from}] to [${to}] error: `, err);
        });
    });
};

module.exports = CopyDistWebpackPlugin;
```

##### 用法

由于**插件**可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入一个 new 实例。

```
plugins: [
    new CopyDistWebpackPlugin({
        from: resolve("dist/static"),
        to: resolve("../src/main/webapp/static")
    })
]
```

自定义开发插件
一般一个具体的 plugin 由下面部分组成：

- 一个具名 JavaScript 函数。
- 在它的原型上定义 apply 方法。
- 指定一个触及到 webpack 本身的 事件钩子。
- 操作 webpack 内部的实例特定数据。
- 在实现功能后调用 webpack 提供的 callback。

#### 插件 plugins:

`webpack.DefinePlugin`

- 主要：在编译阶段根据 NODE_ENV 自动切换配置文件，提升前端开发效率

```
plugins:[
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),
]
```

- 重点：凡是 src 下的文件，都可以访问到`process.env.NODE_ENV`这个变量

`mini-css-extract-plugin`

- 插件是 webpack4+ 版本的，可以直接安装使用。这里只能把所有样式包括 css、less 都打包到一个 css 文件 common.css 中，然后再 link 进页面

`webpack-manifest-plugin`

- 生成一份资源清单的 json 文件

`Friendly-errors-webpack-plugin`

- 识别某些类别的 webpack 错误

`HtmlWebpackPlugin`

- 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。
- Options:
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Default</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><strong><code>title</code></strong></td>
<td align="center"><code>{String}</code></td>
<td align="center"><code>Webpack App</code></td>
<td align="left">The title to use for the generated HTML document</td>
</tr>
<tr>
<td align="center"><strong><code>filename</code></strong></td>
<td align="center"><code>{String}</code></td>
<td align="center"><code>'index.html'</code></td>
<td align="left">The file to write the HTML to. Defaults to <code>index.html</code>. You can specify a subdirectory here too (eg: <code>assets/admin.html</code>)</td>
</tr>
<tr>
<td align="center"><strong><code>template</code></strong></td>
<td align="center"><code>{String}</code></td>
<td align="center">``</td>
<td align="left">
<code>webpack</code> relative or absolute path to the template. By default it will use <code>src/index.ejs</code> if it exists. Please see the <a href="https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md">docs</a> for details</td>
</tr>
<tr>
<td align="center"><strong><code>templateContent</code></strong></td>
<td align="center"><code>{string|Function|false}</code></td>
<td align="center">false</td>
<td align="left">Can be used instead of <code>template</code> to provide an inline template - please read the <a href="https://github.com/jantimon/html-webpack-plugin#writing-your-own-templates">Writing Your Own Templates</a> section</td>
</tr>
<tr>
<td align="center"><strong><code>templateParameters</code></strong></td>
<td align="center"><code>{Boolean|Object|Function}</code></td>
<td align="center"><code>false</code></td>
<td align="left">Allows to overwrite the parameters used in the template - see <a href="https://github.com/jantimon/html-webpack-plugin/tree/master/examples/template-parameters">example</a>
</td>
</tr>
<tr>
<td align="center"><strong><code>inject</code></strong></td>
<td align="center"><code>{Boolean|String}</code></td>
<td align="center"><code>true</code></td>
<td align="left">
<code>true || 'head' || 'body' || false</code> Inject all assets into the given <code>template</code> or <code>templateContent</code>. When passing <code>'body'</code> all javascript resources will be placed at the bottom of the body element. <code>'head'</code> will place the scripts in the head element. Passing <code>true</code> will add it to the head/body depending on the <code>scriptLoading</code> option. Passing <code>false</code> will disable automatic injections. - see the <a href="https://github.com/jantimon/html-webpack-plugin/tree/master/examples/custom-insertion-position">inject:false example</a>
</td>
</tr>
<tr>
<td align="center"><strong><code>publicPath</code></strong></td>
<td align="center"><code>{String|'auto'}</code></td>
<td align="center"><code>'auto'</code></td>
<td align="left">The publicPath used for script and link tags</td>
</tr>
<tr>
<td align="center"><strong><code>scriptLoading</code></strong></td>
<td align="center"><code>{'blocking'|'defer'}</code></td>
<td align="center"><code>'blocking'</code></td>
<td align="left">Modern browsers support non blocking javascript loading (<code>'defer'</code>) to improve the page startup performance.</td>
</tr>
<tr>
<td align="center"><strong><code>favicon</code></strong></td>
<td align="center"><code>{String}</code></td>
<td align="center">``</td>
<td align="left">Adds the given favicon path to the output HTML</td>
</tr>
<tr>
<td align="center"><strong><code>meta</code></strong></td>
<td align="center"><code>{Object}</code></td>
<td align="center"><code>{}</code></td>
<td align="left">Allows to inject <code>meta</code>-tags. E.g. <code>meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}</code>
</td>
</tr>
<tr>
<td align="center"><strong><code>base</code></strong></td>
<td align="center"><code>{Object|String|false}</code></td>
<td align="center"><code>false</code></td>
<td align="left">Inject a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" rel="nofollow"><code>base</code></a> tag. E.g. <code>base: "https://example.com/path/page.html</code>
</td>
</tr>
<tr>
<td align="center"><strong><code>minify</code></strong></td>
<td align="center"><code>{Boolean|Object}</code></td>
<td align="center">
<code>true</code> if <code>mode</code> is <code>'production'</code>, otherwise <code>false</code>
</td>
<td align="left">Controls if and in what ways the output should be minified. See <a href="#minification">minification</a> below for more details.</td>
</tr>
<tr>
<td align="center"><strong><code>hash</code></strong></td>
<td align="center"><code>{Boolean}</code></td>
<td align="center"><code>false</code></td>
<td align="left">If <code>true</code> then append a unique <code>webpack</code> compilation hash to all included scripts and CSS files. This is useful for cache busting</td>
</tr>
<tr>
<td align="center"><strong><code>cache</code></strong></td>
<td align="center"><code>{Boolean}</code></td>
<td align="center"><code>true</code></td>
<td align="left">Emit the file only if it was changed</td>
</tr>
<tr>
<td align="center"><strong><code>showErrors</code></strong></td>
<td align="center"><code>{Boolean}</code></td>
<td align="center"><code>true</code></td>
<td align="left">Errors details will be written into the HTML page</td>
</tr>
<tr>
<td align="center"><strong><code>chunks</code></strong></td>
<td align="center"><code>{?}</code></td>
<td align="center"><code>?</code></td>
<td align="left">Allows you to add only some chunks (e.g only the unit-test chunk)</td>
</tr>
<tr>
<td align="center"><strong><code>chunksSortMode</code></strong></td>
<td align="center"><code>{String|Function}</code></td>
<td align="center"><code>auto</code></td>
<td align="left">Allows to control how chunks should be sorted before they are included to the HTML. Allowed values are <code>'none' | 'auto' | 'manual' | {Function}</code>
</td>
</tr>
<tr>
<td align="center"><strong><code>excludeChunks</code></strong></td>
<td align="center"><code>{Array.&lt;string&gt;}</code></td>
<td align="center">``</td>
<td align="left">Allows you to skip some chunks (e.g don't add the unit-test chunk)</td>
</tr>
<tr>
<td align="center"><strong><code>xhtml</code></strong></td>
<td align="center"><code>{Boolean}</code></td>
<td align="center"><code>false</code></td>
<td align="left">If <code>true</code> render the <code>link</code> tags as self-closing (XHTML compliant)</td>
</tr>
</tbody>
</table>

``` 

"dependencies": {
        "@babel/polyfill": "^7.6.0",
        "babel-runtime": "^6.26.0",
        "clipboard": "^2.0.4",
        "console-polyfill": "^0.3.0",
        "core-js": "^2.6.9",
        "es5-shim": "^4.5.13",
        "iscroll": "^5.2.0",
        "jquery": "^1.12.4",
        "jquery-ui": "^1.12.1",
        "lodash": "^4.17.10",
        "promise-polyfill": "^8.1.3",
        "qartjs": "^1.1.2",
        "velocity-animate": "^1.5.0",
        "vue": "^2.6.10"
    },
    "devDependencies": {
        "@babel/core": "^7.5.5",
        "@babel/preset-env": "^7.5.5",
        "autoprefixer": "^9.6.1",
        "babel-core": "^6.26.3",
        "babel-eslint": "^10.0.2",
        "babel-loader": "^8.0.6",
        "babel-plugin-transform-runtime": "^6.23.0",
        "babel-preset-env": "^1.7.0",
        "body-parser": "^1.18.3",
        "chalk": "^2.4.2",
        "clean-webpack-plugin": "^3.0.0",
        "concurrently": "^4.1.2",
        "copy-webpack-plugin": "^5.0.4",
        "cross-env": "^5.2.0",
        "css-loader": "^3.2.0",
        "cssnano": "^4.1.10",
        "eslint": "^6.1.0",
        "eslint-friendly-formatter": "^4.0.1",
        "eslint-loader": "^2.2.1",
        "eslint-plugin-vue": "^6.0.1",
        "express": "^4.17.1",
        "file-loader": "^4.2.0",
        "fs-extra": "^8.1.0",
        "glob": "^7.1.4",
        "html-loader": "^0.5.5",
        "html-webpack-plugin": "^3.2.0",
        "http-proxy-middleware": "^0.19.1",
        "less": "^3.9.0",
        "less-loader": "^5.0.0",
        "lodash-webpack-plugin": "^0.11.5",
        "mini-css-extract-plugin": "^0.8.0",
        "mockjs": "^1.1.0",
        "postcss-loader": "^3.0.0",
        "shelljs": "^0.8.3",
        "style-loader": "^1.0.0",
        "url-loader": "^2.1.0",
        "vue-eslint-parser": "^7.0.0",
        "vue-loader": "^15.7.1",
        "vue-style-loader": "^4.1.2",
        "vue-template-compiler": "^2.6.10",
        "watch": "^1.0.2",
        "webpack": "^4.39.1",
        "webpack-cli": "^3.3.6",
        "webpack-dev-server": "^3.8.0",
        "webpack-manifest-plugin": "^2.0.4",
        "webpack-merge": "^4.2.1"
    },
```


## Webpack5常用的插件

### webpack内置模块
* 热替换
* 作用域提升
* 分包、抽离公共代码
```
plugins: [
    //开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.HotModuleReplacementPlugin(),
    // 作用域提升,提升代码在浏览器执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
],
optimization: {
// 分包、抽离公共代码
    splitChunks: {
      chunks: "all",
      minSize: 30000, // 形成一个新代码块最小的体积
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: "~", // 打包分割符
      cacheGroups: {
        // 打包第三方库
        vendors: {
          name: `chunk-vendors`,
          test: /[/]node_modules[/]/,
          priority: -10, // 优先级
          chunks: "initial",
        },
        // 打包其余的的公共代码
        common: {
          name: `chunk-common`,
          minChunks: 2, // 引入两次及以上被打包
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      },
    },
  },
```

### webpack-merge
该插件用于合并配置。

``` js
const { merge } = require('webpack-merge');
const devModule = merge(object1, object2, object3, ...);
```

### webpack-dev-server

该插件提供服务重新加载，仅用于开发。
```
// config.js
devConf: {
      env: "development",
      publicPath: "/",
      host: "localhost",
      port: "8080",
      assetsSubDirectory: "static",
      devtoolType: "cheap-module-eval-source-map",
      proxyTable: {
        "/client_demo_api": {
          target: "http://localhost:3000/client_demo_api/",
          changeOrigin: true,
          pathRewrite: {
            "^/client_demo_api": "/",
          },
        },
      },
    }
// webpack.dev.conf.js
// 启动一个本地服务器,可进行本地开发
  devServer: {
    hot: true, // 热加载
    open: true, // 自动打开浏览器
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    host: devConf.host,
    port: devConf.port,
    proxy: devConf.proxyTable, // 配置反向代理解决跨域
    compress: true, // 压缩代码
    client: {
      // 在浏览器上全屏显示编译的errors
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
// package.json
"scripts": {
    "dev:admin": "cross-env NODE_ENV_TYPE=admin webpack-dev-server --config build/webpack.dev.conf.js",
    "dev:client": "cross-env NODE_ENV_TYPE=client webpack-dev-server --config build/webpack.dev.conf.js",
 },
```

### mini-css-extract-plugin

该插件把CSS提取到单独的文件中。通过link标签嵌入打包出的html文件里。而style-loader是通过style标签内嵌在html文件里。

``` js

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
    filename: assetsPath("css/[name].[chunkhash].css"),
     chunkFilename: assetsPath("css/[name].[chunkhash].css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "less-loader" },
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.resolve(__dirname, "./theme.less"),
            },
          },
        ],
      },
    ],
  },
};
```

相比于extract-text-webpack-plugin插件：

    异步加载
    没有重复编译(性能)
    更容易使用
    特定于CSS

### html-webpack-plugin

该插件会生成一个HTML文件,把所有webpack打包后的文件用脚本标签嵌入进去。

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
            //指定模板 不指定会生成一个默认的html页面（空的）
            template: './src/my-index.html',
            //输出后的文件名
            filename: 'index.html',
            inject: true,
            //控制压缩
           minify: {
                removeComments: true, // 删除html注释
                collapseWhitespace: true, // 去除空格
                removeRedundantAttributes: true, // 删除多余的属性
              },
        })
  ]
}
```
会生成dist/index.html文件，内容如下：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <script src="index_bundle.js"></script>
  </head>
  <body>
  </body>
</html>
```

### TerserPlugin 和 CssMinimizerPlugin
分别用来压缩js和css。
```
// 压缩js
const TerserPlugin = require("terser-webpack-plugin");
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

optimization: {
    moduleIds: "deterministic", // 被哈希转化成的小位数值模块名
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false, // 删除注释
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }, // 删除注释
            },
          ],
        },
      }),
    ],
  },
```
### compression-webpack-plugin

是否开启Gzip压缩。nginx上需要对Gzip进行相关配置
```
const CompressionWebpackPlugin = require("compression-webpack-plugin");

plugins: [
  new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
```
### webpack-bundle-analyzer
项目打包后，进行性能分析
```
// webapck.prod.conf.js
if (process.env.analyz_npm_config_report) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  prod.plugins.push(new BundleAnalyzerPlugin());
}
// package.json
"analyz:admin": "cross-env analyz_npm_config_report=true npm run build:admin",
"analyz:client": "cross-env analyz_npm_config_report=true npm run build:client",
9、friendly-errors-webpack-plugin
友好的编译提示，搭配上一个node模块node-notifier，可以让系统在桌面发送通知。

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 系统桌面通知
const notifier = require("node-notifier");

plugins: [
    // 编译提示
    new FriendlyErrorsPlugin({
      // 编译成功
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${devConf.host}:${devConf.port}`,
        ],
      },
      // 编译出错
      onErrors: (severity, errors) => {
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        // 编译出错时,系统右下角弹出错误提示
        notifier.notify({
          title: "Webpack error",
          message: severity + ": " + error.name,
          subtitle: error.file || "",
        });
      },
      clearConsole: true, // 每次编译之间清除控制台
    }),
  ],
```