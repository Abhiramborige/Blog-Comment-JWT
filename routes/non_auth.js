require('dotenv').config();

const express = require("express");
const router = new express.Router();;
const userDatabase = require("../db/model");
const token=require('./middleware')


router.post("/login-user", async (req, res) => {
  let user;
  try {
    user = await userDatabase.findOne({ username: req.body.name }).exec();
    if (user === null) {
      return res.status(400).send("Cannot find user.");
    }
    try {
      const password = req.body.password;
      if (password !== user.password) {
        throw new Error();
      } else {
        // set JWT.
        const accessToken=token.generateAccessToken(user)

        // create refresh token
        // const refreshToken=jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        res.status(500).json({accessToken:accessToken/* , refreshToken: refreshToken */})
      }
    } catch (error) {
      res
        .status(400)
        .send("Sorry wrong password !\n{message:" + error.message + "}");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/register-user", async (req, res) => {

  const oldUser = await userDatabase.findOne({ username:req.body.name });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  const user = new userDatabase({
    username: req.body.name,
    password: req.body.password,
  });
  
  try {
    const newUser = await user.save();
    res.status(201);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get("/users", async (req, res) => {
  try {
    const users = await userDatabase.find();
    res.json(users);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});


module.exports = router;