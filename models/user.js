const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
};

const validate = (data) => {
  const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
  };

  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions),
  });
  return schema.validate(data);
};

module.exports = { User: mongoose.model("User", userSchema), validate };
