const express = require("express");

const UserController = require("./controllers/UserController");

const AgencyController = require("./controllers/AgencyController");
const BubbleController = require("./controllers/BubbleController");
const bubbleHasKeywordController = require("./controllers/bubbleHasKeywordController");
const bubbleNeedSkillsController = require("./controllers/bubbleNeedSkillsController");
const keywordController = require("./controllers/keywordController");
const positionController = require("./controllers/positionController");

const {
  authorization,
  authorizeAdmin,
  sessionControl,
} = require("./middlewares/auth");

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
router.post("/bubbleHasKeyword", bubbleHasKeywordController.addOne);
router.delete(
  "/bubbleHasKeyword/:bid/:kid",
  bubbleHasKeywordController.deleteOne
);

router.get("/bubbleNeedSkills", bubbleNeedSkillsController.findAll);
router.post("/bubbleNeedSkills", bubbleNeedSkillsController.addOne);
router.delete(
  "/bubbleNeedSkills/:bid/:kid",
  bubbleNeedSkillsController.deleteOne
);

router.get("/keyword", keywordController.findAll);
router.get("/keyword/:id", keywordController.find);
router.post("/keyword", keywordController.addOne);
router.put("/keyword/:id", keywordController.modify);
router.delete("/keyword/:id", keywordController.deleteOne);

router.get("/position", positionController.findAll);
router.get("/position/:id", positionController.find);
router.post("/position", positionController.addOne);
router.put("/position/:id", positionController.modify);
router.delete("/position/:id", positionController.deleteOne);

router.post(
  "/admin/create",
  authorization,
  authorizeAdmin,
  UserController.createOne
);

module.exports = router;
