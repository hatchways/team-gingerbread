const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');

const BUCKET_NAME = 'team-gingerbread-s3bucket';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const multiUpload = multer({storage: multer.memoryStorage()}).array('images');

const uploadToS3 = (img) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: img.originalname,
    Body: img.buffer,
  }
  return s3.upload(params).promise();
};

router.route('/image').post(multiUpload, async (req, res) => {
  const images = req.files;
  const promises = [];

  for(let i = 0; i < images.length; i++){
    let img = images[i];
    promises.push(uploadToS3(img));
  }

  try {
    const data = await Promise.all(promises)
    res.status(200).send(`${data.length} file(s) uploaded.`);

  } catch(e) {
    res.status(500).send(`A problem occurred while uploading an image. ${e}`);
  }
});

module.exports = router;
