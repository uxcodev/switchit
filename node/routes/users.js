const express = require("express");

const feedController = require("../controllers/users");
const isSuperAdmin = require('../middleware/isAuth0SuperAdmin')
const { validateAccessToken } = require('../middleware/auth0.middleware')

const router = express.Router();

//TESTING
router.get("/get-active-user", validateAccessToken, feedController.getActiveUser);
router.get("/get-users", validateAccessToken, isSuperAdmin, feedController.getUsers);
router.post("/create-user", validateAccessToken, feedController.createUser);
router.put("/update-user", validateAccessToken, feedController.updateUser);
router.delete("/delete-user", validateAccessToken, isSuperAdmin, feedController.deleteUser);
module.exports = router;