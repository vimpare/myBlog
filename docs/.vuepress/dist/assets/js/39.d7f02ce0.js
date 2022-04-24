(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{604:function(a,e,s){"use strict";s.r(e);var t=s(62),n=Object(t.a)({},(function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h3",{attrs:{id:"列表生成式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#列表生成式"}},[a._v("#")]),a._v(" 列表生成式")]),a._v(" "),s("p",[a._v("List Comprehensions，是python内置的简单又强大的用来创建list的方式。\neg:\n要生成list [1,2,3,4,5,6,7,8]")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("list(rangt(1,9))\n")])])]),s("p",[a._v("要生成"),s("code",[a._v("[1x1, 2x2, 3x3, ..., 10x10]")]),a._v("怎么做")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v(">>> L = []\n>>> for x in range(1, 11):\n...    L.append(x * x)\n...\n>>> L\n[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n")])])]),s("p",[a._v("列表生成式则可以用一行语句代替循环生成上面的list")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v(">>> [x * x for x in range(1, 11)]\n[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n")])])]),s("p",[a._v("写列表生成式时，把要生成的元素"),s("code",[a._v("x * x")]),a._v("放到前面，后面跟"),s("code",[a._v("for")]),a._v("循环，就可以把"),s("code",[a._v("list")]),a._v("创建出来\nfor循环后面还可以加上if判断，这样我们就可以筛选出仅偶数的平方：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v(">>> [x * x for x in range(1, 11) if x % 2 == 0]\n[4, 16, 36, 64, 100]\n")])])]),s("p",[a._v("还可以使用两层循环，可以生成全排列：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v(">>> [m + n for m in 'ABC' for n in 'XYZ']\n['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']\n")])])]),s("p",[a._v("列表生成式也可以使用两个变量来生成list：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v(">>> d = {'x': 'A', 'y': 'B', 'z': 'C' }\n>>> [k + '=' + v for k, v in d.items()]\n['y=B', 'x=A', 'z=C']\n")])])]),s("h4",{attrs:{id:"if-else"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#if-else"}},[a._v("#")]),a._v(" if ... else")]),a._v(" "),s("p",[a._v("for前面的if ... else是表达式，而for后面的if是过滤条件，不能带else")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v(">>> [x if x % 2 == 0 else -x for x in range(1, 11)]\n[-1, 2, -3, 4, -5, 6, -7, 8, -9, 10]\n")])])]),s("h2",{attrs:{id:"生成器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成器"}},[a._v("#")]),a._v(" 生成器")]),a._v(" "),s("p",[a._v("generator  一边循环一边计算的机制，称为生成器;")]),a._v(" "),s("p",[a._v("列表生成式的[]改成() ,就创建了生成器;")]),a._v(" "),s("p",[a._v("通过"),s("code",[a._v("next()")]),a._v("函数获得generator的下一个返回值;")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("杨辉三角\n")])])]),s("p",[a._v("def triangles():\nN=[1]\nwhile True:\nyield N\nS=N[:]\nS.append(0)\nN=[S[i-1]+S[i] for i in range(len(S))]")])])}),[],!1,null,null,null);e.default=n.exports}}]);