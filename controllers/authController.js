const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

//=====CONTROLLER FOR SIGN-UP/REGISTER A NEW USER====
const register = async (req, res, next) => {
  console.log(req.body);
  const { email, password, repeatPassword } = req.body;

  //ERROR HANDLING
  if (!email) {
    // return res.status(400).json({ message: "Please provide an email address" });

    return next(customError("Please provide an email ", 400));
  }

  if (!password) {
    // return res.status(400).json({ message: "Please provide a password" });

    return next(customError)("Please provide a password");
  }

  if (password !== repeatPassword) {
    // return res.status(400).json({ message: "Password does not match" });

    return next(customError)("PPassword does not match");
  }

  //BCRYPT - for hashtag and unhashing passwords
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashedPassword });
    return res.status(201).json({ message: "User Created" });
  } catch (error) {
    // return res.status(500).json({ message: error });

    if (error.code === 11000 && error.keyValue.email) {
      console.log(error.code);
      console.log(error.keyValue.email);

      return next(customError("Email Already Exists", 401));
    }

    //INCASE IT IS NOT A DUPLICATE ERROR BUT A MESSAGE ERROR
    if (error.errors.email.message) {
      return next(customError(error.errors.email.message, 400));
    }
    //INCASE  THE ERROR IS FROM SOMEWHERE IN THE BACKEND
    next(customError("Something went wrong", 500));
  }
};

//===========CONTROLLER TO LOGIN AN EXISTING USER=========
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(customError("Please provide an email ", 400));
  }

  if (!password) {
    return next(customError)("Please provide a password", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError("User does not exist", 401));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(customError("Wrong Password", 400));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.status(200).json({ message: "Login Successfully", token });
};

//======Controller to getUsers based on valid token=====

const getUser = (req, res, next) => {
  const { userId } = req.user;
  res.status(200).json({ id: userId });
};

module.exports = { register, login, getUser };
