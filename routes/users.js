const express = require('express');
const usersRouter = express.Router();
const { registerNewUser, getUsers, deleteUser } = require('../controller/usersController.js');

usersRouter.route('/users')
            .get(getUsers) 
            .post(registerNewUser);

usersRouter.route('/users/:id') 
                .delete(deleteUser);

module.exports = usersRouter;