var express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);

module.exports = router;
