const { default: mongoose } = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");
//schema is to define the structure of the document
//it is like a blueprint of the document
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["Manager", "Chef", "Waiter"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    return next(err);
  }
});
// now defining the model
//model is a class that we can use to create and read documents from the collection
personSchema.methods.comparePassword = async function (password) {
  const person = this;
  try {
    // use bcrypt to compare the password
    const isMatch = await bcrypt.compare(password, person.password);
    return isMatch;
  } catch (err) {
    console.error("Error comparing password:", err);
    throw err; // rethrow the error to be handled by the calling function
  }
};

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
