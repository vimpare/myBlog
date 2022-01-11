### 命令行接口
#### 使用配置文件
```webpack [--config webpack.config.js]```
#### 不使用配置文件的用法
```webpack <entry> [<entry>] -o <output>```
`webpack src/index.js dist/bundle.js`
`webpack index=./src/index.js entry2=./src/index2.js dist/bundle.js`