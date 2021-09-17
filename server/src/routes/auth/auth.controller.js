const { isEmail } = require("validator");
const { generateAuthToken, hash } = require("../../utils/auth.utils");
const User = require("../../models/user.model");

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

  // Checking is email exists
  const user = await User.findByEmail(email);
  if (user) {
    return res
      .status(405)
      .send({ error: "Account with this email already exists" });
  }

  // Creating a JWT and checking if it exists
  const token = await generateAuthToken(email);
  if (!token) {
    return res.status(500).send({ error: "Unable to create a token" });
  }

  // Hashing a user's password
  const hashedPassword = await hash(password);

  // Saving our user and sending them a JWT
  try {
    const user = await User.insert(
      displayName,
      email,
      hashedPassword,
      language
    );
    const maxAgeOfCookie = 7 * 24 * 60 * 60 * 1000; // 7 days

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAgeOfCookie });
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// // const loginPost = async (req, res) => {
// //   try {
// //     const user = await User.login(req.body.email, req.body.password);
// //     const token = await user.generateAuthToken();
// //     res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
// //     res.status(200).json({ user: user._id });
// //   } catch (err) {
// //     const errors = handleErrors(err);
// //     res.status(400).send({ errors });
// //   }
// // };

// // const logoutGet = (req, res) => {
// //   res.cookie("jwt", "", { maxAge: 1 });
// //   res.status(200).send();
// // };

// // const checkUserGet = (req, res) => {
// //   // If user is logged in...
// //   if (req.user) {
// //     res.status(200).send();
// //   } else {
// //     // Otherwise, user is not found and they have to register or login
// //     res.status(404).send();
// //   }
// // };

// module.exports = {
//   register
// };

module.exports = { register };
