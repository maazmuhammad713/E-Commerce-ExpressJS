const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const { models } = require("../models");
let tokens = [];

function generateAccessToken(user) {
  return jwt.sign(user, config.jwt);
}

module.exports = {
  authToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, config.jwt, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    let user = await models.user.findOne({
      where: { email: email },
    });
    user = user?.dataValues;
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateAccessToken(user);
      tokens.push(token);
      res.json({ token: token });
    } else {
      res.send("User doesn't Exist");
    }
  },
};
