const path = require("path")
const rootpath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const utils = require('./utils/index.js');
const filehelper = require('./utils/initPage.js');

let sidebarDirMap = {}

const dirList = ['blog','book-study']
dirList.map((v)=>{
  let dirPath = rootpath+"/"+v+"/";
  let dirNameList = filehelper.getDirName(dirPath);
  dirNameList.map((item)=>{
    sidebarDirMap['/' + v + '/' + item + '/'] = utils.genSidebar(item, filehelper.getFileName(dirPath + item +"/"), false)
  })
})
console.log(sidebarDirMap)
module.exports = {
  //...其它配置
  title:'Hanhan \'s blog',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'blog', link: '/blog/' },
      { text: 'github', link: 'https://github.com/vimpare' },
    ],
    sidebar: sidebarDirMap // 侧边栏配置
  },
  // markdown: {
	// 	anchor: {
	// 		permalink: true
	// 	},
	// 	toc: {
	// 		includeLevel: [1, 2]
	// 	},
	// },
  chainWebpack (config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
}
