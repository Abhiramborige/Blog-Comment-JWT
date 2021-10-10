require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Got error");
    console.log(err);
  });

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const nonauthRouter = require("./routes/non_auth");
app.use("/", nonauthRouter);

app.listen(3000, () => console.log("Server started"));
