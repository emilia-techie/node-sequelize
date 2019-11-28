const express = require('express');
const db = require('../models/index');
const User = db.sequelize.models.User;
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { manageValidationMessages, sendSuccessResponse, sendErrorResponse, sendValidationResponse } = require("../helpers/utility");

var lowdb = require('lowdb');
// var storage = require('lowdb/file-sync');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('dbLocal.json')
const dbLocal = lowdb(adapter)

/* get users listing. */
router.get('/', function (req, res) {
    return User.findAll({
        raw: true
    }).then(function (result) {
        res.send(result);
    })
});

/* add-user */
router.post('/', [check('email', 'Email is invalid').isEmail(),
check('firstName', 'First name field is required').not().isEmpty(),
check('lastName', 'Last name field is required').not().isEmpty(),
check('password', 'Password field is required').not().isEmpty(),
check('role', 'Role field is required').not().isEmpty()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        sendValidationResponse(res, manageValidationMessages(errors));
    } else {
        const {
            firstName,
            lastName,
            email,
            password,
            role
        } = req.body;
        User.findOne({
            where: { email: email },
        }).then(userRes => {
            if (userRes) {
                return sendSuccessResponse(res, {}, 'Email already exists!');
            } else {
                User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    role: role
                }).then(result => {
                    sendSuccessResponse(res, result, 'User has been created successfully!')
                }).catch(error => {
                    sendErrorResponse(res, {}, error.parent.sqlMessage)
                });
            }
        })
    }
});

/* update-user */
router.put('/:id', [check('email', 'Email is invalid').isEmail()], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        sendValidationResponse(res, manageValidationMessages(errors));
    } else {
        let userId = req.params.id;
        const { email, firstName, lastName, role } = req.body;
        User.update({
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role
        }, {
                where: { id: userId },
            }).then(result => {
                console.log("---------", result);
                sendSuccessResponse(res, result, 'User has been updated successfully!')
            }).catch(error => {
                sendErrorResponse(res, {}, error.parent.sqlMessage)
            });
    }
});

module.exports = router;