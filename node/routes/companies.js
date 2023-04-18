const express = require("express");

const feedController = require("../controllers/companies");

const isAuth = require('../middleware/isAuth') // uncomment this to enable
const isAdmin = require('../middleware/isAdmin') // uncomment this to enable
// const isAuth = (req, res, next) => { next() } // temp
// const isAdmin = (req, res, next) => { next() } // temp


const router = express.Router();

//TESTING
router.get("/get-company-by-id", isAdmin, feedController.getCompanyById);
router.get("/get-companies", isAdmin, feedController.getCompanies);
router.post("/create-company", isAuth, feedController.createCompany);
router.post("/signup-company", feedController.signupCompany);
router.put("/update-company", isAuth, feedController.updateCompany);
router.delete("/delete-company", isAuth, feedController.deleteCompany);
module.exports = router;