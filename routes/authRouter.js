const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const auth = require("../middlewares/auth");

const router = express.Router();

// router.post("/register", register);

//This is to handle errors
router.route("/register").post(register).all(methodNotAllowed);

//=================================

// router.post("/login", login);

//This is to handle errors
router.route("/login").post(login).all(methodNotAllowed);

// =============================
router.route("/user").post(auth, getUser).all(methodNotAllowed);

module.exports = router;
