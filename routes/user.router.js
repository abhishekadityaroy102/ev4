const { Router } = require("express");
const { authentication } = require("../middleware/authentication.middleware");
const { userdataModel } = require("../models/userdata.model");
const userRouter = Router();
userRouter.get("/", authentication, async (req, res) => {
  console.log(req.body);
  const id = req.body?.user_id;
  const userdata = await userdataModel.find({ findid: id });
  return res.send({ data: userdata });

  //   res.send("user apge");
});
userRouter.post("/", authentication, async (req, res) => {
  const id = req.body?.user_id;
  const { taskname, tag } = req.body;
  const newdata = await userdataModel({
    findid: id,
    taskname,
    status: false,
    tag,
  });
  try {
    await newdata.save();
    return res.send({ msg: "data added successfully" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
});
userRouter.delete("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  //   res.send({ id: id });
  try {
    await userdataModel.findOneAndDelete({ _id: id });
    return res.send({ msg: "data deleted successsfully" });
  } catch (err) {
    return res.status(401).send({ msg: "something went wrong" });
  }
});
userRouter.patch("/:id", authentication, (req, res) => {
  res.send("update");
});
module.exports = { userRouter };
