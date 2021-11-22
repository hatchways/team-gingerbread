const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const BUCKET_NAME = 'team-gingerbread-s3bucket';

const upload = multer({
  storage: multerS3({
    s3,
    Bucket: BUCKET_NAME,
    Key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  })
});

module.exports = upload;