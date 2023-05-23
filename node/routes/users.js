const express = require("express");

const feedController = require("../controllers/users");

const isAuth = require('../middleware/isAuth') // uncomment this to enable
const isAdmin = require('../middleware/isAdmin') // uncomment this to enable
const { validateAccessToken } = require('../middleware/auth0.middleware')
// const isAuth = (req, res, next) => { next() } // temp
// const isAdmin = (req, res, next) => { next() } // temp


const router = express.Router();

//TESTING
router.get("/get-users", validateAccessToken, isAdmin, feedController.getUsers);
router.post("/create-token", validateAccessToken, feedController.createToken);
router.post("/create-user", validateAccessToken, isAuth, feedController.createUser);
router.put("/update-user", validateAccessToken, isAuth, feedController.updateUser);
router.delete("/delete-user", validateAccessToken, isAuth, feedController.deleteUser);
module.exports = router;