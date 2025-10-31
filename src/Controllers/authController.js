const User = require("../Model/user");

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
    const preExits = User.findOne({
      email,
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
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role
    });

    await newUser.save();

    res.status(200).json({
        success: true,
        status: 200,
        message: "registered successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server Error",
    });
  }
};
