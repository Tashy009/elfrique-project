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
const awardContest = require("../models").awardcontest;

const excludeAtrrbutes = { exclude: ["createdAt", "updatedAt", "deletedAt"] };

// imports initialization
const { Op } = require("sequelize");

//controllers

exports.createAwardContest = async (req, res) => {
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
    const awardContest = await awardContest.create(req.body);
    return res.status(200).send({
      awardContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.getAllAwardsContest = async (req, res) => {
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
    const awardContest = await awardContest.findAll({
      where: { adminuserId },
    });
    return res.status(200).send({
      awardContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.getSingleAwardContest = async (req, res) => {
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
    const awardContest = await awardContest.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).send({
      awardContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.updateAwardContest = async (req, res) => {
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
    const awardContest = await awardContest.findOne({
      where: { id: req.params.id },
    });
    if (!awardContest) {
      return res.status(404).send({
        message: "AwardContest not found",
      });
    }
    await awardContest.update(req.body);
    return res.status(200).send({
      awardContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.deleteAwardContest = async (req, res) => {
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
    const awardContest = await awardContest.findOne({
      where: { id: req.params.id },
    });
    if (!awardContest) {
      return res.status(404).send({
        message: "AwardContest not found",
      });
    }
    await awardContest.destroy();
    return res.status(200).send({
      message: "AwardContest deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};
