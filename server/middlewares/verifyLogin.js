const { config } = require("dotenv");
config();

const jwt = require('jsonwebtoken');
const { Request, Response, NextFunction } = require('express');
const User = require('../models/users');

// const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdmin = async (req, res, next) => {
  const token = req.header('authtoken');

  if (!token) {
    res.status(401).json({ success: false, message: 'Access denied, no token provided' });
    return;
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'mysecret'); // process.env.JWT_SECRET
    //   const user = decoded.data;
    if (!decoded) {
      res.status(401).json({ success: false, message: 'Access denied, no payload provided' });
      return;
    }

    if (decoded.exp < Date.now() / 1000) {
      res.status(401).json({ error: 'Token has expired' });
      return;
    }

    // const user = await User.findOne({ username: decoded.user.username, email: decoded.user.email });

    // Check if the decoded token matches the admin's username
    if (decoded.user && decoded.user.username === process.env.ADMIN_USERNAME && decoded.user.email === process.env.ADMIN_EMAIL) {
      req.user = decoded.user;
      next(); // User is an admin; allow access to the route
    } else {
      res.status(403).json({ success: false, message: 'Access denied' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const verifyUser = async (req, res, next) => {
  const token = req.header('authtoken');

  if (!token) {
    res.status(401).json({ success: false, message: 'Access denied, no token provided' });
    return;
  }

  // res.status(200).json({ success: false, message: jwt.verify(token, JWT_SECRET || 'mysecret') });
  try {
    // Verify and decode the token
    const data = jwt.verify(token, 'mysecret'); // process.env.JWT_SECRET
    //   const user = decoded.data;
    if (!data) {
      res.status(401).json({ success: false, message: 'Access denied, no payload provided' });
      return;
    }

    if (data.exp < Date.now() / 1000) {
      res.status(401).json({ error: 'Token has expired' });
      return;
    }

    // Check if the decoded token matches the user's username
    const user = await User.findOne({ username: data.user.username, email: data.user.email });

    if (user) {
      req.user = data.user;
      next();
    } else {
      res.status(403).json({ success: false, message: 'Access denied' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = { verifyAdmin };