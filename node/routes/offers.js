const express = require("express");

const feedController = require("../controllers/offers");
// const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

router.post("/create-offer", validateAccessToken, feedController.createOffer);
router.get("/offers", validateAccessToken, feedController.getOffers);

// get a single offer. My api call looks like: const response = await _axios.get(`/offers/offer/${id}`);
router.get("/offer/:id", validateAccessToken, feedController.getOffer);
router.put("/offer/:id", validateAccessToken, feedController.updateOffer);
router.delete("/offer", validateAccessToken, feedController.deleteOffer);

module.exports = router;