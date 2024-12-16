const express = require("express");

const patientSignup = require("../controllers/auth/Signup");
const getDoctor = require("../controllers/patient/get-doctor");
const getPresc = require("../controllers/patient/get-presc1");
const getProfile = require("../controllers/patient/profile-data");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put("/signup", patientSignup.signup);
router.get("/get-Doctors", getDoctor.getDoctors);
router.get("/get-Doctor/:doctorId", getDoctor.getDoctor);
router.get("/get-Prescriptions", isAuth(), getPresc.getPrescriptions);
router.get("/get-Prescription/:prescriptionId", getPresc.getPrescription);
router.get("/get-Profile/:doctorId", isAuth(), getProfile.getPatient);

module.exports = router;
