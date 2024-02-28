const express = require("express");

const feedController = require("../controllers/filtersets");
// const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

router.post("/filterset", validateAccessToken, feedController.createFilterset);
// router.get("/filterset", validateAccessToken, feedController.getFilterset);
router.get("/filtersets", validateAccessToken, feedController.getFiltersets);
router.get("/businesspartner/:id", validateAccessToken, feedController.getFiltersetsByBusinessPartnerId);
router.get("/:businessPartnerId/:email", validateAccessToken, feedController.getFiltersetsByUserEmail);
router.put("/filterset", validateAccessToken, feedController.updateFilterset);
router.delete("/filterset", validateAccessToken, feedController.deleteFilterset);

// ustilities
router.get("/addEmailToAllFiltersets", validateAccessToken, feedController.addEmailToAllFiltersets);

module.exports = router;