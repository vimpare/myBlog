(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{546:function(r,t,n){"use strict";n.r(t);var e=n(62),a=Object(e.a)({},(function(){var r=this,t=r.$createElement,n=r._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[n("h3",{attrs:{id:"单例模式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#单例模式"}},[r._v("#")]),r._v(" 单例模式")]),r._v(" "),n("p",[r._v("单例模式的定义是："),n("code",[r._v("保证一个类仅有一个实例，并提供一个访问它的全局访问点")]),r._v("。")]),r._v(" "),n("p",[r._v("用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象")]),r._v(" "),n("p",[r._v("以下几种方式可以相对降低全局变量带来的命名污染。\n1. 使用命名空间\n2. 使用闭包封装私有变量")]),r._v(" "),n("p",[n("strong",[r._v("惰性单例")]),r._v("指的是在需要的时候才创建对象实例\n管理单例的逻辑其实是完全可以抽象出来的，这个逻辑始终是一样的：用一个变量来标志是否创建过对象，如果是，则在下次直接返回这个已经创建好的对象：")]),r._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[r._v("var obj;\nif ( !obj ){ \n      obj = xxx;\n}\n")])])]),n("h3",{attrs:{id:"策略模式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#策略模式"}},[r._v("#")]),r._v(" 策略模式")]),r._v(" "),n("p",[r._v("策略模式的定义是："),n("code",[r._v("定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换")]),r._v("。\n策略模式的目的就是"),n("code",[r._v("将算法的使用与算法的实现分离开来")]),r._v("。")]),r._v(" "),n("p",[r._v("策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。"),n("br"),r._v("\n•策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。"),n("br"),r._v("\n•策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。"),n("br"),r._v("\n•在策略模式中利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的替代方案。\n表单校验")]),r._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[r._v("var Validator = function () {\n    this.cache = []; // 保存校验规则\n};\nValidator.prototype.add = function (dom, rule, errorMsg) {\n    var ary = rule.split(':'); // 把strategy和参数分开   \n    this.cache.push(function () { // 把校验的步骤用空函数包装起来，并且放入cache       \n        var strategy = ary.shift(); // 用户挑选的strategy        \n        ary.unshift(dom.value); // 把input的value添加进参数列表       \n        ary.push(errorMsg); // 把errorMsg添加进参数列表       \n        return strategies[strategy].apply(dom, ary);\n    });\n};\nValidator.prototype.start = function () {\n    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {\n        var msg = validatorFunc(); //开始校验，并取得校验后的返回信息     \n        if (msg) { // 如果有确切的返回值，说明校验没有通过\n            return msg;\n        }\n    }\n};\n")])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[r._v("validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );// 改成：validator.add( registerForm.userName, 'minLength:10', '用户名长度不能小于10位' );\n")])])]),n("p",[n("strong",[r._v("给某个文本输入框添加多种校验规则")])]),r._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[r._v("< html > < body > < form action = \"http:// xxx.com/register\"\nid = \"registerForm\"\nmethod = \"post\" > 请输入用户名： < input type = \"text\"\nname = \"userName\" / > 请输入密码： < input type = \"text\"\nname = \"password\" / > 请输入手机号码： < input type = \"text\"\nname = \"phoneNumber\" / > < button > 提交 < /button>        </form > < script > /***********************策略对象**************************/\nvar strategies = {\n    isNonEmpty: function (value, errorMsg) {\n        if (value === '') {\n            return errorMsg;\n        }\n    },\n    minLength: function (value, length, errorMsg) {\n        if (value.length < length) {\n            return errorMsg;\n        }\n    },\n    isMobile: function (value, errorMsg) {\n        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {\n            return errorMsg;\n        }\n    }\n}; /***********************Validator 类**************************/\nvar Validator = function () {\n    this.cache = [];\n};\nValidator.prototype.add = function (dom, rules) {\n    var self = this;\n    for (var i = 0, rule; rule = rules[i++];) {\n        (function (rule) {\n            var strategyAry = rule.strategy.split(':');\n            var errorMsg = rule.errorMsg;\n            self.cache.push(function () {\n                var strategy = strategyAry.shift();\n                strategyAry.unshift(dom.value);\n                strategyAry.push(errorMsg);\n                return strategies[strategy].apply(dom, strategyAry);\n            });\n        })(rule)\n    }\n};\nValidator.prototype.start = function () {\n    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {\n        var errorMsg = validatorFunc();\n        if (errorMsg) {\n            return errorMsg;\n        }\n    }\n}; /***********************客户调用代码**************************/\nvar registerForm = document.getElementById('registerForm');\nvar validataFunc = function () {\n    var validator = new Validator();\n    validator.add(registerForm.userName, [{\n            strategy: 'isNonEmpty',\n            errorMsg: '用户名不能为空'\n        }, {\n            strategy: 'minLength:10',\n            errorMsg: '用户名长度不能小于10位'\n        }]);\n    validator.add(registerForm.password, [{\n            strategy: 'minLength:6',\n            errorMsg: '密码长度不能小于6位'\n        }]);\n    validator.add(registerForm.phoneNumber, [{\n            strategy: 'isMobile',\n            errorMsg: '手机号码格式不正确'\n        }]);\n    var errorMsg = validator.start();\n    return errorMsg;\n}\nregisterForm.onsubmit = function () {\n    var errorMsg = validataFunc();\n    if (errorMsg) {\n        alert(errorMsg);\n        return false;\n    }\n}; < /script>    </body > < /html>\n")])])])])}),[],!1,null,null,null);t.default=a.exports}}]);