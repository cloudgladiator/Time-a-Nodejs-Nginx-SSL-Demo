file = open('timezones.html')
writeFile = open('pyFile.txt', 'a')
for line in file:
    line2 = line.rstrip()
    if line2.find("/") >= 0:
        print(line2)
        writeFile.write(line2+'\n')