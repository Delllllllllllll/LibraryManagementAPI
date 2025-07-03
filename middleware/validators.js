const { body, validationResult } = require("express-validator");

const validateUser = [
  body("name").trim().isLength({ min: 3 }).withMessage("Name is required"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("pwd")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters or more")
    .matches(/^(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contains atleast one uppercase and one number"),
];

const validateAuth = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
]

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); // This will get the error if any validations failed
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: errors.array(),
    });
  }
  //  If there are no errors in the validation then continue to the next middleware which is the RegisterNewUser
  next();
};

module.exports = {
  validateUser,
  validateAuth,
  handleValidationErrors,
};
