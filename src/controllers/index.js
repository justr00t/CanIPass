var express = require('express');
var router = express.Router();

var RatingGenerator = require('../logic/generate-rating');
var Database = require('../util/database-access');
var url = require('url');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var validator = require('validator');

var React = require('react');
var ReactDOMServer = require('react-dom/server');

require('babel-register')({
  "presets": ["es2016"]
});



/* GET home page. */
router.get('/login', function (req, res, next) {
  res.render('login', {error: "0"});
});

router.post('/login', function (req, res, next) {
  var email = req.body.user;
  var givenPassword = req.body.password;
  Database.confimCredentials(email)
    .then(function(password) {
      if (bcrypt.compareSync(givenPassword, password)) {
        req.session.email = email;
        req.session.authenticated = true;
        res.redirect('/');
      } else {
        res.render('login', {
          error: '1'
        });
      }
    })
    .catch(function (err) {
      res.render('login', {
        error: '1'
      });
    });
});

router.get('/logout', function (req, res, next) {
  delete req.session.authenticated;
  res.redirect('/');
});


router.get('/register', function (req, res, next) {
  res.render('register', {
    error: '0'
  });

});

router.post('/register', function (req, res, next) {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.user;
  var password = req.body.password;
  var hash = bcrypt.hashSync(password, 10);
  Database.newUser(firstName, lastName, email, hash)
    .then(function () {
      res.render('registerSuccess')
    })
    .catch(function (err) {
      res.render('register', {
        error: '1'
      });
    });
});


router.get('/reviews', function (req, res, next) {
  Database.getAllCourseInfo()
    .then(function (data) {
      if (req.session && req.session.authenticated) {
        res.render('reviewsLoggedIn', {
          courseInfo: JSON.stringify(data),
          reviews: "[]"
        });
      } else {
        res.render('reviews', {
          courseInfo: JSON.stringify(data),
          reviews: "[]"
        });
      }
    });
});


router.post('/reviews', function (req, res, next) {
    var className = req.body.class;
    Database.getReviews(className).
        then(function (reviews) {
            Database.getAllCourseInfo()
                .then(function (data) {
                    if (req.session && req.session.authenticated) {
                        res.render('reviewsLoggedIn', {
                            courseInfo: JSON.stringify(data),
                            reviews: JSON.stringify(reviews),
                            className: className

                        });
                    } else {
                        res.render('reviews', {
                            courseInfo: JSON.stringify(data),
                            reviews: JSON.stringify(reviews),
                            className: className
                        });
                    }
                });
        });
});


router.get('/profile', function (req, res, next) {
  var email = req.session.email;
  Database.getProfileName(email).
  then(function (name) {
    Database.getSemesterNamesAndRatings(email)
      .then(function (data) {
        res.render('profile', {
          userName: name,
          semesterInfo: JSON.stringify(data)
        });
      });
  });
});

router.post('/profile', function (req, res, next) {
  var email = req.session.email;
  var semesterName = req.body.semesterName;
  Database.deleteSemester(email, semesterName).
  then(function (response) {
    res.redirect('/profile');
  });
});

router.get('/feedback', function (req, res, next) {
    var email = req.session.email;
    parsedUrl = url.parse(req.url, true);
    query = parsedUrl.query;
    var semesterName = query.semester;
    var rating = "";
    Database.getSemesterInfo(email, semesterName).
        then(function (data) {
            rating = data.ourrating;
            res.render('feedback', {
                semesterInfo: JSON.stringify(data),
                semesterName: JSON.stringify(semesterName),
                semesterNamePretty: semesterName,
                rating: rating
            });
    });
  });

router.post('/feedback', function (req, res, next) {
  console.log(req.body);
  var semesterName = JSON.parse(req.body.semesterName);
  var rating = req.body.userRating;
    if (rating === "-- None --") {
        rating = 0;
    }
  var courseInfo = JSON.parse(req.body.courseInfo);
  var inputData = [];
  var count = 0;
  courseInfo.courses.forEach(function (info) {
      count++;
      var comments = req.body["comment" + count];
      var interestRating = req.body["interestRating" + count] === undefined ? info.Interest : req.body["interestRating" + count];
      var diffRating = req.body["diffRating" + count] === undefined ? info.Difficulty : req.body["diffRating" + count];
      var workRating = req.body["workRating" + count] === undefined ? info.Workload : req.body["workRating" + count];
      if (interestRating === 'none') {
          interestRating = 0;
      }
      if (diffRating === 'none') {
          diffRating = 0;
      }
      if (workRating === 'none') {
          workRating = 0;
      }
      var overallRating = null;
      if (interestRating != 0 && diffRating != 0 && workRating != 0) {
          overallRating = (parseInt(interestRating) + (6 - parseInt(diffRating)) + (6 - parseInt(workRating))) / 3;
      }
    inputData.push({name: info.name, professor: info.professor, grade: req.body["grade" + count], diffRating: diffRating,
        workRating: workRating, interestRating: interestRating, overallRating: overallRating,
        comments: comments});
  });
    console.log(inputData);
  Database.updateSemester(semesterName, inputData, req.session.email, rating)
    .then(function (response) {
      res.redirect('/profile');
    })
    .catch(function (err) {
      res.render('feedback', {
        semesterInfo: JSON.stringify(courseInfo)
      });
    });
});


router.get('/', function(req, res, next) {
  Database.getAllCourseInfo()
      .then(function (data) {
          if (req.session && req.session.authenticated) {
              res.render('homeLoggedIn', {
                  courseInfo: JSON.stringify(data)
              });
          } else {
              res.render('home', {
                  courseInfo: JSON.stringify(data)
              });
          }
      });
});

router.post('/generateRating', function (req, res, next) {
  console.log("posting!!!!!!!!!!!!!!");
    var semesterName = req.body.name;
    var rating = req.body.ourRating;
    var courseInfo = JSON.parse(req.body.courseInfo);
    Database.newSemester(semesterName, courseInfo, req.session.email, rating)
        .then(function (response) {
            res.redirect('/profile');
        })
        .catch(function (err) {
            res.render('generateRating', {
                rating: rating,
                semesterInfo: JSON.stringify(courseInfo)
            });
        });
});

router.get('/generateRating', function(req, res, next) {
  var i, courses, parsedUrl, query, numCoursesReturned, courseProfessor, erred;
  parsedUrl = url.parse(req.url, true);
  query = parsedUrl.query;
  console.log(query)
  console.log(query.courses)
  courseProfessor = JSON.parse(query.courses);
  courses = [];
  numCoursesReturned = 0;

  erred = false;
  //console.log(courseProfessor);
  for (i = 0; i < courseProfessor.length; i++) {
    //console.log("Requesting information for: " + courseProfessor[i].course);
    var professor = (courseProfessor[i].professor === "Professor Not Listed") ?
        "" : courseProfessor[i].professor;
    Database.getCourseInfo(courseProfessor[i].course, professor)
      .then(function(response) {
        //console.log("Successful Retrieval: ", response[0]);
        numCoursesReturned++;
        courses.push(response[0]);
        if (!erred && numCoursesReturned == courseProfessor.length) {
          RatingGenerator.createRatingJson(courses, function(result) {
            var results = {
              rating: result.rating,
              fields: JSON.stringify(["Course", "Professor", "GPA", "Difficulty", "Interest Level"]),
              correspFields: JSON.stringify(["course", "professor", "gpa", "courseAndProfessorDifficulty", "courseInterest"]),
              fieldDescriptions: JSON.stringify([
                "",
                "",
                "The average GPA of the course specific to the professor, unless the professor is not listed.",
                "Community rating out of 5 of the course's difficulty with the professor.",
                "Community rating out of 5 of the coures's interest level with the professor."
              ]),
              semesterInfo: JSON.stringify(courses),
              reasons: JSON.stringify(result.reasons),
              loggedIn: ((req.session && req.session.authenticated) ? 1 : 0)
            };
            if (results.loggedIn) {
              res.render('generateRatingLoggedIn', results);
            } else {
              res.render('generateRating', results);
            }
          });
        }
      }, function(error) {
        console.log("Failed Retrieval: ", response[0]);
        numCoursesReturned++;
        erred = true;
        console.log(error, courseProfessor[i].course, courseProfessor[i].professor);
        if (numCoursesReturned == courseProfessor.length) {
          renderGenerateRating(req, res, {
            rating: "Error",
            semesterInfo: JSON.stringify(courses)
          });
        }
      });
  }
});

function renderGenerateRating(req, res, result) {
  console.log(result);
  if (req.session && req.session.authenticated) {
    console.log("authenticated generate rating.");
    res.render('generateRatingLoggedIn', result);
  } else {
    res.render('generateRating', result);
  }
}

router.get('/contact', function (req, res, next) {
    if (req.session && req.session.authenticated) {
        res.render('contactLoggedIn');
    } else {
        res.render('contact');
    }
  });

router.post('/contact', function (req, res) {
    //honeypot for spambots
    console.log("test1");
    //if(req.body.company) {
    //    console.log("test2");
    //    res.render('contact', {
    //        title: 'Contact',
    //        err: true,
    //        page: 'contact',
    //        type: 'empty',
    //        body: req.body.message,
    //        name: req.body.name,
    //        email: req.body.email,
    //        msg: 'Spambot detected.'});
    //    return;
    //}

    //check if all required fields are filled
    if(! req.body.name || ! req.body.email || ! req.body.message) {
        console.log("test3");
        res.render('contact', {
            title: 'Contact',
            err: true,
            page: 'contact',
            type: JSON.stringify('empty'),
            body: JSON.stringify(req.body.message),
            name: JSON.stringify(req.body.name),
            email: JSON.stringify(req.body.email),
            msg: 'Please fill in all required fields, thanks!'});
        return;
    }

    //check for valid email
    var email_check = validator.isEmail(req.body.email);
    if(email_check == false) {
        console.log("test4");
        res.render('contact', {
            title: 'Contact',
            err: true,
            page: 'contact',
            type: JSON.stringify('error'),
            body: JSON.stringify(req.body.message),
            name: JSON.stringify(req.body.name),
            email: JSON.stringify(req.body.email),
            msg: 'Email is not valid. Please check your email and try again!'});
        return;
    }
    console.log("test5");
    //set up smtp mailer
    var mailOpts, smtpTrans;
    //set up nodemailer transport
    smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "canipassbyns@gmail.com",
            pass: "ratemysemester"
        }
    });

    //fill mail options
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: 'jnicoara11@gmail.com',
        subject: 'Website Contact',
        text: '\nName: ' + req.body.name + '\nEmail: ' + req.body.email + '\nMessage: ' + req.body.message
    };

    smtpTrans.sendMail(mailOpts, function (error, info) {
        //email not sent
        if(error) {
            console.log("test6");
            res.render('contact', {
                title: 'Contact',
                page: 'contact',
                type: JSON.stringify('error'),
                description: 'error'});
        }
        //email sent
        else {
            console.log("test7");
            res.render('contact', {
                title: 'Contact',
                page: 'contact',
                type: JSON.stringify('success'),
                description: 'success'});
        }
    });
});


module.exports = router;
