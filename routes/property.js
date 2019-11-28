const express = require('express');
const db = require('../models/index');
const Property = db.sequelize.models.Property;
const User = db.sequelize.models.User;
const { Op } = require('sequelize')

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { manageValidationMessages, sendSuccessResponse, sendErrorResponse, sendValidationResponse } = require("../helpers/utility");

/* get Properties listing. */
router.get('/', function (req, res) {
    return Property.findAll({
        raw: true
    }).then(function (result) {
        res.send(result);
    })
});

/* add-Property */
router.post('/', [check('propertyName', 'Property name required').isEmpty(),
check('propertyType', 'Property type is required').not().isEmpty(),
check('amenities', 'Please enter amenities').not().isEmpty(),
check('userId', 'userId is required').not().isEmpty(),
], (req, res, next) => {
    const errors = validationResult(req)
    console.log("------", errors);
    if (!errors.isEmpty()) {
        console.log("check req body-----", req.body);
        sendValidationResponse(res, manageValidationMessages(errors));
    } else {
        const {
            propertyName,
            propertyType,
            amenities,
            userId,
        } = req.body;
        Property.create({
            propertyName: propertyName,
            propertyType: propertyType,
            amenities: amenities,
            userId: userId,
        }).then(result => {
            sendSuccessResponse(res, result, 'Property has been created successfully!')
        }).catch(error => {
            sendErrorResponse(res, {}, error.parent.sqlMessage)
        });
    }
});

function testClosure() {
    var b = 11;
    function inner() {
        return b;

    }
    return inner;
}
var get_func_inner = testClosure();

console.log(get_func_inner());
/* join-query*/

function setTimeoutQues() {
    const arr = [10, 12, 15, 21];
    for (let i = 0; i < arr.length; i++) {
        setTimeout(function () {
            //  console.log('The index of this number is: ' + i, "value-------",arr[i]);
        }, 3000);
    }

    for (var i = 0; i < arr.length; i++) {
        setTimeout(function () {
            //console.log('Index: ' + i, "value----",arr[i]);
        }, 3000);
    }

    for (var i = 0; i < arr.length; i++) {
        setTimeout(function (i) {
            return function () {
                //  console.log('The index of this number is: ' + i, "value-------", arr[i]);
            }
        }(i), 3000);
    }


    for (var i = 0; i < 4; i++) {
        setTimeout(function () {
            console.log(i);
        }, 1000);
    }
}

//let getTimeOut = setTimeoutQues();


var arr = [10, 20, 30, 40, 50, 60];

function sumOfArray(item) {
    let d = arr.reduce(function (total, currentVal) {
        console.log("total---", total, "currentVal-------", currentVal);
        return total + currentVal;
    });
    // console.log("second--------", d);
    let arr2 = [1, 2, 3, 4, 5];
    arr2.firstName = "Aparajita";
    arr2.other = { day: "Monday" };
    console.log("arr length---------", arr2.length, "data---", arr2);
}

var reduce = sumOfArray();
router.get('/user-property/:id', (req, res, next) => {
    console.log("calling route-----ARP");
    let userId = req.params.id;
    let attributes = ['id', 'propertyName', 'propertyType', 'amenities'];
    let where = { userId: userId }
    Property.findOne({
        where: where,
        attributes: attributes,
        include: [{ model: User }]
    }).then(result => {
        console.log("---------", result);
        sendSuccessResponse(res, result, 'Property details found!')
    }).catch(error => {
        console.log("catch error-----", error);
        sendErrorResponse(res, {}, error.parent.sqlMessage)
    });
});

router.get('/filter-property', (req, res, next) => {
    let rent = req.query.rent;
    console.log("rent----------", rent);
    let attributes = ['id', 'propertyName', 'rent', 'propertyType', 'amenities'];
    let where = { rent: { [Op.gte]: rent } }
    Property.findAll({
        where: where,
        attributes: attributes,
        // hasOne: [{ model: User }]
    }).then(result => {
        sendSuccessResponse(res, result, 'Property details found!')
    }).catch(error => {
        console.log("catch error-----", error);
        sendErrorResponse(res, {}, error.parent)
    });
});

module.exports = router;