(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{600:function(t,e,n){"use strict";n.r(e);var i=n(62),a=Object(i.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("p",[t._v("多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句")]),t._v(" "),n("p",[t._v("原型模式选择了另外一种方式，我们不再关心对象的具体类型，而是找到一个对象，然后通过克隆来创建一个一模一样的对象。")]),t._v(" "),n("p",[t._v("原型模式的实现关键，是语言本身是否提供了clone方法。ECMAScript 5提供了Object.create方法，可以用来克隆对象。")]),t._v(" "),n("p",[t._v("在不支持Object.create方法的浏览器中，则可以使用以下代码：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("Object.create = Object.create || function( obj ){    \n    var F = function(){};    \n    F.prototype = obj;    \n    return new F();\n}\n")])])]),n("p",[t._v("当对象无法响应某个请求时，会把该请求委托给它自己的原型。\nJavaScript中的根对象是Object.prototype对象")]),t._v(" "),n("p",[t._v("ECMAScript 6带来了新的Class语法。这让JavaScript看起来像是一门基于类的语言，但其背后仍是通过原型机制来创建对象\n设计模式-状态模式")]),t._v(" "),n("p",[t._v("设计模式")]),t._v(" "),n("p",[t._v("状态模式的关键是区分事物内部的状态")]),t._v(" "),n("p",[t._v("// OffLightState：\nvar OffLightState = function (light) {\nthis.light = light;\n};\nOffLightState.prototype.buttonWasPressed = function () {\nconsole.log('弱光'); // offLightState对应的行为"),n("br"),t._v("\nthis.light.setState(this.light.weakLightState); // 切换状态到weakLightState\n};\n//WeakLightState\nvar WeakLightState = function (light) {\nthis.light = light;\n};\nWeakLightState.prototype.buttonWasPressed = function () {\nconsole.log('强光');\n// weakLightState对应的行为"),n("br"),t._v("\nthis.light.setState(this.light.strongLightState); // 切换状态到strongLightState\n};\n// StrongLightState：\nvar StrongLightState = function (light) {\nthis.light = light;\n};\nStrongLightState.prototype.buttonWasPressed = function () {\nconsole.log('关灯');\n// strongLightState对应的行为"),n("br"),t._v("\nthis.light.setState(this.light.offLightState); // 切换状态到offLightState\n};")])])}),[],!1,null,null,null);e.default=a.exports}}]);