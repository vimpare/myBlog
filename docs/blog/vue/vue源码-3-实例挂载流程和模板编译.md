# 实例挂载流程和模板编译

## 实例的挂载渲染流程

vue基于源码构建的两个版本，一个是`runtime only`(一个只包含运行时的版本)，另一个是`runtime + compiler`(一个同时包含编译器和运行时的版本)。而两个版本的区别仅在于后者包含了一个编译器。

从Vue的角度出发，内置的编译器实现了将template模板转换编译为可执行javascript脚本的功能。

### Runtime + Compiler

一个完整的Vue版本是包含编译器的，我们可以使用`template`进行模板编写。编译器会自动将模板字符串编译成渲染函数的代码,源码中就是`render`函数。 如果你需要在客户端编译模板 (比如传入一个字符串给 `template` 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就需要一个包含编译器的版本。

``` js
// 需要编译器的版本
new Vue({
  template: '<div>{{ hi }}</div>'
})
```
### Runtime Only

只包含运行时的代码拥有创建Vue实例、渲染并处理Virtual DOM等功能，基本上就是除去编译器外的完整代码。

`Runtime Only`的适用场景有两种： 

* 我们在选项中通过手写`render`函数去定义渲染过程，这个时候并不需要包含编译器的版本便可完整执行。

``` js
// 不需要编译器
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```

* 借助`vue-loader`这样的编译工具进行编译，当我们利用`webpack`进行Vue的工程化开发时，常常会利用`vue-loader`对.vue进行编译，尽管我们也是利用`template`模板标签去书写代码，但是此时的Vue已经不需要利用编译器去负责模板的编译工作了，这个过程交给了插件去实现。 **(开发推荐)**

### 实力挂载基本思路

**初始化_init的代码**

``` js
Vue.prototype._init = function (options) {
  ···
  // 选项合并
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  );
  // 数据代理
  initProxy(vm);
  vm._self = vm;
  initLifecycle(vm);
  // 初始化事件处理
  initEvents(vm);
  // 定义渲染函数
  initRender(vm);
  // 构建响应式系统
  initState(vm);
  // 等等
  ···
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
}
```

挂载：在选项中传递`template`为属性的模板字符串，如`<div></div>`，最终这个模板字符串通过中间过程将其转成真实的DOM节点，并挂载到选项中el代表的根节点上完成视图渲染。

::: tip
确认挂载节点  --->  编译模板为render函数  --->  渲染函数转换Virtual DOM  --->  创建真实节点
:::

``` js
// 内部真正实现挂载的方法
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  // 调用mountComponent方法挂载
  return mountComponent(this, el, hydrating)
};
// 缓存了原型上的 $mount 方法
var mount = Vue.prototype.$mount;

// 重新定义$mount,为包含编译器和不包含编译器的版本提供不同封装，最终调用的是缓存原型上的$mount方法
Vue.prototype.$mount = function (el, hydrating) {
  // 获取挂载元素
  el = el && query(el);
  // 挂载元素不能为跟节点
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }
  var options = this.$options;
  // 需要编译 or 不需要编译
  // render选项不存在，代表是template模板的形式，此时需要进行模板的编译过程
  if (!options.render) {
    ···
    // 使用内部编译器编译模板
  }
  // 无论是template模板还是手写render函数最终调用缓存的$mount方法
  return mount.call(this, el, hydrating)
}
// mountComponent方法思路
function mountComponent(vm, el, hydrating) {
  // 定义updateComponent方法，在watch回调时调用。
  updateComponent = function () {
    // render函数渲染成虚拟DOM， 虚拟DOM渲染成真实的DOM
    vm._update(vm._render(), hydrating);
  };
  // 实例化渲染watcher
  new Watcher(vm, updateComponent, noop, {})
}
```

* 确定挂载的DOM元素,这个DOM需要保证不能为html，body这类跟节点
* 挂载阶段会有两条分支，`template`模板会先经过模板的解析，最终编译成`render`渲染函数参与实例挂载，而手写render函数可以绕过编译阶段，直接调用挂载的`$mount`方法。
* 无论是template模板还是手写render函数，最终都将进入`mountComponent`过程,这个阶段会实例化一个渲染`watcher`
* 回调函数是执行`updateComponent`的过程，这个方法有两个阶段，一个是`vm._render`,另一个是`vm._update`。 `vm._render`会执行前面生成的render渲染函数，并生成一个`Virtual Dom tree`,而`vm._update`会将这个`Virtual Dom tree`转化为真实的DOM节点。

![An image](../../.vuepress/public/3.1.png)

## 模板编译

### template的三种写法

* 字符串模板
  
    ``` js
    var vm = new Vue({
        el: '#app',
        template: '<div>模板字符串</div>'
    })
    ```

* 选择符匹配元素的 innerHTML模板

``` js
<div id="app">
  <div>test1</div>
  <script type="x-template" id="test">
    <p>test</p>
  </script>
</div>
var vm = new Vue({
  el: '#app',
  template: '#test'
})
```
* dom元素匹配元素的innerHTML模板
  
``` js
<div id="app">
  <div>test1</div>
  <span id="test"><div class="test2">test2</div></span>
</div>
var vm = new Vue({
  el: '#app',
  template: document.querySelector('#test')
})
```

模板编译的前提需要对`template`模板字符串的合法性进行检测，三种写法对应代码的三个不同分支。

``` js
Vue.prototype.$mount = function () {
  ···
  if(!options.render) {
    var template = options.template;
    if (template) {
      // 针对字符串模板和选择符匹配模板
      if (typeof template === 'string') {
        // 选择符匹配模板，以'#'为前缀的选择器
        if (template.charAt(0) === '#') {
          // 获取匹配元素的innerHTML
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      // 针对dom元素匹配
      } else if (template.nodeType) {
        // 获取匹配元素的innerHTML
        template = template.innerHTML;
      } else {
        // 其他类型则判定为非法传入
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      // 如果没有传入template模板，则默认以el元素所属的根节点作为基础模板
      template = getOuterHTML(el);
    }
  }
}

// 判断el元素是否存在
function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        warn(
          'Cannot find element: ' + el
        );
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }
var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

```

















### 编译流程图解
### 逻辑解析

``` js
Vue.prototype.$mount = function () {
  ···
  if(!options.render) {
    var template = options.template;
    if (template) {
      var ref = compileToFunctions(template, {
          outputSourceRange: "development" !== 'production',
          shouldDecodeNewlines: shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        }, this);
        var render = ref.render;
    }
    ...
  }
}

```

`compileToFunctions`有三个参数，一个是template,第二个是编译的配置信息，第三个是Vue实例。

#### 寻找compileToFunctions的根源



``` js {18}
    var createCompiler = createCompilerCreator(function baseCompile (
        template,
        options
    ) {
        var ast = parse(template.trim(), options);
        if (options.optimize !== false) {
        optimize(ast, options);
        }
        var code = generate(ast, options);
        return {
        ast: ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
        }
    });
    var ref$1 = createCompiler(baseOptions);
    var compile = ref$1.compile;
    var compileToFunctions = ref$1.compileToFunctions;
```


`baseCompile`是真正执行编译功能的地方。

`baseCompile`函数的参数有两个，一个是后续传入的`template`模板,另一个是编译需要的配置参数。

函数实现的功能如下几个：

* 把模板解析成抽象的语法树，简称AST，代码中对应parse部分。
* 可选：优化AST语法树，执行optimize方法。
* 根据不同平台将AST语法树转换成渲染函数，对应的generate函数


`compileToFunctions`由`createCompiler`函数返回，该函数返回一个对象
``` js
{
    compile: compile,
    compileToFunctions: createCompileToFunctionFn(compile)
}

```
代码如下

``` js
function createCompilerCreator (baseCompile) {
    return function createCompiler (baseOptions) {
      function compile (
        template,
        options
      ) {
        var finalOptions = Object.create(baseOptions);
        var errors = [];
        var tips = [];

        var warn = function (msg, range, tip) {
          (tip ? tips : errors).push(msg);
        };

        if (options) {
          if (options.outputSourceRange) {
            // $flow-disable-line
            var leadingSpaceLength = template.match(/^\s*/)[0].length;

            warn = function (msg, range, tip) {
              var data = { msg: msg };
              if (range) {
                if (range.start != null) {
                  data.start = range.start + leadingSpaceLength;
                }
                if (range.end != null) {
                  data.end = range.end + leadingSpaceLength;
                }
              }
              (tip ? tips : errors).push(data);
            };
          }
          // merge custom modules
          if (options.modules) {
            finalOptions.modules =
              (baseOptions.modules || []).concat(options.modules);
          }
          // merge custom directives
          if (options.directives) {
            finalOptions.directives = extend(
              Object.create(baseOptions.directives || null),
              options.directives
            );
          }
          // copy other options
          for (var key in options) {
            if (key !== 'modules' && key !== 'directives') {
              finalOptions[key] = options[key];
            }
          }
        }

        finalOptions.warn = warn;

        var compiled = baseCompile(template.trim(), finalOptions);
        {
          detectErrors(compiled.ast, warn);
        }
        compiled.errors = errors;
        compiled.tips = tips;
        return compiled
      }

      return {
        compile: compile,
        compileToFunctions: createCompileToFunctionFn(compile)
      }
    }
  }
```

`createCompilerCreator`在传递了一个`baseCompile`函数作为参数后，返回了一个编译器的生成器，也就是`createCompiler`,有了这个生成器，当将编译配置选项`baseOptions`传入后,这个编译器生成器便生成了一个指定环境指定配置下的编译器，而其中编译执行函数就是返回对象的`compileToFunctions`。

``` js
 function createCompileToFunctionFn (compile) {
    var cache = Object.create(null);

    return function compileToFunctions (template,options,vm) {
      options = extend({}, options);
      ···
      // 缓存的作用：避免重复编译同个模板造成性能的浪费
      if (cache[key]) {
        return cache[key]
      }
      // 执行编译方法
      var compiled = compile(template, options);
      ···
      // turn code into functions
      var res = {};
      var fnGenErrors = [];
      // 编译出的函数体字符串作为参数传递给createFunction,返回最终的render函数
      res.render = createFunction(compiled.render, fnGenErrors);
      res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
        return createFunction(code, fnGenErrors)
      });
      ···
      return (cache[key] = res)
    }
  }

```

`createCompileToFunctionFn`利用了闭包的概念，将编译过的模板进行缓存,`cache`会将之前编译过的结果保留下来，利用缓存可以避免重复编译引起的浪费性能。`createCompileToFunctionFn`最终会将`compileToFunctions`方法返回。

**编译的核心是`parse`,`generate`过程!!!!**