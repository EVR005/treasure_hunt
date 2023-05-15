const jwt = require("jsonwebtoken");
const { jwtDetails } = require("../config/config");
var logger = require("./log")(module);

const verifyToken = (token) => {
  try {
    console.log(token);
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, jwtDetails.secret);
    console.log("decoded : ");
    console.log(decoded);
    return decoded;
  } catch (err) {
    logger.info(err);
    return null;
  }
};

module.exports = {
  verifyToken,
};
