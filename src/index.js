const express = require("express");
const app = express();
require("dotenv").config();
const RoutesTwilio = require('./routes/twilio-sms.routes');
var cors = require("cors");


const port = process.env.PORT || "3000";

app.listen(port,()=>console.log(`server on port ${port}`));

//middleware
app.use(cors());
app.use(express.json())
app.use('/', RoutesTwilio);
