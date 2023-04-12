const express = require("express");

const feedController = require("../controllers/leads");

// const isAdmin = require('../middleware/isAdmin')
const isAuth = (req, res, next) => { next() } // temp


const router = express.Router();

router.post("/get-leads", isAuth, feedController.getLeads);
router.get("/get-lead", isAuth, feedController.getLead);
router.post("/create-leads", isAuth, feedController.createLeads);
router.put("/update-leads", isAuth, feedController.updateLeads);
module.exports = router;