const aws = require("aws-sdk");

const BUCKET_NAME = "team-gingerbread-s3bucket";
const SECONDS = 60 * 10;

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new aws.S3();

const getS3Url = (key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: SECONDS,
  };
  return s3.getSignedUrlPromise("getObject", params);
};

// @route GET /image/retrieve
// @desc get url for profile image
// @access Private
exports.retrieveUrl = async (req, res) => {
  const { key } = req.query;

  const url = await getS3Url(key);

  if (!url) {
    res.status(500);
    throw new Error("Unable to retrieve photo url");
  }

  res.status(200).json(url);
};
