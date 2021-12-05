const express = require("express");

const router = express.Router();
const { deleteImages } = require("../controllers/deleteImage");
const { multerMultiUpload, uploadImages } = require("../controllers/uploadImage");
const { retrieveUrl } = require("../controllers/retrieveImage");

router.route("/upload").post(multerMultiUpload, uploadImages);
router.route("/delete").delete(deleteImages);
router.route("/retrieve").get(retrieveUrl);

module.exports = router;
