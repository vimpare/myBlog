# loader

loader 通过在 `require()` 语句中使用 `loadername!` 前缀来激活，或者通过 `webpack` 配置中的正则表达式来自动应用

## 文件

### `raw-loader` 

加载文件原始内容（utf-8）

### `url-loader` 

像 `file loader` 一样工作，但如果文件小于限制，可以返回 `data URL`

### `file-loader` 

将文件发送到输出文件夹，并返回（相对）URL

``` js
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: {
        loader: 'file-loader',
        options: {
            context: resolve('src/image'),
            name: `static/image/[path][name].[ext]`
        }
    }
}
```

在一个 bundle 文件中 `import`（或 `require`）目标文件：

``` js
path.resolve(__dirname, "./dist")
```

>默认情况下，生成文件的文件名，是文件内容的 **MD5 哈希值**，并会保留所引用资源的原始扩展名。

#### options

##### name

默认：`'[hash].[ext]'`

需要注意的是 name 选项支持的类型为：`{String|Function}`

``` js 
{
  loader: 'file-loader',
  options: {
    name (file) {
      if (env === 'development') {
        return '[path][name].[ext]'
      }
      return '[hash].[ext]?[hash]'
    }
  }
}
```

[ext]：String，默认值为 `file.extname`，表示资源扩展名；
[name]：String，默认值为 `file.basename`，表示资源的基本名称；
[path]：String，默认值为 `file.dirname`，表示资源相对于 context 的路径；
[hash]：String，默认值为 md5，内容的哈希值，支持灵活的 hashes 配置

##### context

配置自定义文件 context，默认为 webpack.config.js context

``` js
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: {
        loader: 'file-loader',
        options: {
            name: `images/[path][name].[ext]`,
            context: 'src/images',
        }
    }
}
```
##### publicPath

用于配置自定义 `public` 发布目录，支持 `String|Function` 类型，默认值为 `__webpack_public__path__`

`outputPath` vs `publicPath`
`outputPath` 仅仅告诉 `webpack` 结果存储在哪里，然而 `publicPath` 选项则被许多 webpack 的插件用于在生产模式下更新内嵌到 css、html 文件内的 url 值。例如：

``` js {8}
// Development: Both Server and the image are on localhost
.image { 
  background-image: url('./test.png');
 }
 
// Production: Server is on Heroku but the image is on a CDN
.image { 
  background-image: url('https://some-cdn/test.png');
 }
```

### ref-loader 

手动创建所有文件之间的依赖关系

## 转义

### babel-loader

许你使用 Babel 和 webpack 转译 JavaScript 文件。

``` JS
npm install --save-dev @babel/core @babel/preset-env babel-loader
```

新建 .babelrc 文件：

``` js
{
 "presets": [
  "@babel/preset-env"
 ]
}
```
```
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader"
    },
},
```

由于 babel 默认只转换 ES6 新语法，不转换新的 API，如：Set、Map、Promise等，所以需要安装 `@babel/polyfill` 转换新 API。安装 `@babel/plugin-transform-runtime` 优化代码，`@babel/plugin-transform-runtime` 是一个可以重复使用 Babel 注入的帮助程序代码来节省代码的插件。

安装 `@babel/polyfill`、`@babel/plugin-transform-runtime` 两个插件：

```
$ npm install --save-dev @babel/polyfill @babel/plugin-transform-runtime
```

修改 .babelrc 配置文件：
```
{
 "presets": [
  ["@babel/preset-env", {
   "useBuiltIns": "usage", // 在每个文件中使用polyfill时，为polyfill添加特定导入。利用捆绑器只加载一次相同的polyfill。
   "modules": false // 启用将ES6模块语法转换为其他模块类型，设置为false不会转换模块。
  }]
 ],
 "plugins": [
  ["@babel/plugin-transform-runtime", {
   "helpers": false
  }]
 ]
}
```
最后，配置兼容的浏览器环境。在 .babelrc 配置文件中设置 targets 属性：

```
{
 "presets": [
  ["@babel/preset-env", {
   "useBuiltIns": "usage",
   "modules": false,
   "targets": {
    "browsers": "last 2 versions, not ie <= 9"
   }
  }]
 ],
 "plugins": [
  ["@babel/plugin-transform-runtime", {
   "helpers": false
  }]
 ]
}
```