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
  const response = await Profile.find({ _id }, "photo", (err, result) => {
    if (err) throw new Error(err);
    return result;
  });
  return response;
};

const removeFromDB = async (_id, res) => {
  await Profile.findByIdAndUpdate(String(_id), { photo: { url: "", key: "" } }, (err, result) => {
    if (err) {
      res.status(500).send(`A problem occurred while deleting an image. ${err}`);
    } else res.status(200).send(`Image deleted. ${result}`);
  });
};

exports.deleteImages = async (req, res) => {
  const { _id } = req.query;

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
