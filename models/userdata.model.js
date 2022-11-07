const mongoose = require("mongoose");
const userdataSchema = new mongoose.Schema({
  findid: String,
  taskname: { type: String },
  status: Boolean,
  tag: String,
});
const userdataModel = mongoose.model("users", userdataSchema);
module.exports = { userdataModel };
