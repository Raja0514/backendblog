const { default: mongoose } = require("mongoose");
const blog = require("../models/Blog");
const User = require("../models/User");

const getAllblogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await blog.find().populate('user');
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blogs });
};

const addblogs = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existinguser;
  try {
    existinguser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existinguser) {
    return res.status(400).json({ message: "unable to find the user id" });
  }

  const blog1 = new blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    blog1.save(session);
    existinguser.blogs.push(blog1);
    await existinguser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog1 });
};

const updateblogs = async (req, res, next) => {
  const { title, description } = req.body;

  const blogid = req.params.id;
  let blog2;
  try {
    blog2 = await blog.findByIdAndUpdate(blogid, { title, description });
  } catch (err) {
    return console.log(err);
  }
  if (!blog2) {
    return res.status(500).json({ message: "unable to update" });
  }
  return res.status(200).json({ blog2 });
};

const getoneID = async (req, res, next) => {
  const getid = req.params.id;
  let findid;
  try {
    findid = await blog.findById(getid);
  } catch (err) {
    return console.log(err);
  }
  if (!findid) {
    return res.status(404).json({ message: "id not find" });
  }
  return res.status(200).json({ findid });
};

const deleteID = async (req, res, next) => {
  const delid = req.params.id;
  let getid;
  try {
    getid = await blog.findByIdAndRemove(delid).populate("user");
    await getid.user.blogs.pull(getid);
    await getid.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!getid) {
    return res.status(404).json({ message: "not found id" });
  }
  return res.status(200).json({ message: "id deleted succesfully" });
};

const userID = async (req, res, next) => {
  const userId = req.params.id;
  let userblogs;
  try {
    userblogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    console.log(err);
  }
  if (!userblogs) {
    return res.status(404).json({ gyy });
  }

  return res.status(200).json({ user: userblogs });
};

module.exports = {
  getAllblogs,
  addblogs,
  updateblogs,
  getoneID,
  deleteID,
  userID,
};
