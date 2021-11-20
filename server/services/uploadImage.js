const fs = require('fs');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'team-gingerbread-s3bucket',
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;