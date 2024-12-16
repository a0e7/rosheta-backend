const express = require("express");

const countpresc = require("../controllers/pharmacist/count-presc");
const dispensePresciption = require("../controllers/pharmacist/dispense-presc");
const getPrescription = require("../controllers/pharmacist/get-presc");
const profileData = require("../controllers/pharmacist/profile-data");
const searchPresciption = require("../controllers/pharmacist/search-presc");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.patch("/count-Prescription", isAuth(), countpresc.countPrescription);
router.put(
  "/dispense-Prescription/:prescriptionId",
  isAuth(),
  dispensePresciption.dispensePresciption
);
router.get("/get-Prescriptions", isAuth(), getPrescription.getPrescriptions);
router.get(
  "/get-Prescription/:prescriptionId",
  isAuth(),
  getPrescription.getPrescription
);
router.get("/profile-Data", isAuth(), profileData.getPharmacy);
router.get(
  "/search-Prescription/:prescriptionId",
  searchPresciption.searchPresciption
);

module.exports = router;
