const { Users } = require("../models/Models.js");
// const { useAuth } = require('../src/components/AuthContext.mjs');
const jwt = require("jsonwebtoken");

// import { Users } from "../models/Models.js";
// import { useAuth } from '../src/components/AuthContext.mjs';
// import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
    try {
        const usersData = await Users.find();
        res.status(200).json(usersData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUsersById = async (req, res) => {
    try {
        const userData = await Users.findById(req.params.id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const login = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body.headers.credentials;
    console.log(username,password);
    try {
      const user = await Users.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
      }
  
      // Validate the password
      if (password !== user.password) { // Replace 'user.password' with your actual hashed password comparison logic
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // At this point, the username and password are valid
      // Generate and return a token for the authenticated user (JWT, session token, etc.)
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); // Implement your token generation logic
      delete user.password;
    //   setAuthInfo({ token: 'dummyToken', isAuthenticated: true });
    //   history.push('/admin panel');
      // You can send additional user data or just the token in the response
      console.log(token);

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = {
    getUsers,
    getUsersById,
    deleteUsers,
    login,
};
