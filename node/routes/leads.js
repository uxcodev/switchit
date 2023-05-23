const express = require("express");

const feedController = require("../controllers/leads");
const { validateAccessToken } = require('../middleware/auth0.middleware')
const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
// const isAdmin = require('../middleware/isAdmin')


const router = express.Router();

router.post("/get-leads", validateAccessToken, isSuperAdmin, feedController.getLeads);
router.get("/get-lead", validateAccessToken, feedController.getLead);
router.post("/create-leads", validateAccessToken, feedController.createLeads);
router.put("/update-leads", validateAccessToken, feedController.updateLeads);
module.exports = router;