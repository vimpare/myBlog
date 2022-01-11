# TypeScript 

两个最重要的特性——类型系统、适用于任何规模。

## 类型系统

js没有类型约束，存在隐式类型转换，面向对象编程时，原型的属性和方法可以被修改；
typescript的类型转换弥补的js的缺陷。

### TypeScript 是静态类型

**类型系统**按照「类型检查的时机」来分类，可以分为**动态类型**和**静态类型**。

**动态类型**是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。

**静态类型**是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。

TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型。

### TypeScript 是弱类型

类型系统按照「是否允许隐式类型转换」来分类，可以分为**强类型**和**弱类型**。

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型。


* TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
* TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
* TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
* TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
* TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
* TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。


## 安装

`npm install -g typescript`

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。

编译一个 TypeScript 文件很简单：

`tsc hello.ts`

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx` 为后缀。