(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{565:function(t,a,s){"use strict";s.r(a);var n=s(62),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("Webpack 有以下几个核心概念。")]),t._v(" "),s("p",[s("code",[t._v("Entry")]),t._v("：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。")]),t._v(" "),s("p",[s("code",[t._v("Module")]),t._v("：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。")]),t._v(" "),s("p",[s("code",[t._v("Chunk")]),t._v("：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。")]),t._v(" "),s("p",[s("code",[t._v("Loader")]),t._v("：模块转换器，用于把模块原内容按照需求转换成新内容。")]),t._v(" "),s("p",[s("code",[t._v("Plugin")]),t._v("：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。")]),t._v(" "),s("p",[s("code",[t._v("Output")]),t._v("：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。")]),t._v(" "),s("blockquote",[s("p",[t._v("Webpack 启动后会从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。")])]),t._v(" "),s("h2",{attrs:{id:"入口起点entry"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#入口起点entry"}},[t._v("#")]),t._v(" 入口起点entry")]),t._v(" "),s("h3",{attrs:{id:"单个入口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#单个入口"}},[t._v("#")]),t._v(" 单个入口")]),t._v(" "),s("p",[t._v("webpack.config.js")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" config "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  entry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./path/to/my/entry/file.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"对象语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#对象语法"}},[t._v("#")]),t._v(" 对象语法")]),t._v(" "),s("p",[t._v("webpack.config.js")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" config "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  entry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    app"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/app.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    vendors"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/vendors.js'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"出口-output"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#出口-output"}},[t._v("#")]),t._v(" 出口(output)")]),t._v(" "),s("p",[s("code",[t._v("output")]),t._v(" 属性告诉 webpack 在哪里输出它所创建的 "),s("code",[t._v("bundles")]),t._v("，以及如何命名这些文件，默认值为 "),s("code",[t._v("./dist")]),t._v("。")]),t._v(" "),s("p",[t._v("webpack.config.js")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  entry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./path/to/my/entry/file.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  output"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    path"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-first-webpack.bundle.js'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("strong",[t._v("path")])]),t._v(" "),s("p",[t._v("Node.js 核心模块，用于操作文件路径。"),s("a",{attrs:{href:"/blog/node/path"}},[t._v("path")])]),t._v(" "),s("h3",{attrs:{id:"多个入口起点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#多个入口起点"}},[t._v("#")]),t._v(" 多个入口起点")]),t._v(" "),s("p",[t._v('如果配置创建了多个单独的 "'),s("code",[t._v("chunk")]),t._v('"（例如，使用多个入口起点或使用像 '),s("code",[t._v("CommonsChunkPlugin")]),t._v(" 这样的插件），则应该使用占位符("),s("code",[t._v("substitutions")]),t._v(")来确保每个文件具有唯一的名称。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("div",{staticClass:"highlight-lines"},[s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("div",{staticClass:"highlighted"},[t._v(" ")]),s("div",{staticClass:"highlighted"},[t._v(" ")]),s("br"),s("br"),s("br")]),s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n entry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   app"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/app.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   search"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src/search.js'")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n output"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[name].js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   path"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" __dirname "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/dist'")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),s("h4",{attrs:{id:"output-chunkfilename"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#output-chunkfilename"}},[t._v("#")]),t._v(" output.chunkFilename")]),t._v(" "),s("p",[t._v("此选项决定了非入口(non-entry) chunk 文件的名称。")]),t._v(" "),s("h4",{attrs:{id:"output-filename"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#output-filename"}},[t._v("#")]),t._v(" output.filename")]),t._v(" "),s("p",[t._v("此选项决定了每个输出 "),s("code",[t._v("bundle")]),t._v(" 的名称。这些 "),s("code",[t._v("bundle")]),t._v(" 将写入到 "),s("code",[t._v("output.path")]),t._v(" 选项指定的目录下。")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("对于单个入口起点，"),s("code",[t._v("filename")]),t._v(" 会是一个静态名称。")]),t._v(" "),s("p",[s("code",[t._v('filename: "bundle.js"')])])]),t._v(" "),s("li",[s("p",[t._v("多个入口起点(entry point)")]),t._v(" "),s("p",[t._v("使用入口名称：")]),t._v(" "),s("p",[s("code",[t._v('filename: "[name].bundle.js"')])]),t._v(" "),s("p",[t._v("使用内部 chunk id")]),t._v(" "),s("p",[s("code",[t._v('filename: "[id].bundle.js"')])]),t._v(" "),s("p",[t._v("使用每次构建过程中，唯一的 hash 生成")]),t._v(" "),s("p",[s("code",[t._v('filename: "[name].[hash].bundle.js"')])]),t._v(" "),s("p",[t._v("使用基于每个 chunk 内容的 hash：")]),t._v(" "),s("p",[s("code",[t._v('filename: "[chunkhash].bundle.js"')])])])]),t._v(" "),s("h2",{attrs:{id:"loader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#loader"}},[t._v("#")]),t._v(" loader")]),t._v(" "),s("p",[t._v("webpack 只能理解 JavaScript 和 JSON 文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。")]),t._v(" "),s("p",[t._v('loader 可以使你在 import 或"加载"模块时预处理文件。')]),t._v(" "),s("p",[t._v("在 webpack 的配置中 "),s("code",[t._v("loader")]),t._v(" 有两个属性：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("test")]),t._v(" 属性，用于标识出应该被对应的 "),s("code",[t._v("loader")]),t._v(" 进行转换的某个或某些文件。")]),t._v(" "),s("li",[s("code",[t._v("use")]),t._v(" 属性，表示进行转换时，应该使用哪个 "),s("code",[t._v("loader。")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  output"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-first-webpack.bundle.js'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  module"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    rules"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" test"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\.txt$")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" use"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'raw-loader'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("a",{attrs:{href:"/blog/webpack/loader"}},[t._v("loader")])]),t._v(" "),s("h2",{attrs:{id:"插件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插件"}},[t._v("#")]),t._v(" 插件")]),t._v(" "),s("p",[s("a",{attrs:{href:"/blog/webpack/%E6%8F%92%E4%BB%B6plugins"}},[t._v("plugins")])])])}),[],!1,null,null,null);a.default=e.exports}}]);