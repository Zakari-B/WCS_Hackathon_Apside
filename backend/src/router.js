const express = require("express");

const UserController = require("./controllers/UserController");

const { authorization, sessionControl } = require("./middlewares/auth");

const router = express.Router();

router.post("/auth/login", UserController.login);
router.get("/auth/logout", authorization, UserController.logout);
router.get("/auth/sessionControl", authorization, sessionControl);

router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getOne);

module.exports = router;
