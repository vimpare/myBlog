(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{592:function(e,n,a){"use strict";a.r(n);var t=a(62),r=Object(t.a)({},(function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("标签（空格分隔）： vue")]),e._v(" "),a("hr"),e._v(" "),a("p",[e._v("这个配置文件是命令"),a("code",[e._v("npm run dev")]),e._v("和"),a("code",[e._v("npm run start")]),e._v(" 的入口配置文件，主要用于开发环境")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// 导入check-versions.js文件，并且执行导入的函数，用来确定当前环境node和npm版本是否符合要求\nrequire('./check-versions')()\n\n// 导入config目录下的index.js配置文件，此配置文件中定义了生产和开发环境中所要用到的一些参数\nvar config = require('../config')\n\n// 下面表示如果如果没有定义全局变量NODE_ENV，则将NODE_ENV设置为\"development\"\nif (!process.env.NODE_ENV) {\n    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)\n}\n\n// opn插件是用来打开特定终端的，此文件用来在默认浏览器中打开链接 opn(url)\nvar opn = require('opn')\n\n// nodejs路径模块\nvar path = require('path')\n\n// nodejs开发框架express，用来简化操作，有兴趣可以自行去了解\nvar express = require('express')\n\n// 引入webpack模块，用来使用webpack内置插件\nvar webpack = require('webpack')\n\n// 引入http-proxy-middleware插件，此插件是用来代理请求的只能用于开发环境，目的主要是解决跨域请求后台api\nvar proxyMiddleware = require('http-proxy-middleware')\n\n// 下面的意思是指，如果不是testing环境就引入webpack.dev.conf.js配置文件\n\nvar webpackConfig = process.env.NODE_ENV === 'testing' ?\n    require('./webpack.prod.conf') :\n    require('./webpack.dev.conf')\n\n// default port where dev server listens for incoming traffic\n// 下面是webpack-dev-server 监听的端口号，因为没有设置process.env.PORT，所以下面监听的就是config.dev.port\n//即8080\nvar port = process.env.PORT || config.dev.port\n    // automatically open browser, if not set will be false\n// 下面是true\nvar autoOpenBrowser = !!config.dev.autoOpenBrowser\n    // Define HTTP proxies to your custom API backend\n    // https://github.com/chimurai/http-proxy-middleware\n    \n// 下面是解决开发环境跨域问题的插件\nvar proxyTable = config.dev.proxyTable\n\n// 下面是创建node.js的express开发框架的实例\nvar app = express()\n\n// 把配置参数传递到webpack方法中，返回一个编译对象\nvar compiler = webpack(webpackConfig)\n\n// 下面是webpack-dev-middleware和webpack-hot-middleware两兄弟，这两个是黄金组合\n// 而vue作者用这两个插件也是用的最基本的形式\nvar devMiddleware = require('webpack-dev-middleware')(compiler, {\n    publicPath: webpackConfig.output.publicPath,\n    quiet: true  // 使用friendly-errors-webpack-plugin插件这个必须设置为true\n})\n\nvar hotMiddleware = require('webpack-hot-middleware')(compiler, {\n        log: () => {} // 使用friendly-errors-webpack-plugin插件这个必须设置为true\n    })\n    // force page reload when html-webpack-plugin template changes\ncompiler.plugin('compilation', function(compilation) {\n// webpack任何一个插件都plugin这个方法，里面可以传递钩子函数，用来在插件各个阶段做特殊处理，钩子函数种类很多\n    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {\n        // 当插件html-webpack-plugin产出完成之后，强制刷新浏览器\n        hotMiddleware.publish({ action: 'reload' })\n        cb()\n    })\n})\n\n// proxy api requests\nObject.keys(proxyTable).forEach(function(context) {\n// 下面是代理表的处理方法\n    var options = proxyTable[context]\n    if (typeof options === 'string') {\n        options = { target: options }\n    }\n    app.use(proxyMiddleware(options.filter || context, options))\n})\n\n// handle fallback for HTML5 history API\n// 这个插件是用来解决单页面应用，点击刷新按钮和通过其他search值定位页面的404错误\n\napp.use(require('connect-history-api-fallback')())\n\n// serve webpack bundle output\n// app.use是在响应请求之前执行的，用来指定静态路径，挂载静态资源\napp.use(devMiddleware)\n\n// enable hot-reload and state-preserving\n// compilation error display\napp.use(hotMiddleware)\n\n// serve pure static assets\n// 下面的staticPath是 static ，path.posix.join\nvar staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)\n// 挂载静态资源，下面的方法是用虚拟目录来访问资源，staticPath就是虚拟目录路径，不管设不设置都是static\napp.use(staticPath, express.static('./static'))\n// 下面结果就是 'http://localhost:8080'\nvar uri = 'http://localhost:' + port\n\n// 下面是es6的promise规范，用来处理嵌套请求的\nvar _resolve\nvar readyPromise = new Promise(resolve => {\n    _resolve = resolve // resolve是一个回调函数专门用来传递成功请求的数据\n})\n// 下面是加载动画\nconsole.log('> Starting dev server...')\n// waitUntilValid是webpack-dev-middleware实例的方法，在编译成功之后调用\ndevMiddleware.waitUntilValid(() => {\n    console.log('> Listening at ' + uri + '\\n')\n        // when env is testing, don't need open it\n        // 测试环境不打开浏览器\n    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {\n        opn(uri)\n    }\n    _resolve() // 这里没有传递数据，这只是在模拟\n})\n// node.js监听端口\nvar server = app.listen(port)\n// 这个导出对象是用来对外提供操作服务器和接受数据的接口，vue作者可谓考虑颇深啊\nmodule.exports = {\n    ready: readyPromise, // promise实例，可以通过readyPromise.then收到数据\n    close: () => {\n        server.close() // 关闭服务器\n    }\n}\n")])])]),a("blockquote",[a("p",[e._v("npm init 新建package.json")])]),e._v(" "),a("h1",{attrs:{id:"opn"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#opn"}},[e._v("#")]),e._v(" opn")]),e._v(" "),a("p",[e._v("作为跨平台的打开文件或者网站的模块,最常见的使用是比如项目开发或者启动的时候打开浏览器进行访问")]),e._v(" "),a("p",[e._v("模块地址\nhttps://npm.taobao.org/package/opn")]),e._v(" "),a("p",[e._v("基本使用\n安装")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("$ npm install opn\n")])])]),a("p",[e._v("使用")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("const opn = require('opn');\n\n// Opens the image in the default image viewer\nopn('unicorn.png').then(() => {\n\t// image viewer closed\n});\n\n// Opens the url in the default browser\nopn('http://sindresorhus.com');\n\n// Specify the app to open in\nopn('http://sindresorhus.com', {app: 'firefox'});\n\n// Specify app arguments\nopn('http://sindresorhus.com', {app: ['google chrome', '--incognito']});\n")])])]),a("h2",{attrs:{id:"demo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" demo")]),e._v(" "),a("blockquote",[a("p",[e._v("6.0.0 被弃用   ======》open\n在根目录下新建scripts文件夹，写对应的功能js文件，然后在package.json中直接node 执行这个文件即可")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('//package.json\n  "scripts": {\n    "test": "teset",\n    "opn": "gulp ",\n    "opn2":"node ./scripts/opn"\n  },\n')])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// opn.js \nlet opn = require("opn")\nlet os = require("os")\nlet osStr = os.platform()\nlet uri = "http://www.baidu.com"\nif(osStr.indexOf("win")>-1){\n    opn(uri, {\n        app: [\'chrome\']\n    });\n}\n')])])]),a("h1",{attrs:{id:"http-proxy-middleware"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-proxy-middleware"}},[e._v("#")]),e._v(" http-proxy-middleware")]),e._v(" "),a("p",[e._v("后台将请求转发给其它服务器\n当前主机A为http://localhost:3000/，现在浏览器发送一个请求，请求接口/api，这个请求的数据在另外一台服务器B上（http://10.119.168.87:4000），这时，就可通过在A主机设置代理，直接将请求发送给B主机")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("var express = require('express');\nvar proxy = require('http-proxy-middleware');\n\nvar app = express();\n\napp.use('/api', proxy({target: 'http://10.119.168.87:4000', changeOrigin: true}));\napp.listen(3000);\n")])])]),a("p",[e._v("安装")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm install --save-dev http-proxy-middleware\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("1 var proxy = require('http-proxy-middleware');\n2 \n3 var apiProxy = proxy('/api', {target: 'http://www.example.org'});\n4 //                   \\____/   \\_____________________________/\n5 //                     |                    |\n6 //                需要转发的请求           目标服务器\n")])])]),a("blockquote",[a("p",[e._v("说明：第一个参数是可以省略的。")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// 引用依赖\nvar express = require('express');\nvar proxy = require('http-proxy-middleware');\n\n// proxy 中间件的选择项\nvar options = {\n        target: 'http://www.example.org', // 目标服务器 host\n        changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL\n        ws: true,                         // 是否代理websockets\n        pathRewrite: {\n            '^/api/old-path' : '/api/new-path',     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path\n            '^/api/remove/path' : '/path'           // 同上\n        },\n        router: {\n            // 如果请求主机 == 'dev.localhost:3000',\n            // 重写目标服务器 'http://www.example.org' 为 'http://localhost:8000'\n            'dev.localhost:3000' : 'http://localhost:8000'\n        }\n    };\n\n// 创建代理\nvar exampleProxy = proxy(options);\n\n// 使用代理\nvar app = express();\n    app.use('/api', exampleProxy);\n    app.listen(3000);\n")])])]),a("h1",{attrs:{id:"webpack-dev-middleware"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webpack-dev-middleware"}},[e._v("#")]),e._v(" webpack-dev-middleware")]),e._v(" "),a("p",[e._v("一种快速式开发中间件，用于webpack bundle，允许提供从webpack发出的文件。\n这应该仅用于开发。\n使用此中间件的一些好处包括：\n没有文件写入磁盘，而是处理内存中的文件\n如果文件在监视模式下更改，则中间件会延迟请求，直到编译完成。\n支持热模块重载（HMR）。\n此模块至少需要Node v6.9.0和Webpack v4.0.0，并且必须与接受快速中间件的服务器一起使用。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm install webpack-dev-middleware --save-dev\n")])])]),a("p",[e._v("使用")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("const webpack = require('webpack');\nconst middleware = require('webpack-dev-middleware');\nconst compiler = webpack({\n  // webpack options\n});\nconst express = require('express');\nconst app = express();\n \napp.use(\n  middleware(compiler, {\n    // webpack-dev-middleware options\n  })\n);\n \napp.listen(3000, () => console.log('Example app listening on port 3000!'));\n")])])])])}),[],!1,null,null,null);n.default=r.exports}}]);