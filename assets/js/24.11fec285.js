(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{532:function(a,t,e){"use strict";e.r(t);var n=e(62),l=Object(n.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p",[a._v("canvas getImageData() 方法")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('var c=document.getElementById("myCanvas");\nvar ctx=c.getContext("2d");\nctx.fillStyle="red";\nctx.fillRect(10,10,50,50);\n\nfunction copy()\n{\nvar imgData=ctx.getImageData(10,10,50,50);\nctx.putImageData(imgData,10,70);\n}\n')])])]),e("p",[a._v("getImageData() 方法返回 ImageData 对象，该对象拷贝了画布指定矩形的像素数据。")]),a._v(" "),e("p",[a._v("对于 ImageData 对象中的每个像素，都存在着四方面的信息，即 RGBA 值：")]),a._v(" "),e("p",[a._v("R - 红色 (0-255)\nG - 绿色 (0-255)\nB - 蓝色 (0-255)\nA - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)\ncolor/alpha 以数组形式存在，并存储于 ImageData 对象的 data 属性中。\n以下代码可获得被返回的 ImageData 对象中第一个像素的 color/alpha 信息：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("red=imgData.data[0];\ngreen=imgData.data[1];\nblue=imgData.data[2];\nalpha=imgData.data[3];\n")])])])])}),[],!1,null,null,null);t.default=l.exports}}]);