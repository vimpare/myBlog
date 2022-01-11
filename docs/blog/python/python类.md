面向对象编程
#### 创建和使用类
##### 创建类
```
class Dog():
    def __init__(self,name,age):
        self.name=name;
        self.age=age;
  
    def sit(self):
        print(self.name,'is sitting')
   
    def roll_over(self):
        print(self.name,'is roll_over')
```
* `__init__()` 是一个特殊的方法，每当你根据Dog 类创建新实例时，Python都会自动运行它。在这个方法的名称中，开头和末尾各有两个下划线，这是一种约定，旨在避免Python默认方法与普通方法发生名称冲突。
* 为Python调用这个`__init__()` 方法来创建Dog 实例时，将自动传入实参self 。每个与类相关联的方法调用都自动传递实参self ，它是一个指向实例本身 的引用，让实例能够访问类中的属性和方法。
* 每当我们根据Dog 类创建实例时，都只需给最后两个形参（name 和age ）提供值。
##### 根据类来创建实例
```
my_dog = Dog('willie', 6)
print(my_dog.name.title()) 
print("My dog is " + str(my_dog.age) + " years old.")
```
* `my_dog.name.title()` 将`my_dog` 的属性`name` 的 值'`willie`' 改为首字母大写的；
* 在第2条`print` 语句中，`str(my_dog.age)` 将`my_dog` 的属性`age` 的值6 转换为字符串

可以创建多个实例
```
my_dog = Dog('willie', 6)
your_dog = Dog('black',5)
```
##### 使用类和实例
可以以三种不同的方式修改属性的值：
直接通过实例进行修改；
通过方法进行设置；
通过方法进行递增（增加特定的值）
```
class Car(): 
    --snip-- 
my_new_car = Car('audi', 'a4', 2016) 
print(my_new_car.get_descriptive_name()) 
my_new_car.odometer_reading = 23 
my_new_car.read_odometer()
```
```
class Car(): 
    --snip--  
    def update_odometer(self, mileage): 
        """将里程表读数设置为指定的值""" 
        self.odometer_reading = mileage 
my_new_car = Car('audi', 'a4', 2016) 
print(my_new_car.get_descriptive_name()) 
my_new_car.update_odometer(23) 
my_new_car.read_odometer()
```
##### 继承
