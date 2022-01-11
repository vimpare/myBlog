## concurrently

并行地运行多个命令（同时跑前端和后端的服务）

`npm i concurrently --save`

```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "server": "npm start --prefix backend",
    "dev": "concurrently \"npm run server\" \"npm run start\""
 },
```

## cross-env

运行跨平台设置和使用环境变量的脚本

`npm install --save-dev cross-env`

使用

```
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

## watch

安装

``` js
npm install watch
```

该模块的目的是提供工具，使管理文件和目录树的监视更容易。

`watch.watchTree(root, [options,] callback)`

```
var shell = require("shelljs");     //执行shell
var watch = require('watch');       //监测目录变化

watch.watchTree('./scripts', function (f, curr, prev) {undefined
    shell.exec("node ./r.js -o ./build.js");
});
watch.watchTree('./sass', function (f, curr, prev) {undefined
    shell.exec("compass compile");
});

```

实现效果,如果scripts或sass目录下文件有改动就会执行对应的node命令


## fs-extra

`npm install fs-extra --save`

文件管理

* 创建一个目录

  `fs.mkdir(path, [mode], [callback(err)])`

* 删除一个空目录
  
  `fs.rmdir(path,callback)`

* 读取一个目录

  `fs.readdir(path,callback(err,files))`

* 复制文件
  
  ``` js
  fs.copy('frompath', 'topath', function(err) {
      if (err) return console.error(err)
      console.log("success!")
  });
  ```

* 移动文件、目录, 会删除以前的, 等于改名
  
  ``` js
  fs.move('frompath', 'topath', function(err) {
      if (err) return console.error(err)
      console.log("success!")
  });
  ```

* 删除文件、目录

  ``` js
  fs.remove('path', function(err) {
      if (err) return console.error(err)
      console.log("success!")
  })
  ```

* 创建文件、目录
  
  ``` js
  // 目录
  var dir = '/path'
  fs.ensureDir(dir, function(err) {
    console.log(err) // => null
    //dir has now been created, including the directory it is to be placed in
  });
  ```

  ``` js
  // 文件
  var file = '/path'
  fs.ensureFile(file, function(err) {
    console.log(err) // => null
    //file has now been created, including the directory it is to be placed in
  });
  ```

* 写入文件, 写入txt.文件时, "\r\n"是断行

  ``` js
  var file = '/path'
  var str = "hello Alan!"
  fs.outputFile(file, str, function(err) {
      console.log(err) // => null
  
      fs.readFile(file, 'utf8', function(err, data) {
          console.log(data) // => hello!
      })
  })
  ```


## path

[path](/blog/node/path)

## glob

[glob](/blog/node/glob)