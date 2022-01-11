#### 从文件中读取数据

**读取整个文件：**
```
with open('pi_digits.txt') as file_object:
    contents=file_object.read()
    print(contents)
    print(line.rstrip())
```

* 函数`open()` 接受一个参数：要打开的文件的名称,返回一个表示文件的对象。
* 关键字with 在不再需要访问文件后将其关闭。
* 方法`read()` （前述程序的第2行）读取这个文件的全部内容，并将其作为一个长长的字符串存储在变量`contents `中。
*Python方法`rstrip()` 删除（剥除）字符串末尾的空白


**逐行读取：**
```
with open('pi_digits.txt') as file_object:    
     for line in file_object:
         print(line.rstrip())
```
以每次一行的方式检查文件，可对文件对象使用for 循环
* `readlines()` 从文件中读取每一行，并将其存储在一个列表中
```
with open('pi_digits.txt') as file_object:
    # contents=file_object.read()
    # print(contents)
    # for line in file_object:
    #     print(line.rstrip())
    lines=file_object.readlines()
pi_string=''
for line in lines:
    # print(line)
    pi_string+=line.strip()
    
# print(pi_string[:52]+'...')
birthday = input('输入生日')
if birthday in pi_string:
    print('in')
else:
    print('no')
```

```
with open('learning_python.txt',encoding='UTF-8') as file_object:
        contents=file_object.read()
        print(contents)
        print(file_object.readlines())
        lines=file_object.readlines
print(lines)
```
#### 写入文件
要将文本写入文件，你在调用open() 时需要提供另一个实参
* 调用open() 时提供了两个实参。
* 第一个实参也是要打开的文件的名称；
* 第二个实参（'w' ）告诉Python，我们要以写入模式打开这个文件。
* 打开文件 时，可指定读取模式 （'r' ）、写入模式 （'w' ）、附加模式 （'a' ）或让你能够读取和写入文件的模式（'r+' ）。
* `write()` 将一个字符串写入文件
* 你以附加模式打开文件时，Python不会在返回文件对象前清空文件，而你写入到文件的行都将添加 到文件末尾。如果指定的文件不存在，Python将为你创建一个空文件。
```
# file_name='i.txt'
# with open(file_name,'a') as file_object:
#     file_object.write('dddddd')


# str=input('输入名字：')
# with open('guest_book.txt','w') as file_object:
#     file_object.write(str)
while True:
    name = input('输入名字：')
    print('hello',name)
    with open('guest_book.txt','a') as file_object:
        file_object.write(name+'\n')
```
