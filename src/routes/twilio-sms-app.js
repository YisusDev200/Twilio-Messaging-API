const express = require("express");
const { body, validationResult } = require("express-validator");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const routes = express.Router();
//Get Twilio credentials and phone numbers from environment variables
const { ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);


//send message to a number
routes.post(
  "/send",
  [
    body("countryCode")
      .notEmpty()
      .withMessage("countryCode is required.")
      .isNumeric()
      .withMessage("countryCode must be a number.")
      .isLength({ min: 2, max: 3 })
      .withMessage(
        "country Code must be a number greater than 1 and less than 4"
      ),
    body("number")
      .notEmpty()
      .withMessage("number is required.")
      .isNumeric()
      .withMessage("number must be a number.")
      .isLength({ min: 10, max: 10 })
      .withMessage("number must have 10 digits."),
    body("message").notEmpty().withMessage("message cannot be empty."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { countryCode, number, message } = req.body;
    // Create and send a message
    client.messages
      .create({
        to: `+${countryCode}${number}`,
        from: TWILIO_NUMBER,
        body: message,
      })
      .then(({ sid }) => {
        console.log(`Message sent with SID: ${sid}`);
        res
          .status(200)
          .json({ message: "The request was processed successfully." });
      })
      .catch((error) => {
        console.error(`Error sending message: ${error.message}`);
        res.status(400).json({
          error: "The request could not be processed due to invalid data.",
        });
      });
  }
);

//respond automatically when someone sends us a message

routes.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("I have received your message");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
  // Print something to the terminal after sending the response
  console.log("Message sent successfully");
});

module.exports = routes;
