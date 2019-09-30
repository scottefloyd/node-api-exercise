const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const userController = require('../controllers/users');

router.post("/login", userController.user_login);

router.get("/", userController.get_all_users);

router.get("/:userId", userController.get_single_user);

router.post("/signup", userController.signup_user);

router.delete("/:userId", checkAuth, userController.delete_user);

module.exports = router;
