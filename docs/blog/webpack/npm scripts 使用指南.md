# npm script 使用

npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。

``` js
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

## 原理

执行`npm run`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。

## 传参

向 npm 脚本传入参数，要使用--标明。

`$ npm run lint --  --reporter checkstyle > checkstyle.xml`

执行顺序:

- 并行执行（即同时的平行执行），可以使用&符号
- 继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。
  
默认值:

``` js
"start": "node server.js"，
"install": "node-gyp rebuild"
```

## 钩子

npm 脚本有`pre`和`post`两个钩子。

举例来说，build脚本命令的钩子就是`prebuild`和`postbuild`。

``` js
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。

``` js
npm run prebuild && npm run build && npm run postbuild
```

变量:通过`npm_package_`前缀，npm 脚本可以拿到`package.json`里面的字段