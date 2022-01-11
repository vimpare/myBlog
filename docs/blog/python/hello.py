# name=input('your name:')
# print(name,'hello')
# print('''1
# 2
# 3 ''')
# print(True and False)
# print(not False)
# age = 20;
# if age>18:
#     print('333')
# else:
#     print('222')
sum=0;
# for x in [1,2,3,4,5]:
#     sum+=x
# print(sum)
# def myFunc (x):
#     if(x>0):
#         print('>')
#     else:
#         print('<')
# print(myFunc(5))
# def myfunc (arg1,*vartuple):
#     print('输出：')
#     print(arg1)
#     for x in vartuple:
#         print(x)
# myfunc(10,23,45)
# def trim(s):
#     if s[:1]==s[-1:]== ' ':
#         s=s[1:-1]
#     return s
# print(trim(' hello '))
# def findMinAndMax(L):
#     if(len(L)==0):
#         return (None, None)
    
#     a=L[0]
#     b=L[0]
#     for x in L:
#         if(a<x):
#             a=x
#         if(b>x):
#             b=x
#     return (b,a)
# print(findMinAndMax([7]))
# d={'x':1,'y':2,'z':3} 
# a=[k+'='+str(v) for k,v in d.items()]
# print(a)
# L1 = ['Hello', 'World', 18, 'Apple', None]
# L2 = [x   for x in L1 if isinstance(x,str)]
# 杨辉三角
def triangles():
    N=[1] 
    while True:
        yield N
        S=N[:]
        S.append(0)
        N=[S[i-1]+S[i] for i in range(len(S))]
