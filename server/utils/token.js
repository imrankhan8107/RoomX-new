const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const path = require("path");

config({ path: "./.env" });

function signToken(userId, username, email, org_code) {
  const data = {
    user: {
      userId,
      username,
      email,
      org_code,
    },
  };

  return jwt.sign(data, "mysecret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "4h",
  });
}

module.exports = {
  signToken,
};
