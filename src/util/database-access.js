/**
 * Created by Josh on 2/23/17.
 */
var request = require('request');

module.exports = { getCourseInfo, getMajors, getCourses, getProfessors, getAllCourses, getAllCourseInfo,
  getSemesterNamesAndRatings, getProfileName, confimCredentials, newUser, newSemester, updateSemester, getSemesterInfo,
  deleteSemester, getReviews};

function getAllCourseInfo(course, professor) {
  return new Promise(function (fulfill, reject) {
    var url = process.env.databaseURL + '/RMS/courseInfo';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Course data was unable to be retrieved due to an error.";
        console.log(message);
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Course data was unable to be retrieved.";
        console.log(message);

        reject(message)
      }

    });
  });
}

function getCourseInfo(course, professor) {
  return new Promise(function (fulfill, reject) {
    var non_encoded_url = process.env.databaseURL + '/RMS/courseInfo?course="' + course + '"'
      + (professor ? '&professor="' + professor + '"' : '');
    var url = encodeURI(non_encoded_url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Course data was unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Course data was unable to be retrieved.";
        reject(message)
      }
    });
  });
}

function getMajors() {
  return new Promise(function (fulfill, reject) {
    var url = process.env.databaseURL + '/RMS/courseInfo/majors';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Majors were unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Majors were unable to be retrieved.";
        reject(message)
      }
    });
  });
}

function getCourses(major) {
  return new Promise(function (fulfill, reject) {
    var non_encoded_url = process.env.databaseURL + '/RMS/courseInfo/courses?major=' + major;
    var url = encodeURI(non_encoded_url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Majors were unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Majors were unable to be retrieved.";
        reject(message)
      }
    });
  });
}

// { major : 'major', gpas: [list of GPAs] }
function getMajorGPAs(major) {
  return new Promise(function (fulfill, reject) {
    var non_encoded_url = process.env.databaseURL + '/RMS/courseInfo/majorGPAs?major=' + major;
    var url = encodeURI(non_encoded_url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Major's GPAs were unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Major's GPAs were unable to be retrieved.";
        reject(message)
      }
    });
  });
}

function getProfessors(course) {
  return new Promise(function (fulfill, reject) {
    var non_encoded_url = process.env.databaseURL + '/RMS/courseInfo/professors?course=' + course;
    var url = encodeURI(non_encoded_url);
    request(url, function (error, respose, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Professors were unable to be retrieved due to an error.";
        reject(message)
      }
      if (!error && response.statusCode != 200) {
        message = "Professors were unable to be retrieved.";
        reject(message)
      }
    });
  });
}

function getAllCourses() {
  return new Promise(function (fulfill, reject) {
    url = process.env.databaseURL + '/RMS/courseInfo/courses';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Majors were unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Majors were unable to be retrieved.";
        reject(message)
      }
    });
  });
}


function getProfileName(email) {
  return new Promise(function (fulfill, reject) {
    url = process.env.databaseURL + '/RMS/profile/name?email=' + '"' + email + '"';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(body);
      }
      var message;
      if (error != undefined) {
        message = "Profile Name was unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Profile Name was unable to be retrieved.";
        reject(message)
      }
    });
  });
}

function getSemesterNamesAndRatings(email) {
  return new Promise(function (fulfill, reject) {
    url = process.env.databaseURL + '/RMS/profile/semester/namesAndRatings?email=' + '"' + email + '"';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Semester Info was unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Semester Info was unable to be retrieved.";
        reject(message)
      }
    });
  });
}


function confimCredentials(email) {
  return new Promise(function (fulfill, reject) {
    url = process.env.databaseURL + '/RMS/profile/confirm?email=' + '"' + email + '"';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(body);
      }
      var message;
      if (error != undefined) {
        message = "Account info was unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Account info was unable to be retrieved.";
        reject(message)
      }
    });
  });
}

function getSemesterInfo(email, semesterName) {
  return new Promise(function (fulfill, reject) {
    url = process.env.databaseURL + '/RMS/profile/getsemester?email=' + email + '&semesterName=' + semesterName;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Semester Info was unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Semester Info was unable to be retrieved.";
        reject(message)
      }
    });
  });
}


function getReviews(className) {
  return new Promise(function (fulfill, reject) {
    url = process.env.databaseURL + '/RMS/profile/courseinfo?courseName=' + className;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }
      var message;
      if (error != undefined) {
        message = "Semester Info was unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Semester Info was unable to be retrieved.";
        reject(message)
      }
    });
  });
}

function deleteSemester(email, semesterName) {
  return new Promise(function (fulfill, reject) {
    url = process.env.databaseURL + '/RMS/profile/deletesemester?email=' + email + '&semesterName=' + semesterName;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(body);
      }
      var message;
      if (error != undefined) {
        message = "Semester Info was unable to be retrieved due to an error.";
        reject(message);
      }
      if (!error && response.statusCode != 200) {
        message = "Semester Info was unable to be retrieved.";
        reject(message)
      }
    });
  });
}


function newUser(firstName, lastName, email, password) {
  return new Promise(function (fulfill, reject) {
    myUrl = process.env.databaseURL + '/RMS/profile/register';
    var data = {firstName: firstName, lastName: lastName, email: email, password: password};
    request.post(myUrl, {form: data},

      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          fulfill(body);
        }
        var message;
        if (error != undefined) {
          message = "There is already an account associated with this email.";
          console.log(message);
          reject(message);
        }
        if (!error && response.statusCode != 200) {
          message = "There is already an account associated with this email.";
          console.log(message);
          reject(message)
        }
      }
    );
  });
}

function updateSemester(semesterName, courseInfo, email, rating) {
  return new Promise(function (fulfill, reject) {
    myUrl = process.env.databaseURL + '/RMS/profile/semester';
    createTuple2(courseInfo)
      .then(function (myCourses) {
        var data1 = {semesterName: semesterName, email: email, userRating: rating, courses: myCourses};
        request.post(myUrl, {form: data1},

          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              fulfill(body);
            }
            var message;
            if (error != undefined) {
              message = "Semester could not be saved.";
              console.log(message);
              reject(message);
            }
            if (!error && response.statusCode != 200) {
              message = "There was an error.";
              console.log(message);
              reject(message)
            }
          }
        );
      });
  });
}


function newSemester(semesterName, courseInfo, email, rating) {
  return new Promise(function (fulfill, reject) {
    myUrl = process.env.databaseURL + '/RMS/profile/savesemester';
    createTuple(courseInfo)
      .then(function (myCourses) {
        var data1 = {semesterName: semesterName, email: email, ourRating: rating, courses: myCourses};

        //var data = {semesterName: semesterName, courseName: courseName, professor: prof, email: email, ourRating: rating};
        request.post(myUrl, {form: data1},

          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              fulfill(body);
            }
            var message;
            if (error != undefined) {
              message = "Semester could not be saved.";
              console.log(message);
              reject(message);
            }
            if (!error && response.statusCode != 200) {
              message = "There was an error.";
              console.log(message);
              reject(message)
            }
          }
        );
      });
  });
}

function createTuple(courseInfo) {
  return new Promise(function (fulfill, reject) {
    var count = 0;
    var myCourses = "(";
    courseInfo.forEach(function (item) {
      myCourses += ('('+ '"' + item.course + '"' + ',' + '"' + item.professor + '"' + ')' + ', ');
      count++;
      if (count == courseInfo.length) {
        myCourses += ")";
        fulfill(myCourses);
      }
    });
  });
}

function createTuple2(courseInfo) {
  return new Promise(function (fulfill, reject) {
    var count = 0;
    var myCourses = "(";
    courseInfo.forEach(function (item) {
      myCourses += ('('+ '"' + item.grade + '"' + ',' + '"' + item.comments + '"' + ','+  '"' + item.name + '"' 
      + ',' + '"' + item.professor + '"'
      + ',' + '"' + item.diffRating + '"'
      + ',' + '"' + item.workRating + '"'
      + ',' + '"' + item.interestRating + '"'
      + ',' + '"' + item.overallRating + '"'
      +')' + ', ');
      count++;
      if (count == courseInfo.length) {
        myCourses += ")";
        fulfill(myCourses);
      }
    });
  });
}