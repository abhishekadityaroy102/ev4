const { Router } = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");
const signupRouter = Router();
signupRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const isuser = await userModel.findOne({ email });
  if (isuser) {
    return res
      .status(401)
      .send({ msg: "User already exist plase try another email id" });
  }
  bcrypt.hash(password, 4, async (err, hash) => {
    if (err) {
      return res.status(401).send({ msg: "something went wrong" });
    }
    let newuser = await userModel({
      email,
      password: hash,
    });
    try {
      await newuser.save();
      return res.send({ msg: "SIGNUP successful" });
    } catch (err) {
      return res.status(401).send({ msg: "something went wrong in hash" });
    }
  });
});
module.exports = { signupRouter };
