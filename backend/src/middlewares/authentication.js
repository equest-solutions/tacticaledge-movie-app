const userModel = require('../models/MovieModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');

// Generate a random JWT secret and log it
const jwtSecretToken = crypto.randomBytes(32).toString('hex');
console.log('jwtSecretToken', jwtSecretToken);

// Set the JWT secret in the environment variable
// const jwtSecret = process.env.JWT_SECRET;

// process.env.JWT_SECRET = jwtSecret;
// console.log('JWT_SECRET', process.env.JWT_SECRET);

const generateToken = (userJson) => {
  console.log('userJson', userJson);
  const payload = {
    id: userJson.id,
    email: userJson.email,
    user_uuid: userJson.uuid
  };
  // Set the expiration time to one hour (1 day)
  const expiresIn = '1d';

  // Create the JWT token with the user ID and expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  return token;
};

const isTokenValid = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded Token" , decoded)
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const authenticateToken = async (req, res, next) => {
  console.log('req.headers', req.headers);
  const token = req.body.token || req.query.token || req.headers.token;
  console.log('token******', token);

  if (!token) {
    return res.status(403).send({ message: 'A token is required for authentication' });
  }

  try {
    const user = await userModel.getUserByIdOrToken(null, token);
    // Verify the token using the secret key
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token has not expired
    // if (decoded.exp && decoded.exp > Math.floor(Date.now() / 1000)) {
    // Check if the token stored in the database matches the provided token
    if (user && user.token === token) {
      req.body.auth_user =  user ; 
      return next();
    } else {
      return res.status(401).send({ status : false , message: 'Token has been expired' });
    }
    // } else {
    //   return res.status(401).send('Token has expired');
    // }
  } catch (error) {
    // Token verification failed
    return res.status(401).send({ status : false ,  message : error.message });
  }
};

module.exports = {
  generateToken,
  isTokenValid,
  authenticateToken
};
