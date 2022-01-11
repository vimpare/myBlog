# 丰富的选项合并策略

```
├─dist                   # 项目构建后的文件
├─scripts                # 与项目构建相关的脚本和配置文件
├─flow                   # flow的类型声明文件
├─src                    # 项目源代码
│    ├─complier          # 与模板编译相关的代码
│    ├─core              # 通用的、与运行平台无关的运行时代码
│    │  ├─observe        # 实现变化侦测的代码
│    │  ├─vdom           # 实现virtual dom的代码
│    │  ├─instance       # Vue.js实例的构造函数和原型方法
│    │  ├─global-api     # 全局api的代码
│    │  └─components     # 内置组件的代码
│    ├─server            # 与服务端渲染相关的代码
│    ├─platforms         # 特定运行平台的代码，如weex
│    ├─sfc               # 单文件组件的解析代码
│    └─shared            # 项目公用的工具代码
└─test                   # 项目测试代码
```

## Vue的引入

### 基础使用

``` html {2}
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.8/dist/vue.js"></script>
<script>
var vm = new Vue({
  el: '#app',
  data: {
    message: '选项合并'
  },
})
</script>
```

### Vue构造器

``` js
(function (global, factory) {
  // 遵循UMD规范
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, function () { 'use strict';
  ···
  // Vue 构造函数
  function Vue (options) {
    // 保证了无法直接通过Vue()去调用，只能通过new的方式去创建实例
    if (!(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }
  return Vue
})
```

打包后的源码是遵从UMD规范的，它是commonjs和amd的整合。而**Vue的本质是一个构造器,并且它保证了只能通过new实例的形式去调用，而不能直接通过函数的形式使用**。

#### 定义原型属性方法

``` js
// 定义Vue原型上的init方法(内部方法)
  initMixin(Vue);
// 定义原型上跟数据相关的属性方法
  stateMixin(Vue);
//定义原型上跟事件相关的属性方法
  eventsMixin(Vue);
// 定义原型上跟生命周期相关的方法
  lifecycleMixin(Vue);
// 定义渲染相关的函数
  renderMixin(Vue);
```

##### initMixin

 定义了内部在实例化Vue时会执行的初始化代码，它是一个内部使用的方法。

``` js
function initMixin (Vue) {
  Vue.prototype._init = function (options) {}
}
```

##### stateMixin

定义跟数据相关的属性方法，例如代理数据的访问，我们可以在实例上通过`this.$data`和`this.$props`访问到data,props的值，并且也定义了使用频率较高的`this.$set`,`this.$delete`等方法。

``` js
function stateMixin (Vue) {
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    {
      dataDef.set = function () {
        warn(
          'Avoid replacing instance root $data. ' +
          'Use nested data properties instead.',
          this
        );
      };
      propsDef.set = function () {
        warn("$props is readonly.", this);
      };
    }
    // 代理了_data,_props的访问
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);
    // $set, $del
    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    // $watch
    Vue.prototype.$watch = function (expOrFn,cb,options) {};
  }
```

###### eventsMixin

会对原型上的事件相关方法做定义，`vm.$on,vm.$once,vm.$off,vm.$emit`也就是在这里定义的。

``` js
function eventsMixin(Vue) {
  // 自定义事件监听
  Vue.prototype.$on = function (event, fn) {};
  // 自定义事件监听,只触发一次
  Vue.prototype.$once = function (event, fn) {}
  // 自定义事件解绑
  Vue.prototype.$off = function (event, fn) {}
  // 自定义事件通知
  Vue.prototype.$emit = function (event, fn) {
}
```

##### lifecycleMixin,renderMixin

两个都可以算是对生命周期渲染方法的定义，例如`$forceUpdate`触发实例的强制刷新，`$nextTick`将回调延迟到下次 DOM 更新循环之后执行等。

``` js
// 定义跟生命周期相关的方法
  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {};

    Vue.prototype.$forceUpdate = function () {};

    Vue.prototype.$destroy = function () {}
  }

// 定义原型上跟渲染相关的方法
  function renderMixin (Vue) {
    Vue.prototype.$nextTick = function (fn) {};
    // _render函数，后面会着重讲
    Vue.prototype._render = function () {};
  }

```

#### 定义静态属性方法

全局api方法，这些都是在`initGlobalAPI`中定义的

``` js
/* 初始化构造器的api */
function initGlobalAPI (Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    {
      configDef.set = function () {
        warn(
          'Do not replace the Vue.config object, set individual fields instead.'
        );
      };
    }
    // 通过Vue.config拿到配置信息
    Object.defineProperty(Vue, 'config', configDef);

    // 工具类不作为公共暴露的API使用
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive###1
    };

    // Vue.set = Vue.prototype.$set
    Vue.set = set;
    // Vue.delete = Vue.prototype.$delete
    Vue.delete = del;
    // Vue.nextTick = Vue.prototype.$nextTick
    Vue.nextTick = nextTick;

    // 2.6 explicit observable API
    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };

    // 构造函数的默认选项默认为components,directive,filter, _base
    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // options里的_base属性存储Vue构造器
    Vue.options._base = Vue;
    extend(Vue.options.components, builtInComponents);
    // Vue.use()
    initUse(Vue);
    // Vue.mixin()
    initMixin$1(Vue);
    // 定义extend扩展子类构造器的方法
    // Vue.extend()
    initExtend(Vue);
    // Vue.components, Vue.directive, Vue.filter
    initAssetRegisters(Vue);
  }

initGlobalAPI(Vue);
```

- 为源码里的config配置做一层代理，可以通过Vue.config拿到默认的配置，并且可以修改它的属性值，具体哪些可以配置修改，可以先参照官方文档。
- 定义内部使用的工具方法，例如警告提示，对象合并等。
- 定义set,delete,nextTick方法，本质上原型上也有这些方法的定义。
- 对Vue.components,Vue.directive,Vue.filter的定义
- 定义Vue.use()方法
- 定义Vue.mixin()方法
- 定义Vue.extend()方法

## 构造器的默认选项

在实例化Vue时，我们会将选项对象传递给构造器进行初始化。

在`initGlobalAPI`方法中有几行默认选项的定义。Vue内部的默认选项会保留在静态的options属性上，从源码看Vue自身有四个默认配置选项，分别是`component`，`directive`， `filter`以及返回自身构造器的`_base`。

``` js
var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];
// 原型上创建了一个指向为空对象的options属性
Vue.options = Object.create(null); 
ASSET_TYPES.forEach(function (type) {
  Vue.options[type + 's'] = Object.create(null);
});
Vue.options._base = Vue;

// Vue内置组件
var builtInComponents = {
  KeepAlive: KeepAlive
};
var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
// Vue 内置指令，例如： v-model, v-show
var platformDirectives = {
  model: directive,
  show: show
}
extend(Vue.options.components, builtInComponents); 
extend(Vue.options.components, platformComponents); // 扩展内置组件
extend(Vue.options.directives, platformDirectives);  // 扩展内置指令
```

`components`是需要注册的组件选项，`directives`是需要注册的指令，而`filter`则代表需要注册的过滤器。从代码的实现细节看，Vue为components提供了keepAlive,transition,transitionGroup的内置组件，为directives提供了v-model,v-show的内置指令，而过滤器则没有默认值。

Vue默认的资源选项配置如下：

``` js
Vue.options = {
  components: {
    KeepAlive: {}
    Transition: {}
    TransitionGroup: {}
  },
  directives: {
    model: {inserted: ƒ, componentUpdated: ƒ}
    show: {bind: ƒ, update: ƒ, unbind: ƒ}
  },
  filters: {}
  _base
}
```

## 选项检验

Vue做的核心操作便是执行_init方法进行初始化

``` js
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    // 记录实例化多少个vue对象
    vm._uid = uid$3++;

    // 选项合并，将合并后的选项赋值给实例的$options属性
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor), // 返回Vue构造函数自身的配置项
      options || {},
      vm
    );
  };
}
```

关键的第一步就是对选项的合并。合并后的选项会挂载到实例的`$options`属性中。(你可以先在实例中通过`this.$options`访问最终的选项)

``` js
function mergeOptions (parent,child,vm) {
    {
      checkComponents(child);
    }
    if (typeof child === 'function') {
      child = child.options;
    }
    // props,inject,directives的校验和规范化
    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child);

    // 针对extends扩展的子类构造器
    if (!child._base) {
      // extends
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      // mixins
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }

    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      // 拿到各个选择指定的选项配置，如果没有则用默认的配置
      var strat = strats[key] || defaultStrat;
      // 执行各自的合并策略
      options[key] = strat(parent[key], child[key], vm, key);
    }
    // console.log(options)
    return options
  }
```

### components规范检验

如果项目中需要使用到组件，我们会在vue实例化时传入组件选项以此来注册组件。因此，组件命名需要遵守很多规范，比如组件名不能用html保留的标签(如：img,p),也不能包含非法的字符等。这些都会在`validateComponentName`函数做校验。

``` js
// components规范检查函数
function checkComponents (options) {
  // 遍历components对象，对每个属性值校验。
  for (var key in options.components) {
    validateComponentName(key);
  }
}
function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    // 正则判断检测是否为非法的标签，例如数字开头
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

### props规范检验

`props`选项的书写形式有两种，分别是

- 数组形式 { props: ['a', 'b', 'c'] },
- 带校验规则的对象形式 { props: { a: { type: 'String', default: 'prop校验' } }} 从源码上看，两种形式最终都会转换成对象的形式。

``` js
 function normalizeProps (options, vm) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    // props选项数据有两种形式，一种是['a', 'b', 'c'],一种是{ a: { type: 'String', default: 'hahah' }}
    // 数组
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          // 默认将数组形式的props转换为对象形式。
          res[name] = { type: null }; 
        } else {
          // 规则：保证是字符串
          warn('props must be strings when using array syntax.');
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    } else {
      // 非数组，非对象则判定props选项传递非法
      warn(
        "Invalid value for option \"props\": expected an Array or an Object, " +
        "but got " + (toRawType(props)) + ".",
        vm
      );
    }
    options.props = res;
  }
```

### inject的规范校验

依赖注入使得组件后代都能访问到父代注入的数据/方法，且后代不需要知道数据的来源。重要的一点，依赖提供的数据是非响应式的。

``` js
// 父组件
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}
// 后代组件
var Child = {
  // 数组写法
  inject: ['foo'],
  // 对象写法
  inject: {
    foo: {
      from: 'foo',
      default: 'bardefault'
    }
  }
}
```

inject选项有两种写法，数组的方式以及对象的方式，和props的校验规则一致，最终inject都会转换为对象的形式存在。

``` js
function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    var normalized = options.inject = {};
    //数组的形式
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        // from: 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol)
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      // 对象的处理
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val)
          ? extend({ from: key }, val)
          : { from: val };
      }
    } else {
      // 非法规则
      warn(
        "Invalid value for option \"inject\": expected an Array or an Object, " +
        "but got " + (toRawType(inject)) + ".",
        vm
      );
    }
  }
```

### directive的规范校验

``` js
{
  directives: {
    'color-swatch': function(el, binding) {
        el.style.backgroundColor = binding.value
    }
  }
}


function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def###1 = dirs[key];
        // 函数简写同样会转换成对象的形式
        if (typeof def###1 === 'function') {
          dirs[key] = { bind: def###1, update: def###1 };
        }
      }
    }
  }
```

## 子类构造器

Vue提供了一个`Vue.extend`的静态方法，它是基于基础的Vue构造器创建一个“子类”，而这个子类所传递的选项配置会和父类的选项配置进行合并。这是选项合并场景的由来。

``` js
Vue.extend = function (extendOptions) {
  extendOptions = extendOptions || {};
  var Super = this;

  var name = extendOptions.name || Super.options.name;
  if (name) {
    validateComponentName(name); // 校验子类的名称是否符合规范
  }

  // 创建子类构造器
  var Sub = function VueComponent (options) {
    this._init(options);
  };
  Sub.prototype = Object.create(Super.prototype); // 子类继承于父类
  Sub.prototype.constructor = Sub;
  Sub.cid = cid++;
  // 子类和父类构造器的配置选项进行合并
  Sub.options = mergeOptions(
    Super.options,
    extendOptions
  );

  return Sub // 返回子类构造函数
};
```

## 合并策略

data,component,mounted等。如果合并的子父配置都具有相同的选项，则只需要按照规定好的策略进行选项合并即可。
有子类配置选项则默认使用子类配置选项，没有则选择父类配置选项

``` js
function mergeOptions ( parent, child, vm ) {
  ···
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    // 如果有自定义选项策略，则使用自定义选项策略，否则选择使用默认策略。
    var strat = strats[key] || defaultStrat; 
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options
}
```

子配置存在则取子配置，不存在则取父配置，即用子去覆盖父

``` js
// 用户自定义选项策略
var defaultStrat = function (parentVal, childVal) {
  // 子不存在则用父，子存在则用子配置
  return childVal === undefined
    ? parentVal
    : childVal
};
```

## 常规选项的合并

### el的合并

el的合并策略是在保证选项只存在于根的Vue实例的情形下使用默认策略进行合并

``` js

strats.el = function (parent, child, vm, key) {
  if (!vm) {  // 只允许vue实例才拥有el属性，其他子类构造器不允许有el属性
    warn(
      "option \"" + key + "\" can only be used during instance " +
      'creation with the `new` keyword.'
    );
  }
  // 默认策略
  return defaultStrat(parent, child)
};
```

### data合并

``` js
// data的合并
strats.data = function (parentVal, childVal, vm) {
  // vm代表是否为Vue创建的实例，否则是子父类的关系
  if (!vm) {
    if (childVal && typeof childVal !== 'function') { // 必须保证子类的data类型是一个函数而不是一个对象
      warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.',vm);
      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }
  return mergeDataOrFn(parentVal, childVal, vm); // vue实例时需要传递vm作为函数的第三个参数
};
mergeDataOrFn方法
function mergeDataOrFn ( parentVal, childVal, vm ) {
  // 子父类
  if (!vm) {
    if (!childVal) { // 子类不存在data选项，则合并结果为父类data选项
      return parentVal
    }
    if (!parentVal) { // 父类不存在data选项，则合并结果为子类data选项
      return childVal
    }
    return function mergedDataFn () { // data选项在父类和子类同时存在的情况下返回的是一个函数
      // 子类实例和父类实例，分别将子类和父类实例中data函数执行后返回的对象传递给mergeData函数做数据合并
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
  // Vue实例
    // vue构造函数实例对象
    return function mergedInstanceDataFn () {
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        // 当实例中传递data选项时，将实例的data对象和Vm构造函数上的data属性选项合并
        return mergeData(instanceData, defaultData)
      } else {
        // 当实例中不传递data时，默认返回Vm构造函数上的data属性选项
        return defaultData
      }
    }
  }
}
```

mergeData逻辑

``` js
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  // Reflect.ownKeys可以拿到Symbol属性
  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      // 子的数据父没有，则将新增的数据加入响应式系统中。
      set(to, key, fromVal); 
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      // 处理深层对象，当合并的数据为多层嵌套对象时，需要递归调用mergeData进行比较合并
      mergeData(toVal, fromVal);
    }
  }
  return to
}
```

## 自带资源选项合并

``` js
// 资源选项
var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

// 定义资源合并的策略
ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets; // 定义默认策略
});

// 资源选项自定义合并策略
function mergeAssets (parentVal,childVal,vm,key) {
  var res = Object.create(parentVal || null); // 创建一个空对象，其原型指向父类的资源选项。
  if (childVal) {
    assertObjectType(key, childVal, vm); // components,filters,directives选项必须为对象
    return extend(res, childVal) // 子类选项赋值给空对象
  } else {
    return res
  }
}

var vm = new Vue({
  components: {
    componentA: {}
  },
  directives: {
    'v-boom': {}
  }
})

console.log(vm.$options.components)
// 根实例的选项和资源默认选项合并后的结果
{
  components: {
    componentA: {},
    __proto__: {
      KeepAlive: {}
      Transition: {}
      TransitionGroup: {}
    } 
  },
  directives: {
    'v-boom': {},
    __proto__: {
      'v-show': {},
      'v-model': {}
    }
  }
}
```

对于 directives、filters 以及 components 等资源选项，父类选项将以原型链的形式被处理。子类必须通过原型链才能查找并使用内置组件和内置指令。

## 生命周期钩子函数的合并

``` js
var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];
LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook; // 对生命周期钩子选项的合并都执行mergeHook策略
});
```

mergeHook是生命周期钩子合并的策略，简单的对代码进行总结，钩子函数的合并原则是：
如果子类和父类都拥有相同钩子选项，则将子类选项和父类选项合并。
如果父类不存在钩子选项，子类存在时，则以数组形式返回子类钩子选项。
当子类不存在钩子选项时，则以父类选项返回。
子父合并时，是将子类选项放在数组的末尾，这样在执行钩子时，永远是父类选项优先于子类选项执行。

``` js
// 生命周期钩子选项合并策略
function mergeHook (
    parentVal,
    childVal
  ) {
    // 1.如果子类和父类都拥有钩子选项，则将子类选项和父类选项合并, 
    // 2.如果父类不存在钩子选项，子类存在时，则以数组形式返回子类钩子选项，
    // 3.当子类不存在钩子选项时，则以父类选项返回。
    var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal; 
    return res
      ? dedupeHooks(res)
      : res
  }
// 防止多个组件实例钩子选项相互影响
  function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i]);
      }
    }
    return res
  }

var Parent = Vue.extend({
  mounted() {
    console.log('parent')
  }
})
var Child = Parent.extend({
  mounted() {
    console.log('child')
  }
})
var vm = new Child().$mount('#app');

// 输出结果：
parent
child
```

对于生命周期钩子选项，子类和父类相同的选项将合并成数组，这样在执行子类钩子函数时，父类钩子选项也会执行，并且父会优先于子执行。

## watch选项合并

watch 选项的合并处理，它类似于生命周期钩子，只要父选项有相同的观测字段，则和子的选项合并为数组，在监测字段改变时同时执行父类选项的监听代码。处理方式和生命钩子选项的区别在于，生命周期钩子选项必须是函数，而watch选项最终在合并的数组中可以是包含选项的对象，也可以是对应的回调函数，或者方法名。

``` js
strats.watch = function (parentVal,childVal,vm,key) {
    //火狐浏览器在Object的原型上拥有watch方法，这里对这一现象做了兼容
    // var nativeWatch = ({}).watch;
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    // 没有子，则默认用父选项
    if (!childVal) { return Object.create(parentVal || null) }
    {
      // 保证watch选项是一个对象
      assertObjectType(key, childVal, vm);
    }
    // 没有父则直接用子选项
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      // 父的选项先转换成数组
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [child];
    }
    return ret
  };
```

## props methods inject computed合并

如果父类不存在选项，则返回子类选项，子类父类都存在时，用子类选项去覆盖父类选项。

``` js
// 其他选项合并策略
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal,childVal,vm,key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal } // 父类不存在该选项，则返回子类的选项
  var ret = Object.create(null);
  extend(ret, parentVal); // 
  if (childVal) { 
    // 子类选项会覆盖父类选项的值
    extend(ret, childVal); } 
  return ret
};
```
