const express = require('express');
const router = express.Router();
const { multerMultiUpload, uploadImages } = require('../controllers/upload');

router.route('/image').post(multerMultiUpload, uploadImages);

module.exports = router;
