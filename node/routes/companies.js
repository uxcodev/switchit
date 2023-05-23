const express = require("express");

const feedController = require("../controllers/companies");
const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

//TESTING
router.get("/get-company-by-id", validateAccessToken, isSuperAdmin, feedController.getCompanyById);
router.get("/get-companies", validateAccessToken, isSuperAdmin, feedController.getCompanies);
router.post("/create-company", validateAccessToken, isSuperAdmin, feedController.createCompany);
router.post("/signup-company", validateAccessToken, feedController.signupCompany);
router.put("/update-company", validateAccessToken, isSuperAdmin, feedController.updateCompany);
router.delete("/delete-company", validateAccessToken, isSuperAdmin, feedController.deleteCompany);
module.exports = router;