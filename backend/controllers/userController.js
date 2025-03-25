const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let foundUser;
  try {
    foundUser = await User.findOne({ email });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }

  if (!foundUser) {
    return res.status(442).json({ message: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);

  if (!isMatch) {
    return res.status(442).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
    path: "/",
  });

  return res.json({ email });
};

const register = async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !password || !repeatPassword) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  if (!emailRegExp.test(email)) {
    return res.status(400).json({ message: "Invalid email." });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({ message: "Passwords don't match." });
  }

  let foundUser;

  try {
    foundUser = await User.findOne({ email });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }

  if (foundUser) {
    return res
      .status(442)
      .json({ message: "User with this email already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
    path: "/",
  });

  return res.json({ email });
};

const checkSession = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ isAuthenticated: true, email: decodedToken.email });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false });
  }
};

exports.login = login;
exports.register = register;
exports.checkSession = checkSession;
