const express = require("express");

const feedController = require("../controllers/imports");
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

//TESTING
router.post("/get-mapping", validateAccessToken, feedController.getMapping);
router.post("/get-mapping-fields", validateAccessToken, feedController.getMappingFields);

module.exports = router;