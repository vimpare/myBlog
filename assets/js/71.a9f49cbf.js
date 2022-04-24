(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{572:function(e,s,a){"use strict";a.r(s);var t=a(62),r=Object(t.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h3",{attrs:{id:"modules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#modules"}},[e._v("#")]),e._v(" modules")]),e._v(" "),a("ul",[a("li",[e._v("在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为模块。")])]),e._v(" "),a("h4",{attrs:{id:"模块解析-module-resolution"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块解析-module-resolution"}},[e._v("#")]),e._v(" 模块解析 module resolution")]),e._v(" "),a("p",[e._v("解析规则:")]),e._v(" "),a("ul",[a("li",[e._v("绝对路径 "),a("code",[e._v("import 'C:\\\\Users\\\\me\\\\file'")])]),e._v(" "),a("li",[e._v("相对路径 "),a("code",[e._v('import "../src/file1"')])]),e._v(" "),a("li",[e._v("模块路径 "),a("code",[e._v('import "module/lib/file"')])])]),e._v(" "),a("h5",{attrs:{id:"模块路径"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块路径"}},[e._v("#")]),e._v(" 模块路径")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("模块将在 `resolve.modules` 中指定的所有目录内搜索。 你可以替换初始模块路径，此替换路径通过使用 `resolve.alias` 配置选项来创建一个别名。\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('resolve: {\n    extensions: [".js", ".vue", ".less"],\n    modules: [resolve("node_modules"), resolve("src")],\n    alias: {\n        vue$: "vue/dist/vue.esm.js",\n        "@": resolve("src")\n    }\n}\n')])])]),a("ul",[a("li",[a("code",[e._v("alias")]),e._v(" : 创建 "),a("code",[e._v("import")]),e._v(" 或 "),a("code",[e._v("require")]),e._v(" 的别名，来确保模块引入变得更简单;给定对象的键后的末尾添加 $，以表示精准匹配。")]),e._v(" "),a("li",[a("code",[e._v("extensions")]),e._v(" : array 自动解析确定的扩展。默认值为："),a("code",[e._v('extensions: [".js", ".json"]')]),e._v(",\n能够使用户在引入模块时不带扩展："),a("code",[e._v("import File from '../path/to/file'")]),e._v(";\n默认值："),a("code",[e._v("['.wasm', '.mjs', '.js', '.json']")])]),e._v(" "),a("li",[a("code",[e._v("modules")]),e._v(" : array , 告诉 webpack 解析模块时应该搜索的目录。")])]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.webpackjs.com/loaders/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://www.webpackjs.com/loaders/"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("code",[e._v("loaders")]),e._v("\n预处理文件")]),e._v(" "),a("p",[e._v("用于对模块的源代码进行转换")]),e._v(" "),a("ul",[a("li",[e._v("首先安装相对应的 loader"),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm install --save-dev css-loader\nnpm install --save-dev ts-loader\n")])])])]),e._v(" "),a("li",[e._v("然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("module.exports = {\n module: {\n   rules: [\n     { test: /\\.css$/, use: 'css-loader' },\n     { test: /\\.ts$/, use: 'ts-loader' }\n   ]\n }\n};\n")])])]),a("p",[a("code",[e._v("babel-loader")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('{\n    test: /\\.js$/,\n    include: [resolve("src")],\n    exclude: [\n        resolve("src/js/libs/layer"),\n        resolve("src/js/libs/laydate")\n    ],\n    use: [\n        {\n            loader: "babel-loader",\n            options: {\n                cacheDirectory: true\n            }\n        }\n    ]\n},\n')])])]),a("p",[a("code",[e._v("html-loader")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('{\n    test: /\\.html$/,\n    include: [resolve("src")],\n    loader: "html-loader",\n    options: {\n        // 最小化\n        minimize: true,\n        // 刪除注释\n        removeComments: true,\n        interpolate: "require", // 允许require插值\n        attrs: [\n            \'img:src\',\n            \'img:data-src\'\n        ]\n    }\n},\n')])])]),a("ul",[a("li",[a("p",[e._v("用法\n默认情况下，每个本地的 "),a("code",[e._v('<img src="image.png">')]),e._v(" 都需要通过 require （"),a("code",[e._v("require('./image.png')")]),e._v("）来进行加载。你可能需要在配置中为图片指定 loader（推荐 "),a("code",[e._v("file-loader")]),e._v(" 或 "),a("code",[e._v("url-loader")]),e._v(" ）")])]),e._v(" "),a("li",[a("p",[e._v("你可以通过查询参数 "),a("code",[e._v("attrs")]),e._v("，来指定哪个标签属性组合(tag-attribute combination)应该被此 loader 处理。传递数组或以空格分隔的 "),a("code",[e._v("<tag>:<attribute>")]),e._v(" 组合的列表。（默认值："),a("code",[e._v("attrs=img:src")]),e._v("）")])]),e._v(" "),a("li",[a("p",[a("code",[e._v("interpolate")]),e._v(" 插值 ，为 ES6 模板字符串启用插值语法")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<img src=\"${require(`./images/gallery.png`)}\">\n\n<div>${require('./components/gallery.html')}</div>\n")])])])]),e._v(" "),a("li",[a("p",[e._v("只想在模板中使用 "),a("code",[e._v("require")]),e._v("，任何其它的 "),a("code",[e._v("${}")]),e._v(" 不被转换，你可以设置 "),a("code",[e._v("interpolate")]),e._v(" 标记为 "),a("code",[e._v("require")])])])])])}),[],!1,null,null,null);s.default=r.exports}}]);