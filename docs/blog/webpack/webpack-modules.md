### modules
- 在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为模块。
#### 模块解析 module resolution

解析规则:
- 绝对路径 `import 'C:\\Users\\me\\file'`
- 相对路径 `import "../src/file1"`
- 模块路径 `import "module/lib/file"`
##### 模块路径
    模块将在 `resolve.modules` 中指定的所有目录内搜索。 你可以替换初始模块路径，此替换路径通过使用 `resolve.alias` 配置选项来创建一个别名。
```
resolve: {
    extensions: [".js", ".vue", ".less"],
    modules: [resolve("node_modules"), resolve("src")],
    alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src")
    }
}
```

- `alias` : 创建 `import` 或 `require` 的别名，来确保模块引入变得更简单;给定对象的键后的末尾添加 $，以表示精准匹配。
- `extensions` : array 自动解析确定的扩展。默认值为：`extensions: [".js", ".json"]`,
能够使用户在引入模块时不带扩展：`import File from '../path/to/file'`;
 默认值：`['.wasm', '.mjs', '.js', '.json']`
- `modules` : array , 告诉 webpack 解析模块时应该搜索的目录。














 <https://www.webpackjs.com/loaders/>

 `loaders`
预处理文件

用于对模块的源代码进行转换
- 首先安装相对应的 loader
    ```
    npm install --save-dev css-loader
    npm install --save-dev ts-loader
    ```
- 然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader
 ```
 module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

`babel-loader`

```
{
    test: /\.js$/,
    include: [resolve("src")],
    exclude: [
        resolve("src/js/libs/layer"),
        resolve("src/js/libs/laydate")
    ],
    use: [
        {
            loader: "babel-loader",
            options: {
                cacheDirectory: true
            }
        }
    ]
},
```
`html-loader`
```
{
    test: /\.html$/,
    include: [resolve("src")],
    loader: "html-loader",
    options: {
        // 最小化
        minimize: true,
        // 刪除注释
        removeComments: true,
        interpolate: "require", // 允许require插值
        attrs: [
            'img:src',
            'img:data-src'
        ]
    }
},
```
- 用法
默认情况下，每个本地的 `<img src="image.png">` 都需要通过 require （`require('./image.png')`）来进行加载。你可能需要在配置中为图片指定 loader（推荐 `file-loader` 或 `url-loader` ）

- 你可以通过查询参数 `attrs`，来指定哪个标签属性组合(tag-attribute combination)应该被此 loader 处理。传递数组或以空格分隔的 `<tag>:<attribute>` 组合的列表。（默认值：`attrs=img:src`）
- `interpolate` 插值 ，为 ES6 模板字符串启用插值语法
    ```
    <img src="${require(`./images/gallery.png`)}">

    <div>${require('./components/gallery.html')}</div>
    ```
- 只想在模板中使用 `require`，任何其它的 `${}` 不被转换，你可以设置 `interpolate` 标记为 `require`