const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
//bodyParser is used to parse the request body
//it is used to parse the json data sent in the request body

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`
  );
  // console.log("hii i am a middleware")
  next(); // this is used to call the next middleware in the stack
};
app.use(logRequest);

const passport = require("./Auth");
app.use(passport.initialize());

const PersonRoutes = require("./routes/PersonRoutes");
const MenuRoutes = require("./routes/MenuRoutes");

const LocalAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("Welcome to Hotel... we will try to serve you the best");
});

app.use('/person', PersonRoutes);

app.use('/menu', MenuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
