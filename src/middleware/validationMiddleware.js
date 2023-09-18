const { body, validationResult } = require("express-validator");

const validateMessageData = [
  body("countryCode")
    .notEmpty()
    .withMessage("countryCode is required.")
    .isNumeric()
    .withMessage("countryCode must be a number.")
    .isLength({ min: 2, max: 3 })
    .withMessage("country Code must be a number greater than 1 and less than 4"),
  body("number")
    .notEmpty()
    .withMessage("number is required.")
    .isNumeric()
    .withMessage("number must be a number.")
    .isLength({ min: 10, max: 10 })
    .withMessage("number must have 10 digits."),
  body("message").notEmpty().withMessage("message cannot be empty."),
];

module.exports = validateMessageData;
