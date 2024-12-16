const express = require("express");

const addPrescription = require("../controllers/doctor/add-presc");
const countPrescriptions = require("../controllers/doctor/count-presc");
const deletePrescription = require("../controllers/doctor/delete-presc");
const updatePrescription = require("../controllers/doctor/edit-presc");
const getPrescription = require("../controllers/doctor/get-presc");
const medcineSearch = require("../controllers/doctor/medicine-search");
const profileData = require("../controllers/doctor/profile-data");
const prescriptionSearch = require("../controllers/doctor/search-presc");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/add-Prescription", isAuth(), addPrescription.postPresciption);
router.patch(
  "/count-Prescription",
  isAuth(),
  countPrescriptions.countPrescription
);
router.delete(
  "/delete-Prescription/:prescriptionId",
  isAuth(),
  deletePrescription.deletePrescription
);
router.put(
  "/edit-Prescription/:prescriptionId",
  isAuth(),
  updatePrescription.updatePresciption
);
router.get("/get-Prescriptions", isAuth(), getPrescription.getPrescriptions);
router.get(
  "/get-Prescription/:prescriptionId",
  getPrescription.getPrescription
);
router.get("/medicine-Search", medcineSearch.searchMedicine);
router.get("/profile-Data", isAuth(), profileData.getDoctor);
router.get("/search-Prescription", prescriptionSearch.searchPresciption);

module.exports = router;
