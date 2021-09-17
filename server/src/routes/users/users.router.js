const express = require("express");
const router = new express.Router();
const protect = require("../../middlewares/protect");
const { upload } = require("../../utils/multer.utils");
const {
  fetchAllProfiles,
  fetchMyProfile,
  updateProfile,
  uploadAvatar
} = require("./users.controller");

router.get("/", protect, fetchAllProfiles);
router.get("/me", protect, fetchMyProfile);
router.post("/me", protect, updateProfile);
router.post("/me/avatar", protect, upload.single("avatar"), uploadAvatar);

module.exports = router;
