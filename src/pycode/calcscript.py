import sys, json, math
from functools import reduce

def main():
    print("Script starting.")
    classes = []
    for c in sys.argv[1:]:
        classes.append(json.loads(c))

    if len(classes) == 0:
        print('0')
        return

    rating = int(calcDifficulty_NormalCurve(classes))

    if (rating < 1):
        rating = 1
    elif (rating > 10):
        rating = 10

    print(rating)

# classes: json objects of the classes}
def calcDifficulty_Simple(classes):
    totCred = 0
    sumGpa = 0
    for c in classes:
        totCred += c['credits']
        sumGpa += (4.0 - c['gpa']) * c['credits']

    return sumGpa / 4 * 10 / totCred

def calcDifficulty_NormalCurve(classes):
    gpaMean = 3.4
    gpaStdev = 0.3
    gpaRatings = []
    #gpaRatings = [normcdf(c['gpa'], gpaMean, gpaStdev) for c in classes]
    veryHard = []
    veryEasy = []
    for c in classes:
        singleGPA = c.get('gpa')
        prob = normcdf(c['gpa'], gpaMean, gpaStdev)
        gpaRatings.append(prob)
        if (prob <= normcdf(-1.5, 0, 1)):
            veryHard.append(c)
            #print('{} with professor {}, has a very low average GPA.'.format(c['course'], c['professor']))
        elif (prob >= normcdf(1.5, 0, 1)):
            veryEasy.append(c)

    gpaRating = reduce(lambda x, y: x + y, gpaRatings) / len(gpaRatings)
    gpaRating = 1 - gpaRating
    totalCredits = 0
    for c in classes:
        if c.get('credits') == None:
            totalCredits = 0
            break
        totalCredits += c.get('credits')

    numCoursesMean = 3.5
    numCoursesStdev = 1
    numCreditsMean = 15
    numCreditsStdev = 3

    if totalCredits == 0:
        totalCredits = len(classes)
        creditRating = normcdf(totalCredits, numCoursesMean, numCoursesStdev)
    else:
        creditRating = normcdf(totalCredits, numCreditsMean, numCreditsStdev)

    print(creditRating, gpaRating)
    #rating = (creditRating + gpaRating) / 2 * 10
    weightFactor = 0.5 - abs(creditRating - 0.5) ** (5.0 / 2.0)
    rating = (creditRating * (1 - weightFactor) + gpaRating * weightFactor) * 10
    result = round(rating, 0)

    print("BEGIN_REASONS")
    if (creditRating <= normcdf(-1.5, 0, 1)):
        if len(veryHard) == 0:
            print('The schedule has no comparatively difficult courses.')
            print('The schedule is very light-weight.')
        elif len(veryHard) == 1:
            print('Although {} with professor {}, is historically difficult, having relatively less credit hours will make it easier.'
                    .format(veryHard[0]['course'], veryHard[0]['professor']))
        elif len(veryHard) == 2:
            print('There are a couple harder courses, but the schedule is light-weight')
        elif len(veryHard) > 2:
            print('The schedule is mostly difficult courses, but still lighter than the average.')

    elif (creditRating >= normcdf(2, 0, 1)):
        if len(veryHard) == 0:
            print('Although the schedule does not have any historically difficult courses, it definitely lies on the heavier side.')
        elif len(veryHard) == 1:
            print('{} with professor {}, will likely be challenging.'
                    .format(veryHard[0]['course'], veryHard[0]['professor']))
            print('The higher load of courses will require more precise time management.')
        elif len(veryHard) == 2:
            print('Having a couple harder courses in an already heavy course load will prove challenging.')
        elif len(veryHard) > 2:
            print('The schedule has more than a recommended share of difficult courses.')
            print('The schedule is significantly heavier than the average.')
            print('Above two combined will require serious time investment and work.')
    else:
        if len(veryHard) == 0:
            print('The schedule has no notably difficult courses.')
            print('The schedule consists of near average load of courses.')
        elif len(veryHard) == 1:
            print('{} with professor {}, will probably be difficult.'
                    .format(veryHard[0]['course'], veryHard[0]['professor']))
        elif len(veryHard) == 2:
            print('The schedule has a couple historically difficult courses in the mix.')
        elif len(veryHard) > 2:
            print('The schedule has more than a recommended share of difficult courses.')

    return result

def normpdf(x, mean, sd):
    var = float(sd)**2
    pi = 3.1415926
    denom = (2*pi*var)**.5
    num = math.exp(-(float(x)-float(mean))**2/(2*var))
    return num/denom

def normcdf(x, m, sd):
    return (1 + math.erf((x - m) / sd / math.sqrt(2.0))) / 2.0

def sigmoidcdf(x, m, s):
    return 1 / (1 + e ** (-(x - m) / s))

if __name__ == '__main__':
    main()
