(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{551:function(t,e,n){"use strict";n.r(e);var i=n(62),s=Object(i.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h4",{attrs:{id:"从文件中读取数据"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#从文件中读取数据"}},[t._v("#")]),t._v(" 从文件中读取数据")]),t._v(" "),n("p",[n("strong",[t._v("读取整个文件：")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("with open('pi_digits.txt') as file_object:\n    contents=file_object.read()\n    print(contents)\n    print(line.rstrip())\n")])])]),n("ul",[n("li",[t._v("函数"),n("code",[t._v("open()")]),t._v(" 接受一个参数：要打开的文件的名称,返回一个表示文件的对象。")]),t._v(" "),n("li",[t._v("关键字with 在不再需要访问文件后将其关闭。")]),t._v(" "),n("li",[t._v("方法"),n("code",[t._v("read()")]),t._v(" （前述程序的第2行）读取这个文件的全部内容，并将其作为一个长长的字符串存储在变量"),n("code",[t._v("contents")]),t._v("中。\n*Python方法"),n("code",[t._v("rstrip()")]),t._v(" 删除（剥除）字符串末尾的空白")])]),t._v(" "),n("p",[n("strong",[t._v("逐行读取：")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("with open('pi_digits.txt') as file_object:    \n     for line in file_object:\n         print(line.rstrip())\n")])])]),n("p",[t._v("以每次一行的方式检查文件，可对文件对象使用for 循环")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("readlines()")]),t._v(" 从文件中读取每一行，并将其存储在一个列表中")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("with open('pi_digits.txt') as file_object:\n    # contents=file_object.read()\n    # print(contents)\n    # for line in file_object:\n    #     print(line.rstrip())\n    lines=file_object.readlines()\npi_string=''\nfor line in lines:\n    # print(line)\n    pi_string+=line.strip()\n    \n# print(pi_string[:52]+'...')\nbirthday = input('输入生日')\nif birthday in pi_string:\n    print('in')\nelse:\n    print('no')\n")])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("with open('learning_python.txt',encoding='UTF-8') as file_object:\n        contents=file_object.read()\n        print(contents)\n        print(file_object.readlines())\n        lines=file_object.readlines\nprint(lines)\n")])])]),n("h4",{attrs:{id:"写入文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#写入文件"}},[t._v("#")]),t._v(" 写入文件")]),t._v(" "),n("p",[t._v("要将文本写入文件，你在调用open() 时需要提供另一个实参")]),t._v(" "),n("ul",[n("li",[t._v("调用open() 时提供了两个实参。")]),t._v(" "),n("li",[t._v("第一个实参也是要打开的文件的名称；")]),t._v(" "),n("li",[t._v("第二个实参（'w' ）告诉Python，我们要以写入模式打开这个文件。")]),t._v(" "),n("li",[t._v("打开文件 时，可指定读取模式 （'r' ）、写入模式 （'w' ）、附加模式 （'a' ）或让你能够读取和写入文件的模式（'r+' ）。")]),t._v(" "),n("li",[n("code",[t._v("write()")]),t._v(" 将一个字符串写入文件")]),t._v(" "),n("li",[t._v("你以附加模式打开文件时，Python不会在返回文件对象前清空文件，而你写入到文件的行都将添加 到文件末尾。如果指定的文件不存在，Python将为你创建一个空文件。")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("# file_name='i.txt'\n# with open(file_name,'a') as file_object:\n#     file_object.write('dddddd')\n\n\n# str=input('输入名字：')\n# with open('guest_book.txt','w') as file_object:\n#     file_object.write(str)\nwhile True:\n    name = input('输入名字：')\n    print('hello',name)\n    with open('guest_book.txt','a') as file_object:\n        file_object.write(name+'\\n')\n")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);