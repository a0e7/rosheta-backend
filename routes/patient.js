const express = require("express");

const patientSignup = require("../controllers/auth/Signup");
const getDoctor = require("../controllers/patient/get-doctor");
const getPresc = require("../controllers/patient/get-presc");
const getProfile = require("../controllers/patient/profile-data");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put("/signup", patientSignup.signup);
router.get("/get-Doctors", getDoctor.getDoctors);
router.get("/get-Doctor/:doctorId", getDoctor.getDoctor);
router.get("/get-Prescription", getPresc.getPrescriptions);
router.get("/get-Prescription/:prescriptionId", getPresc.getPrescription);
router.get("/get-Profile/:doctorId", getProfile.getPatient);

module.exports = router;
