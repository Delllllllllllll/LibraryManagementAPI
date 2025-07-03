const express = require('express');
const authRouter = express.Router();
const { authenticate } = require('../controller/authController.js');
const { validateAuth, 
        handleValidationErrors } = require('../middleware/validators.js');

authRouter.route('/auth/login')
                .post(validateAuth,
                      handleValidationErrors,
                      authenticate);

module.exports = authRouter; 