const express = require("express");

const feedController = require("../controllers/companies");
const isSuperAdmin = require('../middleware/isAuth0SuperAdmin') // uncomment this to enable
const { validateAccessToken } = require('../middleware/auth0.middleware')
// const isAuth = (req, res, next) => { next() } // temp
// const isAdmin = (req, res, next) => { next() } // temp


const router = express.Router();

//TESTING
router.get("/get-company-by-id", validateAccessToken, feedController.getCompanyById);
router.get("/get-companies", validateAccessToken, isSuperAdmin, feedController.getCompanies);
router.post("/create-company", validateAccessToken, feedController.createCompany);
router.post("/signup-company", validateAccessToken, feedController.signupCompany);
router.put("/update-company", validateAccessToken, feedController.updateCompany);
router.delete("/delete-company", validateAccessToken, feedController.deleteCompany);
module.exports = router;