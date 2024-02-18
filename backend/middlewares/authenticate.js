import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  // Extract the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    console.log("token",token)
    const extractedToken = token.split(" ")[1];
    const decoded = jwt.verify(extractedToken, 'mynameiskaranandiliveinramparkext');

    // Attach user information to the request object
    req.userId = decoded.userId;
    console.log('user in req.user',req.userId)

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authenticateUser;
