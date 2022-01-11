渲染函数是如何转换为可视化DOM节点的???
## Virtual DOM

回流

重绘

**虚拟DOM**是为了解决频繁操作DOM引发性能问题的产物。Virtual DOM是将页面的状态抽象为JS对象的形式，本质上是JS和真实DOM的中间层，当我们想用JS脚本大批量进行DOM操作时，会优先作用于Virtual DOM这个JS对象，最后通过对比将要改动的部分通知并更新到真实的DOM。尽管最终还是操作真实的DOM，但Virtual DOM可以将多个改动合并成一个批量的操作，从而减少 DOM 重排的次数，进而缩短了生成渲染树和绘制所花的时间。

```
// 真实DOM
<div id="real"><span>dom</span></div>

// 真实DOM对应的JS对象
{
    tag: 'div',
    data: {
        id: 'real'
    },
    children: [{
        tag: 'span',
        children: 'dom'
    }]
}
```

## Vnode

Vnode这个构造函数去描述一个DOM节点

### Vnode构造函数

``` js
var VNode = function VNode (tag,data,children,text,elm,context,componentOptions,asyncFactory) {
    this.tag = tag; // 标签
    this.data = data;  // 数据
    this.children = children; // 子节点
    this.text = text;
    ···
    ···
};
```
`Vnode`定义的属性差不多有20几个，显然用`Vnode`对象要比真实DOM对象描述的内容要简单得多，它只用来单纯描述节点的关键属性，例如标签名，数据，子节点等。并没有保留跟浏览器相关的DOM方法。


### 创建Vnode注释节点

``` js
// 创建注释vnode节点
var createEmptyVNode = function (text) {
    if ( text === void 0 ) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true; // 标记注释节点
    return node
};
```

### 创建Vnode文本节点

``` js
// 创建文本vnode节点
function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
}

```

### 克隆vnode

``` js
function cloneVNode (vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned
  }
```

注意：`cloneVnode`对`Vnode`的克隆只是一层浅拷贝，它不会对子节点进行深度克隆。



## Virtual DOM的创建
回顾流程
``` js {8}
Vue.prototype.$mount = function(el, hydrating) {
    ···
    return mountComponent(this, el)
}
function mountComponent() {
    ···
    updateComponent = function () {
        vm._update(vm._render(), hydrating);
    };
}
```
**如何将render函数转化为Virtual DOM的???**

``` js {9}
// 引入Vue时，执行renderMixin方法，该方法定义了Vue原型上的几个方法，其中一个便是 _render函数
renderMixin();//
function renderMixin() {
    Vue.prototype._render = function() {
        var ref = vm.$options;
        var render = ref.render;
        ···
        try {
            vnode = render.call(vm._renderProxy, vm.$createElement);
        } catch (e) {
            ···
        }
        ···
        return vnode
    }
}
```

`_render`函数的核心是`render.call(vm._renderProxy, vm.$createElement)`部分

`vm._renderProxy`是为了做数据过滤检测，它也绑定了`render`函数执行时的this指向。

`vm.$createElement`方法会作为`render`函数的参数传入。

> 在手写`render`函数时，我们会利用`render`函数的第一个参数`createElement`进行渲染函数的编写，这里的`createElement`参数就是定义好的`$createElement`方法。

``` js {3,4}
new Vue({
    el: '#app',
    render: function(createElement) {
        return createElement('div', {}, this.message)
    },
    data() {
        return {
            message: 'dom'
        }
    }
})
```

初始化`_init`时，有一个`initRender`函数，它就是用来定义渲染函数方法的，其中就有`vm.$createElement`方法的定义，除了`$createElement`，`_c`方法的定义也类似。其中 `vm._c` 是template内部编译成render函数时调用的方法，`vm.$createElement`是手写render函数时调用的方法。两者的唯一区别仅仅是最后一个参数的不同。

通过模板生成的`render`方法可以保证子节点都是Vnode，而手写的render需要一些检验和转换。

``` js
function initRender(vm) {
    vm._c = function(a, b, c, d) { return createElement(vm, a, b, c, d, false); }
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

```

`createElement` 方法实际上是对 `_createElement` 方法的封装，在调用`_createElement`前，它会先对传入的参数进行处理.


``` js
function createElement (
    context, // vm 实例
    tag, // 标签
    data, // 节点相关数据，属性
    children, // 子节点
    normalizationType,
    alwaysNormalize // 区分内部编译生成的render还是手写render
  ) {
    // 对传入参数做处理，如果没有data，则将第三个参数作为第四个参数使用，往上类推。
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    // 根据是alwaysNormalize 区分是内部编译使用的，还是用户手写render使用的
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType) // 真正生成Vnode的方法
  }
```

=========================================================================================================================
## 虚拟Vnode映射成真实DOM