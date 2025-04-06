const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin } = require("../controllers/adminController");

// TEMP route to register a new admin (use once!)
router.post("/register", registerAdmin);

// Login route
router.post("/login", loginAdmin);

module.exports = router;
