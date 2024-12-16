const express = require("express");

const loginController = require("../controllers/auth/signin");
const resetPassword = require("../controllers/auth/reset-password");
const forgetPassword = require("../controllers/auth/forget-password");
const verfiy = require("../controllers/auth/verfiy");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/login", loginController.login);
router.post("/resetPassword", isAuth(), resetPassword.resetPassword);
router.post("/forgetPassword", forgetPassword.forgetPassword);
router.post("/verfiy", verfiy.verfiy);

module.exports = router;
