## 组件两种注册方式

### 全局注册 

``` js
Vue.component('my-test', {
    template: '<div>{{test}}</div>',
    data () {
        return {
            test: 1212
        }
    }
})
var vm = new Vue({
    el: '#app',
    template: '<div id="app"><my-test><my-test/></div>'
})
```

### 局部注册

``` js
var myTest = {
    template: '<div>{{test}}</div>',
    data () {
        return {
            test: 1212
        }
    }
}
var vm = new Vue({
    el: '#app',
    component: {
        myTest
    }
})
```
### 注册过程


`Vue.component(name, {...})`进行组件注册,是在Vue源码引入阶段定义的静态方法。[去这里](/blog/vue/vue源码-1-丰富的选项合并策略.html#vue构造器)

``` js
// 初始化全局api
initAssetRegisters(Vue);
var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
];
function initAssetRegisters(Vue){
    // 定义ASSET_TYPES中每个属性的方法，其中包括component
    ASSET_TYPES.forEach(function (type) {
    // type: component,directive,filter
      Vue[type] = function (id,definition) {
          if (!definition) {
            // 直接返回注册组件的构造函数
            return this.options[type + 's'][id]
          }
          ...
          if (type === 'component') {
            // 验证component组件名字是否合法
            validateComponentName(id);
          }
          if (type === 'component' && isPlainObject(definition)) {
            // 组件名称设置
            definition.name = definition.name || id;
            // Vue.extend() 创建子组件，返回子类构造器
            definition = this.options._base.extend(definition);
          }
          // 为Vue.options 上的component属性添加将子类构造器
          this.options[type + 's'][id] = definition;
          return definition
        }
    });
}

```

`Vue.components`有两个参数，一个是需要注册组件的组件名，另一个是组件选项，如果第二个参数没有传递，则会直接返回注册过的组件选项。否则意味着需要对该组件进行注册.

* 注册过程先会对组件名的**合法性进行检测**，要求组件名不允许出现非法的标签，包括Vue内置的组件名，如`slot`, `component`等。

``` js
function validateComponentName(name) {
    if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
      // 正则判断检测是否为非法的标签
      warn(
        'Invalid component name: "' + name + '". Component names ' +
        'should conform to valid custom element name in html5 specification.'
      );
    }
    // 不能使用Vue自身自定义的组件名，如slot, component,不能使用html的保留标签，如 h1, svg等
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + name
      );
    }
  }

```

* 在经过组件名的合法性检测后，会调用extend方法为组件创建一个子类构造器，此时的`this.options._base`代表的就是Vue构造器。extend方法会基于父类去创建一个子类，此时的父类是Vue，并且创建过程子类会继承父类的方法，并会和父类的选项进行合并，最终返回一个子类构造器。

* `Vue.component()`默认会把第一个参数作为组件名称，但是如果组件选项有`name`属性时，`name`属性值会将组件名覆盖。

* 全局注册组件就是Vue实例化前创建一个基于Vue的子类构造器，并将组件的信息加载到实例`options.components`对象中。

## 组件Vnode创建

`createComponent`是创建组件`Vnode`的过程，创建过程会再次合并选项配置，并安装组件相关的内部钩子，最后通过`new Vnode()`生成以`vue-component`开头的`Virtual DOM`

``` js
// 内部执行将render函数转化为Vnode的函数
function _createElement(context,tag,data,children,normalizationType) {
  ···
  if (typeof tag === 'string') {
    // 子节点的标签为普通的html标签，直接创建Vnode
    if (config.isReservedTag(tag)) {
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    // 子节点标签为注册过的组件标签名，则子组件Vnode的创建过程
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // 创建子组件Vnode
      vnode = createComponent(Ctor, data, context, children, tag);
    }
  }
}

```

config.isReservedTag(tag)用来判断标签是否为普通的html标签，如果是普通节点会直接创建Vnode节点，如果不是，则需要判断这个占位符组件是否已经注册到，我们可以通过context.$options.components[组件名]拿到注册后的组件选项。如何判断组件是否已经全局注册，看看resolveAsset的实现。

``` js
// 需要明确组件是否已经被注册
  function resolveAsset (options,type,id,warnMissing) {
    // 标签为字符串
    if (typeof id !== 'string') {
      return
    }
    // 这里是 options.component
    var assets = options[type];
    // 这里的分支分别支持大小写，驼峰的命名规范
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
      warn(
        'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
        options
      );
    }
    // 最终返回子类的构造器
    return res
  }
```

拿到注册过的子类构造器后，调用`createComponent`方法创建子组件Vnode

``` js
// 创建子组件过程
  function createComponent (
    Ctor, // 子类构造器
    data,
    context, // vm实例
    children, // 子节点
    tag // 子组件占位符
  ) {
    ···
    // Vue.options里的_base属性存储Vue构造器
    var baseCtor = context.$options._base;

    // 针对局部组件注册场景
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }
    data = data || {};
    // 构造器配置合并
    resolveConstructorOptions(Ctor);
    // 挂载组件钩子
    installComponentHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    // 创建子组件vnode，名称以 vue-component- 开头
    var vnode = new VNode(("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),data, undefined, undefined, undefined, context,{ Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },asyncFactory);

    return vnode
  }
```

``` js
  // 组件内部自带钩子
 var componentVNodeHooks = {
    init: function init (vnode, hydrating) {
    },
    prepatch: function prepatch (oldVnode, vnode) {
    },
    insert: function insert (vnode) {
    },
    destroy: function destroy (vnode) {
    }
  };
var hooksToMerge = Object.keys(componentVNodeHooks);
// 将componentVNodeHooks 钩子函数合并到组件data.hook中 
function installComponentHooks (data) {
    var hooks = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks[key];
      var toMerge = componentVNodeHooks[key];
      // 如果钩子函数存在，则执行mergeHook$1方法合并
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
      }
    }
  }
function mergeHook$1 (f1, f2) {
  // 返回一个依次执行f1,f2的函数
    var merged = function (a, b) {
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged
  }
```
组件默认自带的这几个钩子函数会在后续`patch`过程的不同阶段执行
## 组件Vnode渲染真实DOM

不管是全局注册的组件还是局部注册的组件，组件并没有进行实例化，那么组件实例化的过程发生在哪个阶段呢？

* 经过`vm._render()`生成完整的`Virtual Dom`树后，紧接着执行`Vnode`渲染真实DOM的过程,这个过程是`vm.update()`方法的执行，而其核心是`vm.__patch__`。
* `vm.__patch__`内部会通过 `createElm`去创建真实的DOM元素，期间遇到子`Vnode`会递归调用`createElm`方法。
* 递归调用过程中，判断该节点类型是否为组件类型是通过`createComponent`方法判断的，该方法和渲染Vnode阶段的方法`createComponent`不同，他会调用**子组件的init初始化钩子函数，并完成组件的DOM**插入。
* init初始化钩子函数的核心是new实例化这个子组件并将子组件进行挂载，实例化子组件的过程又回到合并配置，初始化生命周期，初始化事件中心，初始化渲染的过程。实例挂载又会执行$mount过程。
* 完成所有子组件的实例化和节点挂载后，最后才回到根节点的挂载。

`__patch__`核心代码是通过`createElm`创建真实节点，当创建过程中遇到子`vnode`时，会调用`createChildren`,`createChildren`的目的是对**子vnode递归调用createElm创建子组件节点**。

``` js
// 创建真实dom
function createElm (vnode,insertedVnodeQueue,parentElm,refElm,nested,ownerArray,index) {
  ···
  // 递归创建子组件真实节点,直到完成所有子组件的渲染才进行根节点的真实节点插入
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }
  ···
  var children = vnode.children;
  // 
  createChildren(vnode, children, insertedVnodeQueue);
  ···
  insert(parentElm, vnode.elm, refElm);
}
function createChildren(vnode, children, insertedVnodeQueue) {
  for (var i = 0; i < children.length; ++i) {
    // 遍历子节点，递归调用创建真实dom节点的方法 - createElm
    createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
  }
}
```

`createComponent`方法会对子组件Vnode进行处理中，还记得在Vnode生成阶段为子Vnode安装了一系列的钩子函数吗，在这个步骤我们可以通过是否拥有这些定义好的钩子来判断是否是已经注册过的子组件，如果条件满足，则执行组件的init钩子。

init钩子做的事情只有两个，实例化组件构造器，执行子组件的挂载流程
```
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  var i = vnode.data;
  // 是否有钩子函数可以作为判断是否为组件的唯一条件
  if (isDef(i = i.hook) && isDef(i = i.init)) {
    // 执行init钩子函数
    i(vnode, false /* hydrating */);
  }
  ···
}
var componentVNodeHooks = {
  // 忽略keepAlive过程
  // 实例化
  var child = vnode.componentInstance = createComponentInstanceForVnode(vnode,activeInstance);
  // 挂载
  child.$mount(hydrating ? vnode.elm : undefined, hydrating);
}
function createComponentInstanceForVnode(vnode, parent) {
  ···
  // 实例化Vue子组件实例
  return new vnode.componentOptions.Ctor(options)
}
```

显然Vnode生成真实DOM的过程也是一个不断递归创建子节点的过程，patch过程如果遇到子Vnode,会优先实例化子组件，并且执行子组件的挂载流程，而挂载流程又会回到_render,_update的过程。在所有的子Vnode递归挂载后，最终才会真正挂载根节点。


## 建立组件联系

日常开发中，我们可以通过`vm.$parent`拿到父实例，也可以在父实例中通过`vm.$children`拿到实例中的子组件。显然，Vue在组件和组件之间建立了一层关联。

不管是父实例还是子实例，在初始化实例阶段有一个`initLifecycle`的过程。这个过程会把当前实例添加到父实例的`$children`属性中，并设置自身的`$parent`属性指向父实例。

``` js
function initLifecycle (vm) {
    var options = vm.$options;
    // 子组件注册时，会把父组件的实例挂载到自身选项的parent上
    var parent = options.parent;
    // 如果是子组件，并且该组件不是抽象组件时，将该组件的实例添加到父组件的$parent属性上，如果父组件是抽象组件，则一直往上层寻找，直到该父级组件不是抽象组件，并将，将该组件的实例添加到父组件的$parent属性
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
        }
        parent.$children.push(vm);
    }
    // 将自身的$parent属性指向父实例。
    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    // 该实例是否挂载
    vm._isMounted = false;
    // 该实例是否被销毁
    vm._isDestroyed = false;
    // 该实例是否正在被销毁
    vm._isBeingDestroyed = false;
}
```
