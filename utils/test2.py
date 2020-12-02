file = open('pyFileUp.txt')
writeFile = open('link.html', 'a')
for line in file:
    writeFile.write("<li><a href='/"+line+"'>"+line+"</a></li>")