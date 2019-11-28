var expect = require('chai').expect;
var request = require('request');
const baseUrl= 'http://localhost:4000/';
const app = require('../app');
// const request = require('supertest');
// var supertest = require('supertest');
// var chai = require('chai');
// var uuid = require('uuid'); const express = require('express');
// var lowdb = require('lowdb');
// var storage = require('lowdb/file-sync');
// const app = express();

// global.uuid = uuid;
// global.expect = chai.expect;
// global.request = supertest(app);

// In this test it's expected a property list of two properties
// describe('GET /properties', function() {
//     it('returns a list of properties', function(done) {
//         request(app).get('/properties')
//             .expect(200)
//             .end(function(err, res) {
//                 console.log("res.body===",res.body);
//                 expect(res.body).to.have.lengthOf(2);
//                 done(err);
//             });
//     });
// });

describe('GET /properties', function () {
    it('Get all properties api', function (done) {
        request(baseUrl+'properties', function (error, response, body) {
            console.log("body-data-----------", typeof body);
            // expect(body).to.equal('Hello World');
            expect(JSON.parse(body)).to.have.lengthOf(3);
            done();
        });
    });
});

describe('/user-property/:id', function () {
    it('Get properties by userId', function (done) {
        var user = app.db('task_management').first();
        console.log("taskId-----------",user);
        let api=baseUrl+'properties/user-property/11';
        console.log("api--------",api);
        request(api, function (error, response, body) {
            console.log("body-data-----------",  body);
            // expect(body).to.equal('Hello World');
            // expect(JSON.parse(body)).to.have.lengthOf(3);
            done();
        });
    });
});

