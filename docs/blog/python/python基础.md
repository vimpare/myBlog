* Python的语法比较简单，采用缩进方式
    ```
    # print absolute value of an integer:
    a = 100
    if a >= 0:
        print(a)
    else:
        print(-a)
    ```
* 以`#`开头的语句是注释
* 按照约定俗成的惯例，应该始终坚持使用4个空格的缩进



#### 数据类型和变量

**数据类型**

在Python中，能够直接处理的数据类型有以下几种：
**整数、浮点数、字符串、布尔值、空值、变量、常量**

  * **整数**
Python可以处理任意大小的整数，当然包括负整数，在程序中的表示方法和数学上的写法一模一样，例如：1，100，-8080，0，等等。
  * **布尔值**

布尔值和布尔代数的表示完全一致，一个布尔值只有`True、False`两种值，要么是True，要么是False，在Python中，可以直接用True、False表示布尔值（请注意大小写），也可以通过布尔运算计算出来：
```
>>> True
True
>>> False
False
>>> 3 > 2
True
>>> 3 > 5
False
```
   布尔值可以用`and、or和not`运算。
   and运算是与运算，只有所有都为True，and运算结果才是True;
   or运算是或运算，只要其中有一个为True，or运算结果就是True
   not运算是非运算，它是一个单目运算符，把True变成False，False变成True

   * **空值**

空值是Python里一个特殊的值，用None表示。None不能理解为0，因为0是有意义的，而None是一个特殊的空值。


#### 使用list和tuple


**list**
```
>>> classmates = ['Michael', 'Bob', 'Tracy']
>>> classmates
['Michael', 'Bob', 'Tracy']
```

* 变量classmates就是一个list。用`len()`函数可以获得list元素的个数：
    ```
    >>> len(classmates)
    3
    ```

* 用索引来访问list中每一个位置的元素，记得索引是从0开始的

* 当索引超出了范围时，Python会报一个IndexError错误,最后一个元素的索引是`len(classmates) - 1`


* -1做索引，直接获取最后一个元素


* list中追加元素到末尾：
    ```
    >>> classmates.append('Adam')
    >>> classmates
    ['Michael', 'Bob', 'Tracy', 'Adam']
    ```

* 把元素插入到指定的位置，比如索引号为1的位置：
    ```
    >>> classmates.insert(1, 'Jack')
    >>> classmates
    ['Michael', 'Jack', 'Bob', 'Tracy', 'Adam']
    ```

* 删除list末尾的元素，用pop()方法：
    ```
    >>> classmates.pop()
    'Adam'
    >>> classmates
    ['Michael', 'Jack', 'Bob', 'Tracy']
    ```
* 要删除指定位置的元素，用pop(i)方法，其中i是索引位置：

    ```
    >>> classmates.pop(1)
    'Jack'
    >>> classmates
    ['Michael', 'Bob', 'Tracy']

    ```

**tuple**
元组：tuple
* tuple一旦初始化就不能修改

```
>>> classmates = ('Michael', 'Bob', 'Tracy')
```
它也没有append()，insert()这样的方法。其他获取元素的方法和list是一样的，你可以正常地使用classmates[0]，classmates[-1]，但不能赋值成另外的元素。
* 只有1个元素的tuple定义时必须加一个逗号

```
>>> t = (1,)
>>> t
(1,)
```
* tuple所谓的“不变”是说，tuple的每个元素，指向永远不变

#### 条件判断

```
age = 3
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
```

```
s = input('birth: ')
birth = int(s)
if birth < 2000:
    print('00前')
else:
    print('00后')
```

#### 循环

Python的循环有两种，
* 一种是for...in循环，依次把list或tuple中的每个元素迭代出来

    ```
    names = ['Michael', 'Bob', 'Tracy']
    for name in names:
        print(name)
    ```    
  * range()函数，可以生成一个整数序列
      ```
    >>> list(range(5))
      [0, 1, 2, 3, 4]
      ```

* 第二种循环是while循环，只要条件满足，就不断循环，条件不满足时退出循环。
    ```
    sum = 0
    n = 99
    while n > 0:
        sum = sum + n
        n = n - 2
    print(sum)
    ```


**break**

在循环中，break语句可以提前退出循环。

**continue**

在循环过程中，也可以通过continue语句，跳过当前的这次循环，直接开始下一次循环。


#### 使用dict和set

**dict**

dict全称dictionary，在其他语言中也称为map，使用键-值（key-value）存储，具有极快的查找速度。
用Python写一个dict如下：
```
>>> d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
>>> d['Michael']
95
```
* 多次对一个key放入value，后面的值会把前面的值冲掉;
* 如果key不存在，dict就会报错;
  要避免key不存在的错误，有两种办法:
  * 通过`in`判断key是否存在
    ```
    >>> 'Thomas' in d
    False
    ```
  * 是通过dict提供的`get()`方法，如果key不存在，可以返回`None`，或者自己指定的value：
    ```
    >>> d.get('Thomas')
    >>> d.get('Thomas', -1)
    -1
    ```
* 要删除一个key，用`pop(key)`方法，对应的value也会从dict中删除


**set**

set和dict类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在set中，没有重复的key。
要创建一个set，需要提供一个list作为输入集合：
```
>>> s = set([1, 2, 3])
>>> s
{1, 2, 3}
```
* 重复元素在set中自动被过滤
* 通过add(key)方法可以添加元素到set中，可以重复添加，但不会有效果
* 通过remove(key)方法可以删除元素
* set可以看成数学意义上的无序和无重复元素的集合，因此，两个set可以做数学意义上的交集、并集等操作：
    ```
    >>> s1 = set([1, 2, 3])
    >>> s2 = set([2, 3, 4])
    >>> s1 & s2
    {2, 3}
    >>> s1 | s2
    {1, 2, 3, 4}
    ```