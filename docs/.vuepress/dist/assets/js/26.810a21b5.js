(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{531:function(a,e,t){"use strict";t.r(e);var n=t(62),s=Object(n.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("p",[a._v("###1.let 和 const 命令")]),a._v(" "),t("ul",[t("li",[t("p",[a._v("ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。\n如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。")])]),a._v(" "),t("li",[t("p",[a._v("let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。")])])]),a._v(" "),t("p",[a._v("let不允许在相同作用域内，重复声明同一个变量。")]),a._v(" "),t("p",[a._v("避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("// 函数声明语句\n{\n  let a = 'secret';\n  function f() {\n    return a;\n  }\n}\n\n// 函数表达式\n{\n  let a = 'secret';\n  let f = function () {\n    return a;\n  };\n}\n")])])]),t("p",[a._v("const声明一个只读的常量。一旦声明，常量的值就不能改变。")]),a._v(" "),t("p",[a._v("ES6 一共有 6 种声明变量的方法:")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("var \nfunction\nlet \nconst\nimport\nclass\n")])])]),t("p",[a._v("顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。")]),a._v(" "),t("p",[a._v("###2.变量的解构赋值")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[a._v("ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。\n")])])]),t("p",[t("strong",[a._v("数组：")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("let [a, b, c] = [1, 2, 3];\n")])])]),t("p",[a._v("如果解构不成功，变量的值就等于undefined。")]),a._v(" "),t("p",[a._v("解构赋值允许指定默认值")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("let [x, y = 'b'] = ['a'];\n")])])]),t("p",[a._v("只有当一个数组成员严格等于undefined，默认值才会生效。")]),a._v(" "),t("p",[a._v("如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("function f() {\n  console.log('aaa');\n}\n\nlet [x = f()] = [1];\n")])])]),t("p",[a._v("===========>>>>")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("let x;\nif ([1][0] === undefined) {\n  x = f();\n} else {\n  x = [1][0];\n}\n")])])]),t("p",[t("strong",[a._v("对象")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[a._v('let { foo, bar } = { foo: "aaa", bar: "bbb" };\n')])])]),t("p",[a._v("对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，"),t("strong",[a._v("变量必须与属性同名")]),a._v("，才能取到正确的值。")]),a._v(" "),t("p",[t("strong",[a._v("字符串")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('const [a, b, c, d, e] = \'hello\';\na // "h"\nb // "e"\nc // "l"\nd // "l"\ne // "o"\n\n\n')])])]),t("p",[t("strong",[a._v("用途:")])]),a._v(" "),t("p",[a._v("1）交换变量的值")]),a._v(" "),t("div",{staticClass:"language-auto extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("let x = 1;\nlet y = 2;\n\n[x, y] = [y, x];\n")])])]),t("p",[a._v("上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰")]),a._v(" "),t("p",[a._v("2）从函数返回多个值")]),a._v(" "),t("p",[a._v("函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("// 返回一个数组\n\nfunction example() {\n  return [1, 2, 3];\n}\nlet [a, b, c] = example();\n\n// 返回一个对象\n\nfunction example() {\n  return {\n    foo: 1,\n    bar: 2\n  };\n}\nlet { foo, bar } = example();\n")])])]),t("p",[a._v("3）函数参数的定义")]),a._v(" "),t("p",[a._v("4）提取 JSON 数据")]),a._v(" "),t("p",[a._v("5）函数参数的默认值")]),a._v(" "),t("p",[a._v("6）遍历 Map 结构")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("const map = new Map();\nmap.set('first', 'hello');\nmap.set('second', 'world');\n\nfor (let [key, value] of map) {\n  console.log(key + \" is \" + value);\n}\n// first is hello\n// second is worl\n")])])]),t("p",[a._v("7）输入模块的指定方法")]),a._v(" "),t("p",[a._v("加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。")]),a._v(" "),t("p",[t("code",[a._v('const { SourceMapConsumer, SourceNode } = require("source-map");')])]),a._v(" "),t("p",[a._v("####字符串：\npadStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("'1'.padStart(10, '0') // \"0000000001\"\n'12'.padStart(10, '0') // \"0000000012\"\n'123456'.padStart(10, '0') // \"0000123456\"\n")])])]),t("p",[a._v("另一个用途是提示字符串格式。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("'12'.padStart(10, 'YYYY-MM-DD') // \"YYYY-MM-12\"\n'09-12'.padStart(10, 'YYYY-MM-DD') // \"YYYY-09-12\"\n")])])]),t("p",[a._v("###Symbol\nES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）")]),a._v(" "),t("p",[a._v("ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）")]),a._v(" "),t("p",[a._v("注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。\nSymbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("let s1 = Symbol('foo');\nlet s2 = Symbol('bar');\n\ns1 // Symbol(foo)\ns2 // Symbol(bar)\n\ns1.toString() // \"Symbol(foo)\"\ns2.toString() // \"Symbol(bar)\"\n")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);