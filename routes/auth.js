const express = require("express");

const loginController = require("../controllers/auth/signin");
const resetPassword = require("../controllers/auth/reset-password");
const forgetPassword = require("../controllers/auth/forget-password");
const verfiy = require("../controllers/auth/verfiy");
const createAdmin = require("../controllers/auth/Create-admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/login", loginController.login);
router.put("/resetPassword", isAuth(), resetPassword.resetPassword);
router.put("/forgetPassword", forgetPassword.forgetPassword);
router.post("/verfiy", verfiy.verfiy);
router.post("/admin-create", createAdmin.adminCreate);

module.exports = router;
