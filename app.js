require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const pharmacyRoutes = require("./routes/pharmacy");
const authRoutes = require("./routes/auth");

const mongoose = require("mongoose");

const multer = require("multer");

const cors = require("cors");

const app = express();

const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // Use the original filename directly
    const originalName = file.originalname;
    const ext = path.extname(originalName); // Get the file extension
    const nameWithoutExt = path.basename(originalName, ext); // Get the base name without extension

    // Optional: Handle collisions by adding a timestamp or a unique identifier
    const newName = `${nameWithoutExt}-${Date.now()}${ext}`; // Add timestamp to ensure uniqueness
    cb(null, newName); // Save the file with the original name + timestamp
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" || // Corrected
    file.mimetype === "image/jpeg" // Corrected
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); // this is for paring application/json
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

// Use CORS middleware
app.use(
  cors({
    origin: "*", // Adjust this to your needs (e.g., 'http://localhost:3000')
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/pharmacy", pharmacyRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(8090);
  })
  .catch((err) => console.log(err));
