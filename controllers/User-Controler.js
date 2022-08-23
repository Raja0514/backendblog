const model = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await model.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No user Found" });
  }
  return res.status(200).json({ users });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existinguser;
  try {
    existinguser = await model.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existinguser) {
    return res
      .status(400)
      .json({ message: "User Already exiest,please login" });
  }
  let hashpassword = bcrypt.hashSync(password);
  const user = new model({
    name,
    email,
    password: hashpassword,
    blogs:[],
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await model.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existinguser) {
    return res
      .status(404)
      .json({ message: "Email id could not find please sign up" });
  }
  const ispasswordright = bcrypt.compareSync(password, existinguser.password);
  if (!ispasswordright) {
    return res
      .status(404)
      .json({ message: "Could not find  User by this email id " });
  }
  return res.status(200).json({ message: "login successfull",user:existinguser });
};
module.exports = { getAllUser, signup, login };
