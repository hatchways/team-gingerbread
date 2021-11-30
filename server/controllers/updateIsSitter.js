const Profile = require("../models/Profile");

const getSitterStatus = async (_id) => {
  const response = await Profile.find({ _id }, "isSitter", (err, result) => {
    if (err) throw new Error(err);
    return result;
  });
  return response;
};

const changeIsSitter = async (_id, value, res) => {
  await Profile.findByIdAndUpdate(String(_id), { isSitter: value }, (err, result) => {
    if (err) {
      res.status(500).send(`A problem occurred while changing sitter status. ${err}`);
    } else res.status(200).send(`Sitter status changed. ${result}`);
  });
};

// @route PATCH /profile/sitter
// @desc become a sitter or not
// @access Private
exports.updateIsSitter = async (req, res) => {
  const { _id } = req.query;

  try {
    const response = await getSitterStatus(_id);
    if (response) {
      await changeIsSitter(_id, !response[0].isSitter, res);
    } else throw new Error("A problem occurred while changing sitter status.");
  } catch (e) {
    res.status(500).send(`A problem occurred while changing sitter status. ${e}`);
  }
};
