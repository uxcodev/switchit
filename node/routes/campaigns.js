const express = require("express");

const feedController = require("../controllers/campaigns");
// const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

router.post("/campaign", validateAccessToken, feedController.createCampaign);
// router.get("/campaign", validateAccessToken, feedController.getCampaign);
router.get("/campaigns", validateAccessToken, feedController.getCampaigns);
// router.put("/campaign", validateAccessToken, feedController.updateCampaign);

// delete campaign. api call looks like const response = await _axios.delete(`/campaigns/campaign?id=${id}`);
router.delete("/campaign", validateAccessToken, feedController.deleteCampaign);

module.exports = router;