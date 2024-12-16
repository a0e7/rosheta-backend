const express = require("express");

const addDoctor = require("../controllers/admin/add-doctor");
const addMedicine = require("../controllers/admin/add-medicine");
const addPharm = require("../controllers/admin/add-pharm");
const countpresc = require("../controllers/admin/count-presc");
const countUsers = require("../controllers/admin/count-user");
const deactivateDoctor = require("../controllers/admin/deactivate-doctor");
const deactivatePharmacy = require("../controllers/admin/deactivate-pharm");
const activateDoctor = require("../controllers/admin/activate-doctor");
const activatePharmacy = require("../controllers/admin/activate-pharmacy");
const deleteMedicine = require("../controllers/admin/delete-medicine");
const editDoctor = require("../controllers/admin/edit-doctor");
const editMedicine = require("../controllers/admin/edit-medicine");
const editPharmacy = require("../controllers/admin/edit-pharm");
const getDoctor = require("../controllers/admin/get-doctor");
const getMedicine = require("../controllers/admin/get-medicine");
const getPharmacy = require("../controllers/admin/get-pharm");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/add-Doctor", addDoctor.postDoctor);
router.post("/add-Medicine", addMedicine.postMedicine);
router.post("/add-Pharm", addPharm.postPharmacy);
router.patch("/count-Presc", countpresc.countPrescription);
router.patch("/count-Users", countUsers.getUsers);
router.patch("/deactivate-Doctor/:doctorId", deactivateDoctor.deactivateDoctor);
router.delete("/delete-Medicine/:medicineId", deleteMedicine.deleteMedicine);
router.patch(
  "/deactivate-Pharmacy/:pharmacyId",
  deactivatePharmacy.deactivatePharmacy
);
router.patch(
  "/activate-Pharmacy/:pharmacyId",
  activatePharmacy.activatePharmacy
);
router.patch("/activate-Doctor/:doctorId", activateDoctor.activateDoctor);
router.put("/edit-Doctor/:doctorId", editDoctor.updateDoctor);
router.put("/edit-Medicine/:medicineId", editMedicine.updateMedicine);
router.put("/edit-Pharmacy/:pharmacyId", editPharmacy.updatePharmacy);
router.get("/get-Doctors", getDoctor.getDoctors);
router.get("/get-Doctor/:doctorId", getDoctor.getDoctor);
router.get("/get-Medicines", getMedicine.getMedicines);
router.get("/get-Medicines/:medicineId", getMedicine.getMedicine);
router.get("/get-Pharmacies", getPharmacy.getPharmacies);
router.get("/get-Pharmacy/:pharmacyId", getPharmacy.getPharmacy);

module.exports = router;
