const express = require("express");

const feedController = require("../controllers/leads");

// const isAuth = require('../middleware/isAuth') // uncomment this to enable
const isAdmin = require('../middleware/isAdmin') // uncomment this to enable
const isAuth = (req, res, next) => { next() } // temp
// const isAdmin = (req, res, next) => { next() } // temp


const router = express.Router();

//TESTING
router.get("/get-leads", isAuth, feedController.getLeads);
router.post("/get-filtered-leads", isAuth, feedController.getFilteredLeads);
router.get("/get-lead", isAuth, feedController.getLead);
// router.post("/create-lead", isAuth, feedController.createLead);
router.post("/create-leads", isAuth, feedController.createLeads);
// router.put("/update-lead", isAuth, feedController.updateLead);
// router.delete("/delete-lead", isAuth, feedController.deleteLead);
module.exports = router;