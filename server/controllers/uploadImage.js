const aws = require("aws-sdk");
const multer = require("multer");
const Profile = require("../models/Profile");

const BUCKET_NAME = "team-gingerbread-s3bucket";
const IN_SECONDS = 60 * 60 * 24 * 7;

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
  signatureVersion: "v4",
});

const s3 = new aws.S3();

const uploadToS3 = (img) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: img.originalname,
    Body: img.buffer,
  };
  return s3.upload(params).promise();
};

const getS3Url = (key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: IN_SECONDS,
  };
  return s3.getSignedUrlPromise("getObject", params);
};

const writeToDB = async (_id, url, key, res) => {
  const profile = await Profile.findByIdAndUpdate(
    _id,
    {
      photo: {
        url,
        key,
      },
    },
    { new: true }
  );

  if (!profile) {
    res.status(500).send("A problem occurred while saving an image.");
  }
  res.status(200).send({ success: { message: "Image saved." } });
};

exports.multerMultiUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Please upload a jpeg or png file type."));
    }
  },
}).array("images");

// @route POST /image/upload
// @desc upload profile photo to S3 and write link to DB
// @access Private
exports.uploadImages = async (req, res) => {
  const images = req.files;
  const promises = [];
  const { _id } = req.body;

  for (let i = 0; i < images.length; i += 1) {
    const img = images[i];
    promises.push(uploadToS3(img));
  }

  try {
    const data = await Promise.all(promises);
    const url = await getS3Url(data[0].key);
    writeToDB(_id, url, data[0].key, res);
  } catch (e) {
    res.status(500).send(`A problem occurred while saving/uploading an image. ${e}`);
  }
};
