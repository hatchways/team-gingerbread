const aws = require("aws-sdk");
const Profile = require("../models/Profile");

const BUCKET_NAME = "team-gingerbread-s3bucket";

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new aws.S3();

const deleteInS3 = (Key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Delete: {
      Objects: [{ Key }],
      Quiet: false,
    },
  };

  return s3.deleteObjects(params).promise();
};

const getKeyFromDB = async (_id) => {
  const response = await Profile.find({ _id }, "photo");
  if (!response) throw new Error("A problem occurred while deleting an image");
  return response;
};

const removeFromDB = async (_id, res) => {
  const profile = await Profile.findByIdAndUpdate(String(_id), { photo: { url: "", key: "" } }, { new: true });
  if (!profile) {
    res.status(500).send("A problem occurred while deleting an image.");
  }
  res.status(200).send({ success: { message: "Image deleted." } });
};

// @route DELETE /image/delete?
// @desc delete profile photo in S3 and DB
// @access Private
exports.deleteImages = async (req, res) => {
  const { _id } = req.body;

  try {
    const response = await getKeyFromDB(_id);
    if (response) {
      await deleteInS3(response[0].photo.key);
      await removeFromDB(_id, res);
    } else throw new Error("A problem occurred while deleting an image.");
  } catch (e) {
    res.status(500).send(`A problem occurred while deleting an image. ${e}`);
  }
};
