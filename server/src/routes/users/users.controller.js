const sharp = require("sharp");
const { hash } = require("../../utils/auth.utils");
const User = require("../../models/user.model");

// Fetching all profiles and your profile
const fetchAllProfiles = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const fetchMyProfile = (req, res) => {
  console.log("lol");
  // If user is logged in...
  if (!req.user) return res.sendStatus(404);

  // Otherwise, user is not found and they have to register or login
  return res.send(req.user);
};

// Update my profile
const updateProfile = async (req, res) => {
  const { displayName, email, password, language } = req.body;

  if (!displayName || !email || !password || !language) {
    return res
      .status(406)
      .send({ error: "Please complete the form to update your profile" });
  }

  try {
    // Updating the hash on our password in case it has changed
    const newPassword = await hash(password);

    const updatedUser = await User.update(
      req.user.id,
      displayName,
      email,
      newPassword,
      req.user.avatar,
      language
    );

    return res.status(202).send(updatedUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    // Using sharp to convert image to png, and resize it to 250x250
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(401);

    // Saving a user's avatar
    const { id, displayName, email, password, language } = user;
    await User.update(id, displayName, email, password, buffer, language);

    return res.sendStatus(202);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  fetchAllProfiles,
  fetchMyProfile,
  uploadAvatar,
  updateProfile
};
