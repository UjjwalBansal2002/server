const Material = require("../models/material");

// Upload new material
exports.uploadMaterial = async (req, res) => {
  const { title, course, subject, type, year } = req.body;
  const fileUrl = req.file?.path;

  if (!fileUrl) return res.status(400).json({ msg: "File is required" });

  try {
    const newMaterial = new Material({
      title,
      course,
      subject,
      type,
      year,
      fileUrl,
    });

    await newMaterial.save();
    res.status(201).json({ msg: "Material uploaded", material: newMaterial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error uploading material" });
  }
};

// Fetch all materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ uploadedAt: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching materials" });
  }
};
