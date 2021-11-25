const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
} = require('../controllers/profile');

router.route('/edit').post(editProfile); //add protect back in

router.route('/load').get(loadProfile); //add protect back in

module.exports = router;
