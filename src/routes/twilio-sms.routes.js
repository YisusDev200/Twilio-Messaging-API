const express = require("express");
const { body } = require("express-validator");
const {
  sendMessage,
  sendConfirmationMessage,
} = require("../controllers/twilio-sms.controller");
const validateMessageData = require("../middleware/validationMiddleware"); 
const routes = express.Router();

//send message to a number
routes.post(
  "/send",validateMessageData,sendMessage
);

//respond automatically when someone sends us a message

routes.post("/sms", sendConfirmationMessage);

module.exports = routes;
