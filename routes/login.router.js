const { Router } = require("express");
const loginRouter = Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const secret_key = process.env.SECRET_KEY;
loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userdata = await userModel.findOne({ email });
  const hash_password = userdata?.password;
  bcrypt.compare(password, hash_password, async (err, result) => {
    if (result) {
      let token = await jwt.sign({ userdata }, secret_key);
      console.log(token);
      return res.send({ token: token });
    }
    return res
      .status(401)
      .send({ msg: "please enter correct passwrord and email" });
  });
});
module.exports = { loginRouter };
