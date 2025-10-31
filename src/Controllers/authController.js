const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../Model/user");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate the user fields
  if (!username || !email || !password || !role) {
    res.status(400).json({
      status: 400,
      success: false,
      message: "Please fill all User Inputs",
    });
  }

  try {
    //Check username and password exist or not
    const preExits = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (preExits) {
      res.status(409).json({
        success: false,
        status: 409,
        message: "User Already Exists",
      });
    }

    //Encription of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, username, password } = req.body;

  // Validate the user fields
  if (!username || !email || !password) {
    res.status(400).json({
      status: 400,
      success: false,
      message: "Please fill username/email with password",
    });
  }

  try {
    //check user is registered or not
    const userExists = User.findOne({
      $or: [{ username, email }],
    });
    if (!userExists) {
      res.status(409).json({
        success: false,
        status: 409,
        message: "User Not Exists. Register First",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Incorrect Password",
      });
    }

    //create jwt token to store locally or in cookies
    const token = jwt.sign(
      {
        userid: userExists._id,
        username: userExists.username,
        role: userExists.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    //set token in HTTP-only cookies or send it to res so in local/session storage
    //but here storing in cookies

    res.cookies("token", token, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === "production", // set true in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
       status: 200,
      success: true,
      message: "Logged In successfully",
      token
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server error",
    });
  }
};
module.exports = { register,login };
