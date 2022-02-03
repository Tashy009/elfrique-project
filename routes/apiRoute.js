const express = require("express");
const Auth = require("../middleware/UserAuth");

const AuthController = require("../controllers/Auth");

const ProfileController = require("../controllers/profile");

const VoteContestController = require("../controllers/votingcontest");

const {
  registerValidation,
  validate,
  loginValidation,
  resetPasswordValidation,
  changePasswordValidation,
  createVoteValidation,
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

router.get("/getuserProfile", Auth, ProfileController.getUserProfile);

router.post("/edituserProfile", Auth, ProfileController.editUserProfile);

router.post(
  "/changepassword",
  Auth,
  changePasswordValidation(),
  validate,
  ProfileController.changePassWord
);

router.post(
  "/createteVote",
  Auth,
  changePasswordValidation,
  validate,
  VoteContestController.createVoteContest
);

router.get("/getallVote", Auth, VoteContestController.getallVOteContest);

router.get("/getVote/:id", Auth, VoteContestController.getSingleVoteContest);

router.patch("/updateVote/:id", Auth, VoteContestController.updateVoteContest);

module.exports = router;
