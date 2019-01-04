import sys, json

def main():
    print "Hello"
    print sys.argv
    #print json.dump(json.load(sys.argv[1]))


# classes: dictionary with {className: (credits, avgGpa)}
def calcDifficulty_Simple(classes):
    totCred = 0
    sumGpa = 0
    for className in classes:
        cred, gpa = classes[className]
        totCred += cred
        sumGpa += (4.0 - gpa) * cred

    return sumGpa / 4 * 10 / totCred


if __name__ == '__main__':
    main()