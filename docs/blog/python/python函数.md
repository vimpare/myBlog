**调用函数**

http://docs.python.org/3/library/functions.html#abs

* 调用函数的时候，如果传入的参数数量不对，会报TypeError的错误，并且Python会明确地告诉你：abs()有且仅有1个参数，但给出了两个：
    ```
    >>> abs(1, 2)
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    TypeError: abs() takes exactly one argument (2 given)
    ```

* 如果传入的参数数量是对的，但参数类型不能被函数所接受，也会报TypeError的错误，并且给出错误信息;



函数名其实就是指向一个函数对象的引用，完全可以把函数名赋给一个变量，相当于给这个函数起了一个“别名”：
```
>>> a = abs # 变量a指向abs函数
>>> a(-1) # 所以也可以通过a调用abs函数
1
```

**定义函数**
在Python中，定义一个函数要使用`def`语句，依次写出函数名、括号、括号中的参数和冒号:，然后，在缩进块中编写函数体，函数的返回值用`return`语句返回。

```
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
```

* 如果没有`return`语句，函数执行完毕后也会返回结果，只是结果为`None`。`return None`可以简写为`return`



空函数:
如果想定义一个什么事也不做的空函数，可以用pass语句：
```
def nop():
    pass
```
参数检查:
* 调用函数时，如果参数个数不对，Python解释器会自动检查出来，并抛出TypeError
* 如果参数类型不对，Python解释器就无法帮我们检查。试试my_abs和内置函数abs的差别：
    ```
    >>> my_abs('A')
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    File "<stdin>", line 2, in my_abs
    TypeError: unorderable types: str() >= int()
    >>> abs('A')
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    TypeError: bad operand type for abs(): 'str'
    ```
    当传入了不恰当的参数时，内置函数abs会检查出参数错误，而我们定义的my_abs没有参数检查，会导致if语句出错，出错信息和abs不一样。所以，这个函数定义不够完善。

* 数据类型检查可以用内置函数`isinstance()`实现,`isinstance()` 函数来判断一个对象是否是一个已知的类型，类似 `type()`。
  ```
  def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x
    ```

返回多个值:Python的函数返回多值其实就是返回一个tuple

**函数的参数**

位置参数:
默认参数:
可变参数:可变参数就是传入的参数个数是可变的,定义可变参数和定义一个list或tuple参数相比，仅仅在参数前面加了一个*号。
    ```
    def calc(*numbers):
        sum = 0
        for n in numbers:
            sum = sum + n * n
        return sum
    ```

关键字参数:关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict

```
>>> person('Bob', 35, city='Beijing')
name: Bob age: 35 other: {'city': 'Beijing'}
>>> person('Adam', 45, gender='M', job='Engineer')
name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}
```
命名关键字参数:

命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数
```
def person(name, age, *, city, job):
    print(name, age, city, job)
```
**导入模块**:
import 语句允许在当前运行的程序文件中使用模块中的代码
* **导入整个模块**
  要让函数是可导入的，得先创建模块。模块 是扩展名为.py的文件，包含要导入到程序中的代码。


    `pizza.py`:
    ```
    def make_pizza(size, *toppings): 
        print("\nMaking a " + str(size) + "-inch pizza with the following toppings:")
        for topping in toppings: 
        print("- " + topping)
    ```
    pizza.py所在的目录中创建另一个名为`making_pizzas.py`的文件，这个文件导入刚创建的模块，再调用`make_pizza() `两次
    `making_pizzas.py`:
    ```
    import pizza 
    pizza.make_pizza(16, 'pepperoni') 
    pizza.make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')
    ```

    只需编写一条`import` 语句并在其中指定模块名，就可在程序中使用该模块中的所有函数。
    如果你使用这种`import `语句导入了名为`module_name.py` 的整个模块，就可使用下面的语法来使用其中任何一个函数： 
    ```
    module_name.function_name()
    ```
* **导入模块中的特定函数**
  ```
  from module_name import function_name
  ```
  通过用逗号分隔函数名，可根据需要从模块中导入任意数量的函数
  ```
  from module_name import function_0, function_1, function_2
  ```
* **使用as给函数指定别名**
  ```
  from module_name import function_name as fn
  ```
  示例：
  ```
  from pizza import make_pizza as mp 
  mp(16, 'pepperoni') 
  mp(12, 'mushrooms', 'green peppers', 'extra cheese')
  ```
* **使用as给模块指定别名**
  ```
  import module_name as mn
  ```
  示例：
  ```
  import pizza as p 
  p.make_pizza(16, 'pepperoni') 
  p.make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')
  ```
* **导入模块中的所有函数**
  ```
  form module_name import *
  ```
    使用星号（* ）运算符可让Python导入模块中的所有函数
    import 语句中的星号让Python将模块pizza 中的每个函数都复制到这个程序文件中。
    由于导入了每个函数，可通过名称来调用每个函数，而无需使用句点表示法。
    然而，使用 并非自己编写的大型模块时，最好不要采用这种导入方法：
    如果模块中有函数的名称与你的项目中使用的名称相同，可能导致意想不到的结果：Python可能遇到多个名称相同的函 数或变量，进而覆盖函数，而不是分别导入所有的函数。 
    最佳的做法是，
  **要么只导入你需要使用的函数，要么导入整个模块并使用句点表示法。**
