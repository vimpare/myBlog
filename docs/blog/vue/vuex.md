### module
> 背景：在Vue中State使用是单一状态树结构，应该的所有的状态都放在state里面，如果项目比较复杂，那state是一个很大的对象，store对象也将对变得非常大，难于管理。
module：可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

使用：
```
const moduleA = {
 state: { ... },
 mutations: { ... },
 actions: { ... },
 getters: { ... }
 }
const moduleB = {
 state: { ... },
 mutations: { ... },
 actions: { ... }
 }
 
const store = new Vuex.Store({
 modules: {
  a: moduleA,
  b: moduleB})
  ```
