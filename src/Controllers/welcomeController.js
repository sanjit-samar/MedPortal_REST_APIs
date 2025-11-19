const welcome = (req, res) => {
  const { username, role, userid } = req.userInfo;

  res.json({
    message: "Welcome Home page",
    user: {
      _id: userid,
      username,
      role,
    },
  });
}

module.exports = {welcome};