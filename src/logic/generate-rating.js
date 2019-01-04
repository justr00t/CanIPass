module.exports = { createRating, createRatingJson };

var database = require("../util/database-access.js");
var PythonShell = require('python-shell');

var pathToPython = __dirname + '/../pycode';

var options = {
  mode: 'text',
  // pythonPath: 'path/to/python',
  pythonOptions: ['-u'],
  scriptPath: pathToPython,
  args: [1, 'value2', 3]
};

//Base function for our algorithm feel free to change anything just an example
function createRating(gpa, hours, callback) {
  PythonShell.run('testpy.py', options, function (err, results) {
    if (err) throw err;
    console.log('finished');
    console.log(results);
  });
}

/**
 * Takes a list of courses in JSON form and calculates the class rating.
 * The course objects must have field 'gpa' and 'credits'
 * The result is also returned as a json with field 'rating'.
 * @param courses list of JSON objects
 * @param callback the callback function
 */
function createRatingJson(courses, callback) {
  var op, course, i, numCourses;
  op = {
    mode: 'text',
    scriptPath: pathToPython,
    args: []
  };

  numCourses = courses.length;
  if (numCourses == 0) {
    callback(0);
  }

  for (i = 0; i < numCourses; i++) {
    course = courses[i];
    if (course.hasOwnProperty('gpa')) {
      op.args.push(JSON.stringify(course));
    } else {
      console.log("WARNING: There was a course without a needed property:" + course);
    }
  }
  console.log(op.args);
  PythonShell.run('calcscript.py', op, function (err, results) {
    if (err) throw err;
    //callback(JSON.parse(results));

    console.log('\nPython script finished.');
    console.log('Python script print outputs: <\n', results, '\n>');
    var finalResult = results[results.length - 1].trim();
    var i = 0;
    while (!(results[i].trim() === 'BEGIN_REASONS') && i < results.length - 1) i++;
    i++;
    var reasons = [];
    for (; i < results.length - 1; i++) {
      reasons.push(results[i].trim());
    }

    var resultInfo = {
      rating: finalResult,
      reasons: reasons
    };

    console.log("Generate-rating is giving this result: ", resultInfo); // last entry of the results will be the actual number.
    callback(resultInfo)
  });
}