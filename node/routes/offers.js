const express = require("express");

const feedController = require("../controllers/offers");
// const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

router.post("/create-offer", validateAccessToken, feedController.createOffer);
router.get("/get-offers", validateAccessToken, feedController.getOffers);

module.exports = router;