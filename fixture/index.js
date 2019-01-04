/**
 * Created by Josh on 2/23/17.
 */
const express = require('express');
var url = require('url');

function createTestServer() {
    var app = express();
    app.get('/RMS/courseInfo', function (request, response) {
        var parsedUrl = url.parse(request.url, true);
        var query = parsedUrl.query;
        var course = query.course;
        var professor = query.professor;
        var path;
        if (course == null && professor == null) {
            path = '/RMS/courseInfo/allInfo'
        } else {
            path = '/RMS/courseInfo/' + course + '/' + professor;
        }
        response.sendFile(path, {root: './fixture'});
    });


    app.get('/RMS/courseInfo/majors', function (request, response) {
        var path = '/RMS/courseInfo/majors';
        response.sendFile(path, {root: './fixture'});
    });


    app.get('/RMS/courseInfo/courses', function (request, response) {
        var parsedUrl = url.parse(request.url, true);
        var query = parsedUrl.query;
        var major = query.major;
        var path = null;
        if (major == null) {
            path = '/RMS/courseInfo/courses/all';
        } else {
            path = '/RMS/courseInfo/courses/' + major;
        }
        response.sendFile(path, {root: './fixture'});
    });
    
    app.get('/RMS/profile/name', function (request, response) {
        var parsedUrl = url.parse(request.url, true);
        var query = parsedUrl.query;
        var email = query.email;
        var path = '/RMS/profile/name/' + email;
        response.sendFile(path, {root: './fixture'});
    });


    app.get('/RMS/profile/semester/namesAndRatings/', function (request, response) {
        var parsedUrl = url.parse(request.url, true);
        var query = parsedUrl.query;
        var email = query.email;
        var path = '/RMS/profile/semester/namesAndRatings/' + email;
        response.sendFile(path, {root: './fixture'});
    });
    app.use(express.static(__dirname));
    return app;
}


module.exports = createTestServer;