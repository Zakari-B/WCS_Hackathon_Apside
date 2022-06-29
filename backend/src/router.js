const express = require("express");

const UserController = require("./controllers/UserController");

const AgencyController = require("./controllers/AgencyController");
const BubbleController = require("./controllers/BubbleController");
const bubbleHasKeywordController = require("./controllers/bubbleHasKeywordController");

const { authorization, sessionControl } = require("./middlewares/auth");

const router = express.Router();

router.post("/auth/login", UserController.login);
router.get("/auth/logout", authorization, UserController.logout);
router.get("/auth/sessionControl", authorization, sessionControl);

router.get("/agency", AgencyController.findAll);
router.get("/agency/:id", AgencyController.find);
router.post("/agency", AgencyController.addOne);
router.put("/agency/:id", AgencyController.modify);
router.delete("/agency/:id", AgencyController.deleteOne);

router.get("/bubble", BubbleController.findAll);
router.get("/bubble/:id", BubbleController.find);
router.post("/bubble", BubbleController.addOne);
router.put("/bubble/:id", BubbleController.modify);
router.delete("/bubble/:id", BubbleController.deleteOne);

router.get("/bubbleHasKeyword", bubbleHasKeywordController.findAll);
router.get("/bubbleHasKeyword/:id", bubbleHasKeywordController.find);
router.post("/bubbleHasKeyword", bubbleHasKeywordController.addOne);
router.put("/bubbleHasKeyword/:id", bubbleHasKeywordController.modify);
router.delete("/bubbleHasKeyword/:id", bubbleHasKeywordController.deleteOne);

module.exports = router;
