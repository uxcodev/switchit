const express = require("express");

const feedController = require("../controllers/imports");

const router = express.Router();

//TESTING
router.post("/get-mapping", feedController.getMapping);
router.post("/get-mapping-fields", feedController.getMappingFields);

module.exports = router;