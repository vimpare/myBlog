## Entry

配置模块的入口

必填的

#### context

Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。 如果想改变 context 的默认配置，则可以在配置文件里这样设置它：

```

module.exports = {
  context: path.resolve(__dirname, 'app')
}
```

`context` 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 `Webpack` 时带上参数 `webpack --context` 来设置 `context。`

`Entry` 的路径和其依赖的模块的路径可能采用相对于 `context` `的路径来描述，context` 会影响到这些相对路径所指向的真实文件。

#### Entry 类型

类型|例子|含义
---|---|---
string	|'./app/entry'|	入口模块的文件路径，可以是相对路径。
array	|['./app/entry1', './app/entry2']|	入口模块的文件路径，可以是相对路径。
object	|{ a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}|	配置多个入口，每个入口生成一个 Chunk
```
// 多页面入口
    var getEntries = function() {
        let entryOFiles = getFiles(resolve("src/js/page/**/*.js"));
        let entryFiles = Object.keys(entryOFiles);
        let entries = {};
        entryFiles.forEach(function(entry) {
            let pathname = entryOFiles[entry].pathname;
            if (!/^(common)/.test(pathname)) {
                entries[pathname] = entry;
            }
        });
        return entries;
    };
    let entries = getEntries();
```

```
function resolve() {
    var args = [].filter.call(arguments, item => typeof item === 'string');
    return path.resolve(__dirname, '../', ...args);
}
```
```
// 根据glob模型获取files (传入的path需使用*)
function getFiles(globModel) {
    var files = glob.sync(globModel);
    var rootDir = glob.sync(globModel.replace(/(\*.*)$/,''))[0];

    var entries = {};
    files.forEach(function(file,index){
        let dirname = path.dirname(file);
        let extname = path.extname(file);
        let basename = path.basename(file, extname);
        let pathname = (dirname+'/').replace(rootDir,'')+basename;
        entries[file] = { dirname, extname, basename, pathname };
    });

    return entries;
}
```
## Output

如何输出最终想要的代码。
`output` 是一个 `object`，里面包含一系列配置项。
- `filename` 用于输出文件的文件名。
- 目标输出目录 `path` 的绝对路径。
- webpack.config.js
    ```
    const config = {
    output: {
        filename: 'bundle.js',
        path: '/home/proj/public/assets'
    }
    };

    module.exports = config;
    ```
- output.filename 配置输出文件的名称，为string 类型。 如果只有一个输出文件，则可以把它写成静态不变的：
    ```
    filename: 'bundle.js'
    ```
- 多个入口起点