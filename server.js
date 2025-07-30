const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// this is used to authenticate the user using local strategy and this local startegy is used to authenticate the user using username and password

const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
//bodyParser is used to parse the request body
//it is used to parse the json data sent in the request body
   const Person = require("./models/Person");

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`
  );
  // console.log("hii i am a middleware")
  next(); // this is used to call the next middleware in the stack
};
app.use(logRequest);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received credentials:", username, password);
      const user = await Person.findOne({ username });
      if (!user) {
        return done(null, false, { message: "User not exist" });
      }
      const isMatchPass = user.password === password;
      if (!isMatchPass) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      console.error("Error during authentication:", err);
      return done(err);
    }
  })
);

const PersonRoutes = require("./routes/PersonRoutes");
const MenuRoutes = require("./routes/MenuRoutes");

app.get("/",passport.authenticate("local",{session:false}), (req, res) => {
  console.log("Root route hit");
  res.send("Welcome to Hotel... we will try to serve you the best");
});

app.use("/person", PersonRoutes);

app.use("/menu", MenuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
