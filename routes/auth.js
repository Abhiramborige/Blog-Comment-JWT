require("dotenv").config();

const jwt=require('jsonwebtoken')

const express = require("express");
const router = new express.Router();
const userDatabase = require("../db/model");
const {authenticateToken} = require("./middleware");

router.post("/submit-blog", authenticateToken, async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.user,
    content: req.body.content,
    likes:0,
    dislikes:0,
    comments:[]
  };
  try {
    // searching for user and accessing the blogs
    let user = await userDatabase
      .findOne({ username: req.user })
      .exec();
    var current_blogs = await user.blogs;
    current_blogs.push(blog);
    try {
      // updating the user
      userDatabase.findOneAndUpdate(
        { username: req.user },
        { blogs: current_blogs },
        (err) => {
          if (err) {
            throw err;
          } else {
            res.status(500).send("Blogs array updated");
          }
        }
      );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/submit-comment", authenticateToken, async (req, res) => {
  const blog_owner_token=req.body.blog_owner_token;
  let blog_owner;
  console.log(blog_owner_token)
  jwt.verify(blog_owner_token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.status(403).send("Valid Blogger not found !\n{message:" + err.message + "}");
    blog_owner=user
  })

  try {
    // searching for user and accessing the blogs
    let user_blog = await userDatabase
      .findOne({ username: blog_owner })
      .exec();
    var current_blogs=user_blog.blogs
    current_blogs=current_blogs.map((blog)=>{
      console.log(blog)
      if(blog!==null){
        if(blog.title===req.body.title){
          blog.likes+=req.body.like
          blog.dislikes+=req.body.dislike
          blog.comments.push(
            {
              username:req.user,
              comment:req.body.comment
            }
          )
        }
      }
      
    })
    console.log(current_blogs)
    let user_comment=await userDatabase
      .findOne({username: req.user})
      .exec();
    try {
      // updating the blogger details
      userDatabase.findOneAndUpdate(
        { username: user_blog.username },
        { blogs: current_blogs},
        (err) => {
          if (err) {
            throw err;
          } else {
            res.status(500).send("Blogs array updated");
          }
        }
      );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

});

module.exports = router;
