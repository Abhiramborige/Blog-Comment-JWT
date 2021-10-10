const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs:[]
  /* 
  blog={
    title: "Title of blog",
    author: "Username of author of blog"
    content: "Main content",
    likes: "number",
    dislikes: "number",
    comments:[
      {
        username:"Commenter username",
        comment:"Commented comment"
      }
    ]
  }
  */
});

// name of model and schema.
module.exports = mongoose.model("userDatabase", userSchema);