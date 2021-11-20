const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../services/uploadImage');
const image = '/Users/ankit/Playground/_nodeProjects/team-gingerbread/client/src/Images/775db5e79c5294846949f1f55059b53317f51e30.png'

const fileContent = fs.readFileSync(image);

const singleUpload = upload.single(fileContent);

router.post('/upload-image', function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location});
  });
});

module.exports = router;