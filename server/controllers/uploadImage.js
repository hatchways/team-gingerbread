const aws = require("aws-sdk");
const multer = require("multer");
const Profile = require("../models/Profile");

const BUCKET_NAME = "team-gingerbread-s3bucket";

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
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
  };
  return s3.getSignedUrlPromise("getObject", params);
};

const writeToDB = async (_id, data, res) => {
  await Profile.findByIdAndUpdate(
    _id,
    {
      photo: {
        url: data[0],
        key: data[1],
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).send(`A problem occurred while saving an image. ${err}`);
      } else res.status(200).send(`Image saved. ${result}`);
    }
  );
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
    writeToDB(_id, [url, data[0].key], res);
  } catch (e) {
    res.status(500).send(`A problem occurred while saving/uploading an image. ${e}`);
  }
};
