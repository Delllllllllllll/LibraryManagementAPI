const express = require('express');
const usersRouter = express.Router();
const { registerNewUser, 
        getUsers, 
        deleteUser } = require('../controller/usersController.js');
const { validateUser, 
        handleValidationErrors } = require('../middleware/validators.js');
const verifyAccess = require('../middleware/verify_access.js');

usersRouter.route('/users')
            .get(verifyAccess, getUsers) 
            .post(verifyAccess, validateUser, handleValidationErrors, registerNewUser);

usersRouter.route('/users/:id') 
                .delete(deleteUser);

module.exports = usersRouter; 
