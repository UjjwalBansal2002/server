const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // allow frontend origin
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded PDFs

// Routes
const materialRoutes = require("./routes/materialRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/materials", materialRoutes);
app.use("/api/admin", adminRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

  app.get("/", (req, res) => {
    res.send("API is working 🚀");
  });


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
