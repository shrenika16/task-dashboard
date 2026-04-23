const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// POST /auth/register
router.post("/register", async (req, res) => {

try {

const { name, email, password } = req.body;

// Validate required fields
if (!name || !email || !password) {
return res.status(400).json({ message: "All fields are required" });
}

// Email format validation
const emailRegex = /^\S+@\S+\.\S+$/;
if (!emailRegex.test(email)) {
return res.status(400).json({ message: "Invalid email format" });
}

// Check duplicate user
const existingUser = await User.findOne({ email });

if (existingUser) {
return res.status(400).json({ message: "User already exists" });
}

// Create new user
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new User({
name,
email,
password: hashedPassword
});
const savedUser = await newUser.save();

res.status(201).json({
message: "User registered successfully",
user: savedUser
});

} catch (error) {

res.status(500).json({ message: error.message });

}

});

module.exports = router;