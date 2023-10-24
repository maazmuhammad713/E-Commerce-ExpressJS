var express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const authController = require("../common/authController");
var router = express.Router();

/* GET users listing. */
router.get("/", authController.authToken, getUsers);
router.get("/:id", getUserById);
router.post("/login", authController.login);
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
