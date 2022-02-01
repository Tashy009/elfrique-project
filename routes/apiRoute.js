const express = require("express");
//const Auth = require("../middlewares/Auth");

const AuthController = require("../controllers/Auth");

const {
  registerValidation,
  validate,
  loginValidation,
  resetPasswordValidation,
} = require("../helpers/validator");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome To elfrique API");
});

router.post(
  "/signup",
  registerValidation(),
  validate,
  AuthController.registerUser
);

router.post("/login", loginValidation(), validate, AuthController.login);

router.get("/verifyemail", AuthController.verifyEmail);

router.post(
  "/resetpassword",
  resetPasswordValidation(),
  validate,
  AuthController.resetpassword
);

router.post("/getpasswordlink", AuthController.postresetlink);

module.exports = router;
