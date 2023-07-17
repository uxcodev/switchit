const express = require("express");

const feedController = require("../controllers/leads");
const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

router.post("/get-leads", validateAccessToken, feedController.getLeads);
router.get("/get-lead", validateAccessToken, feedController.getLead);
router.post("/create-leads", validateAccessToken, isSuperAdmin, feedController.createLeads);
router.put("/update-leads", validateAccessToken, isSuperAdmin, feedController.updateLeads);
module.exports = router;