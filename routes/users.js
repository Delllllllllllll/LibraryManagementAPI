const express = require('express');
const usersRouter = express.Router();
const { registerNewUser, 
        getUsers, 
        deleteUser } = require('../controller/usersController.js');
const { validateUser, 
        handleValidationErrors } = require('../middleware/validators.js');

usersRouter.route('/users')
            .get(getUsers) 
            .post(validateUser, handleValidationErrors, registerNewUser);

usersRouter.route('/users/:id') 
                .delete(deleteUser);

module.exports = usersRouter; 
