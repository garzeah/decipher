const { isEmail } = require("validator");
const {
  generateAuthToken,
  hash,
  verifyCredentials
} = require("../../utils/auth.utils");
const User = require("../../models/user.model");
const maxAgeOfCookie = 7 * 24 * 60 * 60 * 1000; // 7 days

const register = async (req, res) => {
  const { displayName, email, password, language } = req.body;

  if (!displayName || !email || !password || !language) {
    return res
      .status(406)
      .send({ error: "Missing input, please complete the form" });
  }

  if (!isEmail(email)) {
    return res.status(406).send({ error: "Please enter a valid email" });
  }

  try {
    // Checking is email exists
    const isExists = await User.findByEmail(email);
    if (isExists) {
      return res
        .status(405)
        .send({ error: "Account with this email already exists" });
    }

    // Creating a JWT and checking if it exists
    const token = generateAuthToken(email);
    if (!token) {
      return res.status(500).send({ error: "Unable to create a token" });
    }

    // Hashing a user's password
    const hashedPassword = await hash(password);

    // Saving our user and sending them a JWT
    const newUser = await User.insert(
      displayName,
      email,
      hashedPassword,
      language
    );

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAgeOfCookie });
    return res.status(201).send({ newUser });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifying a user's credential
    const user = await verifyCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: "Invalid login information" });
    }

    // Creating a JWT and checking if it exists
    const token = generateAuthToken(email);
    if (!token) {
      return res.status(500).send({ error: "Unable to create a token" });
    }

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAgeOfCookie });
    res.status(201).json({ user });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.sendStatus(200);
};

module.exports = { register, login, logout };
