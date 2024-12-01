const express = require("express");

const countpresc = require("../controllers/pharmacist/count-presc");
const dispensePresciption = require("../controllers/pharmacist/dispense-presc");
const getPrescription = require("../controllers/pharmacist/get-presc");
const profileData = require("../controllers/pharmacist/profile-data");
const searchPresciption = require("../controllers/pharmacist/search-presc");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.patch("/count-Prescription", countpresc.countPrescription);
router.put("/dispense-Prescription", dispensePresciption.dispensePresciption);
router.get("/get-Prescriptions", getPrescription.getPrescriptions);
router.get(
  "/get-Prescription/:prescriptionId",
  isAuth,
  getPrescription.getPrescription
);
router.get("/profile-Data", profileData.getPharmacy);
router.get("/search-Prescription", searchPresciption.searchPresciption);

module.exports = router;
