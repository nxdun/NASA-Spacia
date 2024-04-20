const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { connect } = require("./config/dbconnection.js");
const logger = require("./config/logger.js");
const authRouter = require("./routes/authRouter.js");
const apiRouter = require("./routes/userRolesRoutes.js");
const jwtAuth = require("./middleware/middlewareJwt.js");

const app = express();
const port = process.env.PORT || 3000; //default is 3000
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: ";{  Too many requests Try again later. };",
  code: 503, //send service unavailable response
});
//for fix cors error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth"); 
  next();
});
require("dotenv").config(); //enviroment variable initialization
app.use(helmet()); // Middleware for anti-XSS attacks
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // parse Body field
app.use(limiter); // Apply the rate limiter to all requests

// Version 1 routes
//use jwtAuth middleware to protect the routes..
app.use("/v1/api", jwtAuth);
app.use("/v1/api", apiRouter);
app.use("/v1/auth", authRouter);

//route all other requests
app.use("*", (req, res) => {
  res.status(405).json({ message: "Route not found" });
});

app.listen(port, () => {
  connect(); //connect with mongodb
  logger.info(`Server is running on port  ${port}`);
});

//for testing purposes
module.exports = app;
