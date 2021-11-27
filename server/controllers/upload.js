const Profile = require("../models/Profile");
const aws = require('aws-sdk');
const multer = require('multer');

const BUCKET_NAME = 'team-gingerbread-s3bucket';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const uploadToS3 = (img) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: img.originalname,
    Body: img.buffer,
  }
  return s3.upload(params).promise();
};

const writeToDB = async (_id, url, res) => {
  await Profile.findByIdAndUpdate(String(_id), {"photo": url }, (err, result) => {
    if(err) {
      res.status(500).send(`A problem occurred while saving an image. ${err}`);
    } else res.status(200).send(`Image saved. ${result}`);
  });
};

exports.multerMultiUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}).array('images');

exports.uploadImages = async (req, res) => {
  const images = req.files;
  const promises = [];
  const { _id } = req.body;

  for(let i = 0; i < images.length; i++){
    let img = images[i];
    promises.push(uploadToS3(img));
  }

  try {
    const data = await Promise.all(promises)
    writeToDB(_id, data[0].Location, res);
  } catch(e) {
    res.status(500).send(`A problem occurred while saving/uploading an image. ${e}`);
  }
};