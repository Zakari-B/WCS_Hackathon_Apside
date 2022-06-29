const express = require("express");

const UserController = require("./controllers/UserController");

const {
  authorization,
  authorizeAdmin,
  sessionControl,
} = require("./middlewares/auth");

const router = express.Router();

router.post("/auth/login", UserController.login);
router.get("/auth/logout", authorization, UserController.logout);
router.get("/auth/sessionControl", authorization, sessionControl);

router.post(
  "/admin/create",
  authorization,
  authorizeAdmin,
  UserController.createOne
);

module.exports = router;
