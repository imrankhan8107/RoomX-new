const { config } = require("dotenv");
config();

const User = require("../models/users"); // Assuming you have a User model
const OrganizationModel = require("../models/organizations");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/token");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
// const { errorLogger, appLogger } = require('../logger');

async function sendEmail(to, subject, text, attachments) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.ADMIN_GMAIL,
      pass: process.env.ADMIN_GMAIL_PASSWORD,
    },
  });

  // Define email data
  const mailOptions = {
    from: process.env.ADMIN_GMAIL,
    to,
    subject: subject || "Default Subject",
    text: text || "Default Email Text",
    attachments: attachments || [],
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    // console.log('Email sent successfully');
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Example usages
// sendEmail('recipient@example.com');
// sendEmail('recipient@example.com', 'Your Subject');
// sendEmail('recipient@example.com', 'Your Subject', 'Hello, this is the email content.');

const saltRounds = 10;

exports.createUser = async (req, res) => {
  let success = false;

  // If there are validation errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    const { username, email, contact, password, org_code } = req.body;
    // console.log(studentType);
    //check whether org_code exists

    const org = await OrganizationModel.findOne({ org_code: org_code });
    console.log(org);
    if (!org) {
      return res
        .status(404)
        .json({ success, error: "Organization code does not exist" });
    }

    // check whether the user with this email exists already
    const user = await User.findOne({ email: email, org_code: org_code });
    if (user) {
      return res.status(400).json({ success, error: "Email already exists" });
    }

    // Salting password
    const salt = await bcrypt.genSalt(saltRounds);
    const secPass = await bcrypt.hash(password, salt);

    const userId = uuidv4();

    // Creating a new user
    const userCreated = await User.create({
      userId: userId,
      username: username,
      email: email,
      contact: contact,
      password: secPass,
      org_code: org_code,
    });

    if (userCreated) {
      // Token authentication using JWT
      const authtoken = signToken(
        userCreated._id,
        userCreated.username,
        userCreated.email,
        userCreated.org_code
      );

      res.status(201).json(authtoken);

      const subject = "Welcome to the Room Booking System";
      const text = `Dear ${userCreated.username},\n\nWe're happy to welcome you on board as a registered member of our Meeting Room Booking System`;
      const attachments = [
        {
          filename: "Psychometric Test Instructions.pdf",
          path: `src/tp/Psychometric Test Instructions.pdf`,
        },
      ];

      sendEmail(userCreated.email, subject, text, attachments);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

exports.login = async (req, res) => {
  let success = false;

  // If there are validation errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
    return;
  }
  try {
    const { username, password } = req.body;
    console.log(req.body);

    const AdminEmail = "admin@example.com";

    if (username === "admin" && password === "123456") {
      const authtoken = signToken(username, AdminEmail, "6969");
      console.log(authtoken);

      res.status(200).json({
        success: true,
        username: username,
        userType: "admin",
        authtoken,
      });
      return;
    }

    // Finding if user exists
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success, error: "Please try to login with correct username" });
    }

    // Matching user password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success, error: "Please try to login with correct password" });
    }
    // Token authentication using JWT
    const authtoken = signToken(
      user._id,
      user.username,
      user.email,
      user.org_code
    );

    // Response
    res
      .status(200)
      .json({ success: true, username: username, userType: "user", authtoken });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
    return;
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const ems = await User.findOne({ email: email });
    if (!ems) {
      return res
        .status(404)
        .json({ success: false, error: "No user with this email was found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const subject = "Password Reset";
    const text = `This link is active only for an hour.\nClick the following link to reset your password: ${resetLink}`;

    await sendEmail(email, subject, text);

    await User.findOneAndUpdate(
      { email },
      { resetToken: token, resetTokenExpiry: expiration }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Step 1: Verify if the token is valid and not expired
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Check if the token is not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "The link has expired, please try again",
      });
    }

    // Step 2: Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Step 3: Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    // Save the updated user document
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
