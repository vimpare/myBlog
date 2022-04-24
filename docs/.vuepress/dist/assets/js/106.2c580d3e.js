(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{509:function(t,r,n){"use strict";n.r(r);var e=n(62),a=Object(e.a)({},(function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h3",{attrs:{id:"订阅发布模式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#订阅发布模式"}},[t._v("#")]),t._v(" 订阅发布模式")]),t._v(" "),n("p",[t._v("过度使用的话，对象和对象之间的必要联系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一起的时候，要跟踪一个bug不是件轻松的事情。")]),t._v(" "),n("p",[t._v("trigger \\listen")]),t._v(" "),n("h3",{attrs:{id:"迭代器模式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#迭代器模式"}},[t._v("#")]),t._v(" 迭代器模式")]),t._v(" "),n("p",[t._v("---类似foreach")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("var each = function (ary, callback) {\n    for (var i = 0, l = ary.length; i < l; i++) {\n        callback.call(ary[i], i, ary[i]); // 把下标和元素当作参数传给callback函数    \n\n    }\n};\neach([1, 2, 3], function (i, n) {\n    alert([i, n]);\n});\n")])])]),n("blockquote",[n("p",[t._v("内部迭代器 无法同时迭代两个数组")])]),t._v(" "),n("p",[t._v("外部迭代器")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("var Iterator = function (obj) {\n    var current = 0;\n    var next = function () {\n        current += 1;\n    };\n    var isDone = function () {\n        return current >= obj.length;\n    };\n    var getCurrItem = function () {\n        return obj[current];\n    };\n    return {\n        next: next,\n        isDone: isDone,\n        getCurrItem: getCurrItem\n    }\n};\n\n\nvar compare = function (iterator1, iterator2) {\n    while (!iterator1.isDone() && !iterator2.isDone()) {\n        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {\n            throw new Error('iterator1和iterator2不相等');\n        }\n        iterator1.next();\n        iterator2.next();\n    }\n    alert('iterator1和iterator2相等');\n}\nvar iterator1 = Iterator([1, 2, 3]);\nvar iterator2 = Iterator([1, 2, 3]);\ncompare(iterator1, iterator2); // 输出：iterator1和iterator2相等\n")])])])])}),[],!1,null,null,null);r.default=a.exports}}]);