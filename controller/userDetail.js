const getUserDetail = require("../middleware/getUserDetail");

const userDetails = async (req, res) => {
  try {
    // Check for token in cookies, Authorization header, and query parameters
    const token = req.cookies.token || 
                  req.headers.authorization && req.headers.authorization.split(' ')[1] || 
                  req.query.token || 
                  "";

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        error: true,
      });
    }

    const user = await getUserDetail(token);

    return res.status(200).json({
      message: "user details",
      data: user
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetails;
