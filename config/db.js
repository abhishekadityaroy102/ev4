const mongoose = require("mongoose");
require("dotenv").config();
const database = process.env.DATABASE;

const connection = mongoose.connect(database);
module.exports = { connection };
