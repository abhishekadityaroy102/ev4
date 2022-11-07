const express = require("express");
const { connection } = require("./config/db");
const { loginRouter } = require("./routes/login.router");
const { signupRouter } = require("./routes/signup.router");
const { userRouter } = require("./routes/user.router");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("HELLo");
});
app.listen(8080, async () => {
  try {
    await connection;
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
  console.log("porting on 8080");
});
