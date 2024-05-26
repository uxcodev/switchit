const express = require("express");

const feedController = require("../controllers/imports");
// const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
// const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

//TESTING
router.post("/get-mapping", feedController.getMapping);
router.post("/get-mapping-fields", feedController.getMappingFields);
// router.post("/get-mapping-fields", feedController.test);

module.exports = router;