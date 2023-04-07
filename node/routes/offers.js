const express = require("express");

const feedController = require("../controllers/offers");

// const isAuth = require('../middleware/isAuth') // uncomment this to enable
// const isAdmin = require('../middleware/isAdmin') // uncomment this to enable
const isAuth = (req, res, next) => { next() } // temp
// const isAdmin = (req, res, next) => { next() } // temp


const router = express.Router();

router.post("/create-offer", isAuth, feedController.createOffer);
router.get("/get-offers", isAuth, feedController.getOffers);

module.exports = router;