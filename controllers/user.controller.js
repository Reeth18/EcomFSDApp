const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(6);
const jwt = require('jsonwebtoken');

// encryption of js: bcryptjs
const register = async (req, res) => {
  let { username, email, password } = req.body;

  // cannot set http request header after its sent to client
  try {
    if (username == "" || email == "" || password == "") {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const isUser = await User.find({ email });
    if (isUser.length > 0) {
      // user exists
      return res.status(401).json({
        message: "User already exists",
        isUser,
      });
    }

    // if isUser not there, register it
    const registeredUser = await User.create({
      username,
      email,
      //   password,
      // encrypted style
      password: await bcrypt.hash(password, salt),
    });

    // jwt.sign(PAYLOAD, Secret Key, Expires in)
    const token = jwt.sign(
      {id: registeredUser._id},
      process.env.JWT_SECRETKEY,
      {expiresIn: '1D'}
      )
    return res.status(200).json({
      message: "New User successfully registered",
      registeredUser,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Something went wrong ${error.message}`,
    });
  }
};

// Login for an existing user
// For this take email and password from the user end
// Check whether the email exists uniquely in the db
// Now match the password with the password of the user existing in the db
// If matches allow him to enter(login)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // if any field exists
    if (email == "" || password == "") {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }

    // Check if user exists
    const isUser = await User.find({ email });
    if (isUser.length == 0) {
      return res.status(400).json({
        message: "User doesnot exist, register yourself",
      });
    }

    // if user is there
    if (isUser.length > 0 && isUser[0].password) {
      // Match users password with password coming from request body
      // console.log(isUser[0]);
      //   if (isUser[0].password == password)
      // comparison
      if (await bcrypt.compare(password, isUser[0].password)) {
        const token = jwt.sign(
          {id: isUser[0]._id},
          process.env.JWT_SECRETKEY,
          {expiresIn: '1D'}
          )
        return res.status(200).json({
          message: "Login successful",
          isUser,
          token
        });
      }
      return res.status(400).json({
        message: "Password doesnot match",
        login: "unsuccessfull"
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Something went wrong ${error.message}`,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const listOfUsers = await User.find();
    if(listOfUsers.length >= 0){
      return res.status(200).json({
        message: "List of Users",
        listOfUsers
      })
    }

    return res.status(400).json({
      message: "user DB is empty",
    })
  } catch (error) {
    return res.status(400).json({
      message: `Something Went Wrong ${error.message}`,
    })    
  }
}


module.exports = {
  register,
  login,
  getAllUser
};
