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