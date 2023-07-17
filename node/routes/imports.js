const express = require("express");

const feedController = require("../controllers/imports");
const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

//TESTING
router.post("/get-mapping", validateAccessToken, isSuperAdmin, feedController.getMapping);
router.post("/get-mapping-fields", validateAccessToken, isSuperAdmin, feedController.getMappingFields);

module.exports = router;