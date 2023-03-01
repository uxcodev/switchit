const express = require("express");

const feedController = require("../controllers/users");

const isAuth = require('../middleware/isAuth') // uncomment this to enable
const isAdmin = require('../middleware/isAdmin') // uncomment this to enable
// const isAuth = (req, res, next) => { next() } // temp
// const isAdmin = (req, res, next) => { next() } // temp


const router = express.Router();

//TESTING
router.get("/get-users", isAdmin, feedController.getUsers);
router.post("/create-token", feedController.createToken);
router.post("/create-user", isAuth, feedController.createUser);
router.put("/update-user", isAuth, feedController.updateUser);
router.delete("/delete-user", isAuth, feedController.deleteUser);
module.exports = router;