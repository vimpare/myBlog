# 基础的数据代理检测

数据代理的另一个说法是数据劫持

代理使得数据在访问时进行依赖收集，在修改更新时对依赖进行更新

`Object.defineProperty`和`Proxy`都可以实现数据代理，但是他们各有优劣，前者兼容性较好，但是却无法对数组或者嵌套的对象进行代理监测，而Proxy基本可以解决所有的问题，但是对兼容性要求很高。

Vue中的响应式系统是以`Object.defineProperty`实现的，但是这并不代表没有Proxy的应用。`initProxy`就是其中的例子，这层代理会在模板渲染时对一些非法或者没有定义的变量进行筛选判断，和没有数据代理相比，非法的数据定义错误会提前到应用层捕获，这也有利于开发者对错误的排查。

## Object.defineProperty

::: tip
Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
:::

``` js
Object.defineProperty(obj, prop, descriptor)
```

`Object.defineProperty()`可以用来精确添加或修改对象的属性，只需要在`descriptor`对象中将属性特性描述清楚，descriptor的属性描述符有两种形式，一种是数据描述符，另一种是存取描述符，我们分别看看各自的特点。

- 数据描述符，它拥有四个属性配置
  
  ```
    configurable：数据是否可删除，可配置
    enumerable：属性是否可枚举
    value：属性值,默认为undefined
    writable：属性是否可读写
    ```

- 存取描述符，它同样拥有四个属性选项

    ```
    configurable：数据是否可删除，可配置
    enumerable：属性是否可枚举
    get:一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。
    set:一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。
    ```

需要注意的是: 数据描述符的value，writable 和 存取描述符中的get, set属性不能同时存在，否则会抛出异常。

getter方法可以让我们在访问数据时做额外的操作处理，setter方法使得我们可以在数据更新时修改返回的结果。

``` js
var o = {}
var value;
Object.defineProperty(o, 'a', {
    get() {
        console.log('获取值')
        return value
    },
    set(v) {
        console.log('设置值')
        value = qqq
    }
})
o.a = 'sss' 
// 设置值
console.log(o.a)
// 获取值
// 'qqq'
```

**已知长度的数组是可以通过索引属性来设置属性的访问器属性的。**
但是数组的添加确无法进行拦截，这个也很好理解，不管是通过`arr.push()`还是`arr[10] = 10`添加的数据，数组所添加的索引值并没有预先加入数据拦截中，所以自然无法进行拦截处理。这个也是使用`Object.defineProperty`进行数据代理的弊端。

如果需要拦截的对象属性嵌套多层，如果没有递归去调用`Object.defineProperty`进行拦截，深层次的数据也依然无法监测。

## Proxy

es6引入了Proxy的概念

Proxy针对目标对象会创建一个新的实例对象，并将目标对象代理到新的实例对象上

``` js
var obj = {}
var nobj = new Proxy(obj, {
    get(target, key, receiver) {
        console.log('获取值')
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        console.log('设置值')
        return Reflect.set(target, key, value, receiver)
    }
})

nobj.a = '代理'
console.log(obj)
// 结果
// 设置值
{a: "代理"}
```

## initProxy

``` js
Vue.prototype._init = function(options) {
    // 选项合并
    ...
    {
        // 对vm实例进行一层代理
        initProxy(vm);
    }
    ...
}
```

``` js
// 代理函数
var initProxy = function initProxy (vm) {

    if (hasProxy) {
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped
            ? getHandler
            : hasHandler;
        // 代理vm实例到vm属性_renderProxy
        vm._renderProxy = new Proxy(vm, handlers);
    } else {
        vm._renderProxy = vm;
    }
};
```

Vue内部在js和真实DOM节点中设立了一个中间层，这个中间层就是`Virtual DOM`，遵循`js -> virtual -> 真实dom的转换过程`,而`Vue.prototype._render`是前半段的转换，当我们调用render函数时，代理的`vm._renderProxy`对象便会访问到。

``` js
Vue.prototype._render = function () {
    ···
    // 调用vm._renderProxy
    vnode = render.call(vm._renderProxy, vm.$createElement);
}
```

### handlers的实现

`handers`函数会根据 `options.render._withStripped`的不同执行不同的代理函数，当使用类似webpack这样的打包工具时，通常会使用`vue-loader`插件进行模板的编译，这个时候`options.render`是存在的，并且_withStripped的属性也会设置为true
所以此时代理的选项是`hasHandler`,在其他场景下，代理的选项是`getHandler`。getHandler,hasHandler的逻辑相似。

**key in obj或者with作用域时，会触发has的钩子**

**render函数就是包装成with的执行语句,在执行with语句的过程中，该作用域下变量的访问都会触发has钩子**，这也是模板渲染时之所有会触发代理拦截的原因。

``` js
var hasHandler = {
    // key in obj或者with作用域时，会触发has的钩子
    has: function has (target, key) {
        ···
    }
};
```

通过data选项去设置实例数据，那么这些数据可以随着个人的习惯任意命名吗？显然不是的，如果你使用js的关键字(像Object,Array,NaN)去命名,这是不被允许的。另一方面，Vue源码内部使用了以$,_作为开头的内部变量，所以以$,_开头的变量名也是不被允许的，这就构成了数据过滤监测的前提。

``` js
var hasHandler = {
    has: function has (target, key) {
        var has = key in target;
        // isAllowed用来判断模板上出现的变量是否合法。
        var isAllowed = allowedGlobals(key) ||
            (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
            // _和$开头的变量不允许出现在定义的数据中，因为他是vue内部保留属性的开头。
        // 1. warnReservedPrefix: 警告不能以$ _开头的变量
        // 2. warnNonPresent: 警告模板出现的变量在vue实例中未定义
        if (!has && !isAllowed) {
            if (key in target.$data) { warnReservedPrefix(target, key); }
            else { warnNonPresent(target, key); }
        }
        return has || !isAllowed
    }
};
```

代理的对象`vm.renderProxy`是在执行_render函数中访问的，而在使用了`template`模板的情况下，render函数是对模板的解析结果，换言之，之所以会触发数据代理拦截是因为模板中使用了变量，例如`<div>{{message}}}</div>`。而如果我们在模板中使用了未定义的变量，这个过程就被proxy拦截，并定义为不合法的变量使用。
