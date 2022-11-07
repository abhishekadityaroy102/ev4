const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.SECRET_KEY;
const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "you are not authorized" });
  }
  jwt.verify(token, secretkey, (err, decoded) => {
    if (decoded) {
      console.log(decoded);
      const user_id = decoded.userdata._id;
      req.body.user_id = user_id;
      next();
    } else {
      return res.status(401).send({ msg: "Please login first" });
    }
  });
};

module.exports = { authentication };
