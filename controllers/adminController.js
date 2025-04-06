const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Create admin account (temporary helper for setup)
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ email, passwordHash });
    await newAdmin.save();

    res.status(201).json({ msg: "Admin created" });
  } catch (err) {
    res.status(500).json({ msg: "Error creating admin" });
  }
};
