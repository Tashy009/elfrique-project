// package imports
require("dotenv").config();
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const uniqueString = require("unique-string");
const nodemailer = require("nodemailer");
const moment = require("moment");
const axios = require("axios");
const generateUniqueId = require("generate-unique-id");
//local imports

const Admin = require("../models/").adminuser;

//controllers

exports.adminLogin = (req, res, next) => {
  res.render("login");
};

exports.signUpUser = (req, res, next) => {
  res.render("signup2");
};

exports.forgotPassword = (req, res, next) => {
  //res.render("auths/login2");
  res.render("forgotpwd");
};

// create admin user
exports.createAdminUser = async (req, res, next) => {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phonenumber,
      referral_email,
      confirmpassword,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phonenumber ||
      !confirmpassword
    ) {
      req.flash("danger", "Please Fill all required Fields!");
      res.redirect("back");
    } else if (!email.match(mailformat)) {
      req.flash("warning", "Wrong Email Format!");
      res.redirect("back");
    } else if (password.length < 5) {
      req.flash("warning", "Password should be more than 5 characters!");
      res.redirect("back");
    } else if (password !== confirmpassword) {
      req.flash("warning", "Password does not match!");
      res.redirect("back");
    } else {
      const admin = await Admins.findOne({ where: { email } });
      if (admin) {
        req.flash("warning", "This Email already exists!");
        res.redirect("back");
      } else {
        const hashPwd = await bcrypt.hashSync(password, 10);
        const newAdmin = await Admins.create({
          firstname,
          lastname,
          phonenumber,
          email,
          password: hashPwd,
          referral_email,
        });
        req.flash("success", "Admin Created Succsessfully");
        req.session.adminId = admin.id;
        res.redirect("/dashboard");
      }
    }
  } catch (err) {
    req.flash("danger", "Server Error!");
    res.redirect("back");
  }
};

exports.loginAdminUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error", "Please Fill all Fields!");
      res.redirect("back");
    } else {
      const admin = await Admins.findOne({ where: { email } });
      if (!admin) {
        req.flash("error", "Invalid Details!");
        res.redirect("back");
      } else {
        const compare = await bcrypt.compareSync(password, admin.password);
        if (!compare) {
          req.flash("error", "Incorrect Password!");
          res.redirect("back");
        } else {
          req.flash("success", "LoggedIn Successfully");
          req.session.adminId = admin.id;
          res.redirect("/dashboard");
        }
      }
    }
  } catch (err) {
    req.flash("error", "Server Error!");
    res.redirect("back");
  }
};
