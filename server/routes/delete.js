const express = require("express");

const router = express.Router();
const { deleteImages } = require("../controllers/delete");

router.route("/image").delete(deleteImages);

module.exports = router;
