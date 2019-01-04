/**
 * Created by Josh on 2/23/17.
 */
const chai = require('chai');
const expect = chai.expect;
const fixture = require('../../../fixture')();

var database = require('../database-access');

describe('Database', function () {
    var server, host;
    before(function () {
        new Promise(resolve => {
            server = fixture.listen(3000, () => {
                var port = server.address().port;
                host = `http://127.0.0.1:${port}`;
                //host = `http://localhost:5000`;
                resolve();
            });
        });
    });

    after(function () {
        server.close();
    });
    
    describe('Course Info', function () {
        var course, professor;
        beforeEach(function () {
            process.env.databaseURL = host;
            course = "cs1331";
            professor = "simpkins";
        });
        
        it('should not be null', function () {
            var courseInfo = database.getCourseInfo(course, professor);
            return courseInfo.then(function (data, err) {
                expect(err).to.not.be.ok;
                expect(data).to.not.be.null;
            });
        });

        it('should return a list of objects with property course, professor, gpa, credits, and major', function () {
            var courseInfo = database.getCourseInfo(course, professor);
            return courseInfo.then(function (data, err) {
                expect(data)[0].to.have.deep.property('course');
                expect(data)[0].to.have.deep.property('professor');
                expect(data)[0].to.have.deep.property('gpa');
                expect(data)[0].to.have.deep.property('credits');
                expect(data)[0].to.have.deep.property('major');
            });
        });
        
    });

    describe('List of Majors', function () {
        beforeEach(function () {
            process.env.databaseURL = host;
        });

        it('should not be null', function () {
            var courseInfo = database.getMajors();
            return courseInfo.then(function (data, err) {
                expect(err).to.not.be.ok;
                expect(data).to.not.be.null;
            });
        });

        it('should return a list of majors', function () {
            var courseInfo = database.getMajors();
            return courseInfo.then(function (data, err) {
                expect(data).to.have.property.length;
            });
        });

    });



    describe('List of Courses Given Major', function () {
        var major;
        beforeEach(function () {
            process.env.databaseURL = host;
            major = "cs";
        });

        it('should not be null', function () {
            var courseInfo = database.getCourses(major);
            return courseInfo.then(function (data, err) {
                expect(err).to.not.be.ok;
                expect(data).to.not.be.null;
            });
        });

        it('should return a list of courses', function () {
            var courseInfo = database.getCourses(major);
            return courseInfo.then(function (data, err) {
                expect(data).to.have.deep.property.length;
            });
        });

    });


    describe('List of All Courses', function () {
        beforeEach(function () {
            process.env.databaseURL = host;
        });

        it('should not be null', function () {
            var courseInfo = database.getAllCourses();
            return courseInfo.then(function (data, err) {
                expect(err).to.not.be.ok;
                expect(data).to.not.be.null;
            });
        });

        it('should return a list of courses objects with properties course and major', function () {
            var courseInfo = database.getAllCourses();
            return courseInfo.then(function (data, err) {
                expect(data).to.have.deep.property.length;
                expect(data[0]).to.have.deep.property('course');
                expect(data[0]).to.have.deep.property('major');

            });
        });

    });




});