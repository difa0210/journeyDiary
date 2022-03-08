const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const { register, checkAuth, login, profile } = require("../controllers/auth");
const {
  addJourney,
  getProfile,
  getJourneys,
  getJourneyDetail,
} = require("../controllers/journey");
const { addBookmark, getBookmarks } = require("../controllers/bookmark");

// Controller Route Here
router.post("/register", uploadFile("image"), register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
router.get("/profile/:id", profile);
router.post("/journey", auth, uploadFile("image"), addJourney);
router.post("/bookmark", auth, addBookmark);
router.get("/bookmarks/:id", auth, getBookmarks);
router.get("/profile/:id/journey", auth, getProfile);
router.get("/journeys", getJourneys);
router.get("/journey/:id", getJourneyDetail);

module.exports = router;
