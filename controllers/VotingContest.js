require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateUniqueId = require("generate-unique-id");
const uniqueString = require("unique-string");
const nodemailer = require("nodemailer");
//const sequelize = require("../config/db");
const User = require("../models").adminuser;
const ResetPasswords = require("../models").resetpassword;
const Profile = require("../models").profile;
const votingContest = require("../models").votingcontest;

const excludeAtrrbutes = { exclude: ["createdAt", "updatedAt", "deletedAt"] };

// imports initialization
const { Op } = require("sequelize");

exports.createVoteContest = async (req, res) => {
  try {
    const adminuserId = req.user.id;
    req.body.adminuserId = adminuserId;
    const profile = await Profile.findOne({
      where: { adminuserId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    if (!profile) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const voteContest = await votingContest.create(req.body);
    return res.status(200).send({
      voteContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.getallVOteContest = async (req, res) => {
  try {
    const adminuserId = req.user.id;
    const profile = await Profile.findOne({
      where: { adminuserId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    if (!profile) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const voteContest = await votingContest.findAll({
      where: {
        adminuserId: req.user.id,
      },
    });
    return res.status(200).send({
      voteContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.getSingleVoteContest = async (req, res) => {
  try {
    const adminuserId = req.user.id;
    const profile = await Profile.findOne({
      where: { adminuserId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    if (!profile) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const voteContest = await votingContest.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      voteContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.updateVoteContest = async (req, res) => {
  try {
    const adminuserId = req.user.id;
    const profile = await Profile.findOne({
      where: { adminuserId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    if (!profile) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const voteContest = await votingContest.findOne({
      where: { id: req.params.id },
    });
    if (!voteContest) {
      return res.status(404).send({
        message: "votingContest not found",
      });
    }
    await votingContest.update(req.body);
    return res.status(200).send({
      votingContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.deleteVoteContest = async (req, res) => {
  try {
    const adminuserId = req.user.id;
    const profile = await Profile.findOne({
      where: { adminuserId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    if (!profile) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const voteContest = await voteContest.findOne({
      where: { id: req.params.id },
    });
    if (!voteContest) {
      return res.status(404).send({
        message: "AwardContest not found",
      });
    }
    const vote = await votingContest.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      vote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};
