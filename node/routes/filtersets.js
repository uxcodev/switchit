const express = require("express");

const feedController = require("../controllers/filtersets");
// const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

router.post("/filterset", validateAccessToken, feedController.createFilterset);
// router.get("/filterset", validateAccessToken, feedController.getFilterset);
router.get("/filtersets", validateAccessToken, feedController.getFiltersets);
// router.put("/filterset", validateAccessToken, feedController.updateFilterset);

// delete filterset. api call looks like const response = await _axios.delete(`/filtersets/filterset?id=${id}`);
router.delete("/filterset", validateAccessToken, feedController.deleteFilterset);

module.exports = router;