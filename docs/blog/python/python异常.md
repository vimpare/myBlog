异常是使用try-except 代码块处理的。try-except 代码块让Python执行指定的操作，同时告诉Python发生异常时怎么办。
##### 处理ZeroDivisionError异常
```
try:
    print(5/0)
except ZeroDivisionError:
    print('no')
```
* 将导致错误的代码行`print(5/0)` 放在了一个`try` 代码块中。
* 如果`try` 代码块中的代码运行起来没有问题，Python将跳过`except` 代码块；
* 如果`try` 代码块中的代码导致了 错误，Python将查找这样的`except` 代码块，并运行其中的代码，即其中指定的错误与引发的错误相同。
* else 代码块；依赖于try 代码块成功执行的代码都应放到else 代码块中
##### 处理FileNotFoundError异常
```
filename = 'alice.txt' 
try:
    with open(filename) as f_obj:
    contents = f_obj.read() 
except FileNotFoundError: 
    msg = "Sorry, the file " + filename + " does not exist." 
    print(msg)
```
