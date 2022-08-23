const mongoose = require("mongoose");
const schema = mongoose.Schema;
const blogschema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type:mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
});
const model1 = mongoose.model("Blog", blogschema);

module.exports=model1
