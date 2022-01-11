### 列表生成式

List Comprehensions，是python内置的简单又强大的用来创建list的方式。
eg:
要生成list [1,2,3,4,5,6,7,8]  
```
list(rangt(1,9))
```
要生成`[1x1, 2x2, 3x3, ..., 10x10]`怎么做
```
>>> L = []
>>> for x in range(1, 11):
...    L.append(x * x)
...
>>> L
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```
列表生成式则可以用一行语句代替循环生成上面的list
```
>>> [x * x for x in range(1, 11)]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

写列表生成式时，把要生成的元素`x * x`放到前面，后面跟`for`循环，就可以把`list`创建出来
for循环后面还可以加上if判断，这样我们就可以筛选出仅偶数的平方：
```
>>> [x * x for x in range(1, 11) if x % 2 == 0]
[4, 16, 36, 64, 100]
```
还可以使用两层循环，可以生成全排列：
```
>>> [m + n for m in 'ABC' for n in 'XYZ']
['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
```

列表生成式也可以使用两个变量来生成list：
```
>>> d = {'x': 'A', 'y': 'B', 'z': 'C' }
>>> [k + '=' + v for k, v in d.items()]
['y=B', 'x=A', 'z=C']
```

#### if ... else

for前面的if ... else是表达式，而for后面的if是过滤条件，不能带else
```
>>> [x if x % 2 == 0 else -x for x in range(1, 11)]
[-1, 2, -3, 4, -5, 6, -7, 8, -9, 10]
```

## 生成器
generator  一边循环一边计算的机制，称为生成器;

列表生成式的[]改成() ,就创建了生成器;

通过`next()`函数获得generator的下一个返回值;
```
杨辉三角
```
def triangles():
    N=[1] 
    while True:
        yield N
        S=N[:]
        S.append(0)
        N=[S[i-1]+S[i] for i in range(len(S))]
        
