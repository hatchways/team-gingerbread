const express = require("express");

const router = express.Router();
const { deleteImages } = require("../controllers/deleteImage");
const { multerMultiUpload, uploadImages } = require("../controllers/uploadImage");

router.route("/upload").post(multerMultiUpload, uploadImages);
router.route("/delete?").delete(deleteImages);

module.exports = router;
