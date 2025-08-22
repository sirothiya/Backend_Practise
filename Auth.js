const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// this is used to authenticate the user using local strategy and this local startegy is used to authenticate the user using username and password
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username });
      if (!user) {
        return done(null, false, { message: "User not exist" });
      }
      const isMatchPass = await user.comparePassword(password);
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

module.exports = passport; 
