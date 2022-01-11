# path

path 模块提供了一些实用工具，用于处理文件和目录的路径。 可以使用以下方式访问它：

``` js
const path = require('path');

// 返回 path 的最后一部分
path.basename(path[, ext])



path.basename('/目录1/目录2/文件.html');
// 返回: '文件.html'

path.basename('/目录1/目录2/文件.html', '.html');
// 返回: '文件'

path.dirname(path)
// 返回 path 的目录名

path.dirname('/目录1/目录2/目录3');
// 返回: '/目录1/目录2'

path.extname(path)
// 返回 path 的扩展名，即 path 的最后一部分中从最后一次出现 .（句点）字符直到字符串结束。

path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''

path.extname('.index.md');
// 返回: '.md'
```

`path.resolve([...paths])`
- `...paths` `<string>` 路径或路径片段的序列。
- 返回: `<string>`

- `path.resolve()` 方法会将路径或路径片段的序列解析为绝对路径。

- 给定的路径序列会从右到左进行处理，后面的每个 path 会被追加到前面，直到构造出绝对路径。
- 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录。
  
``` js
path.resolve('/目录1/目录2', './目录3');
// 返回: '/目录1/目录2/目录3'

path.resolve('/目录1/目录2', '/目录3/目录4/');
// 返回: '/目录3/目录4'

path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif');
// 如果当前工作目录是 /目录A/目录B，
// 则返回 '/目录A/目录B/目录1/目录2/目录4/文件.gif'
```
