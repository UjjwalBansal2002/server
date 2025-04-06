const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/authMiddleware");
const {
  uploadMaterial,
  getMaterials,
} = require("../controllers/materialControllers");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Upload material (admin only)
router.post("/upload", verifyToken, upload.single("file"), uploadMaterial);

// Get all materials (public)
router.get("/", getMaterials);

module.exports = router;
