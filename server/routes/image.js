const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { deleteImages } = require("../controllers/deleteImage");
const { multerMultiUpload, uploadImages } = require("../controllers/uploadImage");

router.route("/upload").post(protect, multerMultiUpload, uploadImages);
router.route("/delete").post(protect, deleteImages);

module.exports = router;
