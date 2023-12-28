const bcrypt = require('bcrypt');
const userModel = require('../models/MovieModel')
const authMiddleware = require('../middlewares/authentication');
const AWS = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');

const Form = require('../form');
const { v4: uuidv4 } = require('uuid');
const e = require('express');
require('dotenv').config()


const welcome = async (req, res) => {
  res.status(201).json({ message: 'welcome to home page' });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: false, message: 'Email and password are required' }, 403);
    }

    // Check if the user already exists
    const existingUser = await userModel.getUserByEmail(email);

    let isTokenValid = false;

    if (existingUser) {
      // Check if the existing token is still valid
      const existingToken = existingUser.token;
      const resToken = authMiddleware.isTokenValid(existingToken);
      isTokenValid = resToken.success;
      let newToken = existingToken;
      const existingUserData = {
        id: existingUser.id,
        uuid: existingUser.uuid,
        email: existingUser.email,
      };
      if (!isTokenValid) {

        newToken = await authMiddleware.generateToken(existingUser);
        const resultToken = await userModel.updateUserToken(existingUser.id, newToken);

        return res.status(200).json({ status: true, message: "Successfully Logged In", data: { ...existingUserData, token: resultToken.token } });
      }
      const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordMatch) {

        return res.status(200).json({ status: false, message: 'Email and password do not match' });
      }

      return res.status(200).json({ status: true, message: "Successfully Logged In", data: { ...existingUserData, token: existingToken } });
    } else {

      return res.status(200).json({ status: false, message: 'User Not Found' });
    }

    // If the user does not exist, return an error


  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ status: false, message: error.message })
  }
};


const createMovie = async (req, res) => {
  try {
    let formData = new Form(req);
    let formObject = await formData.parse();
    const uploadImageName = formObject.files.image[0].originalFilename;

    const { user_uuid, title, publishingYear } = formObject.fields;

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const s3 = new AWS.S3();

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    var tmp_path = formObject.files.image[0].path;

    const rs = fs.createReadStream(tmp_path)

    rs.on('open', () => {
      console.log('OPEN')
    })
    rs.on('end', () => {
      console.log('END')
    })
    rs.on('close', () => {
      console.log('CLOSE')
    })

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${uuidv4()}-${uploadImageName}`,
      Body: rs,
      ContentType: formObject.files.image[0].headers['content-type'],
      ACL: 'public-read'
    };
    s3.upload(params, async (err, data) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      console.log("File uploaded successfully", data);
      try {
        const result = await userModel.createMovie({
          user_uuid,
          title,
          publishingYear,
          imageUrl: data.Key,
        });

        res.status(200).json({ status: true, data: result, message: "Movie Created Successfullly" });
      } catch (error) {
        console.error('Error inserting movie:', error.message);
        res.status(500).json({ status: false, message: error.message })
      }
    });

  } catch (error) {
    console.error('Error during login:', error.message)
    res.status(500).json({ status: false, message: error.message })
  }
}

const updateMovie = async (req, res) => {
  try {

    console.log(`title:- ${title}, publishingYear:- ${publishingYear}`)

    if (!title || !publishingYear) {
      return res.status(400).json({ status: false, error: 'Title and publishingYear are required' });
    }

    const { movie_uuid } = req.params;
    console.log("movie_uuid", movie_uuid)
    let formData = new Form(req);
    let formObject = await formData.parse();

    let isFile = false;

    isFile = formObject.files.image[0].originalFilename ? true : false;

    if (isFile) {
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const s3 = new AWS.S3();
      const storage = multer.memoryStorage();
      const upload = multer({ storage: storage });
      var tmp_path = formObject.files.image[0].path;

      const rs = fs.createReadStream(tmp_path)

      rs.on('open', () => {
        console.log('OPEN')
      })
      rs.on('end', () => {
        console.log('END')
      })
      rs.on('close', () => {
        console.log('CLOSE')
      })
      
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${uuidv4()}-${uploadImageName}`,
      Body: rs,
      ContentType: formObject.files.image[0].headers['content-type'],
      ACL: 'public-read'
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      console.log("Update File uploaded successfully", data);
      try {

        const result = await userModel.updateMovie({
          movie_uuid,
          title,
          publishingYear,
          imageUrl: data.Key,
        });

        res.status(200).json({ status: true, data: result , message : "Movie Updated Successfully" });
      } catch (error) {
        console.error('Error inserting movie:', error.message);
        res.status(500).json({ status: false, message: error.message })
      }
    });

    }else{
      const result = await userModel.updateMovie({
        movie_uuid,
        title,
        publishingYear,
        imageUrl: null ,
      });

      res.status(200).json({ status: true, data: result , message : "Movie Updated Successfully" });
    }

    return res.send({ SDS: 23423423423 })
  } catch (error) {
    console.error('Error during update movie:', error.message)
    res.status(500).json({ status: false, message: error.message })
  }
}

const getMovies = async (req, res) => {

  try {

    const { limitStart, limitEnd } = req.query;
    const result = await userModel.getMovie(req.body.auth_user.uuid, limitStart, limitEnd);
    res.status(200).json({ status: true, data: result, message: "Fetch Successfully" });

  } catch (error) {
    console.error('Error during get movie list:', error.message)
    res.status(500).json({ status: false, message: error.message })
  }

}

const getMovieDetails = async (req, res) => {

  try {

    let movie_uuid = req.params.uuid;
    const result = await userModel.getMovieDetails(movie_uuid);

    res.status(200).json({ status: true, data: result, message: "Movie details fetch successfully" });

  } catch (error) {
    console.error('Error getMovieDetails:', error.message)
    res.status(500).json({ status: false, message: error.message })
  }

}

const logout = async (req, res) => {
  try {

    let id = req.body.auth_user.id
    let updateJson = {
      token: null
    }
    await userModel.updateUser(id, updateJson)
    res.status(200).json({ status: true, message: "Logged Out Successfully" })
  } catch (error) {
    console.error('Error during get movie list:', error.message)
    res.status(500).json({ status: false, message: error.message })
  }
}

module.exports = {
  welcome,
  login,
  createMovie,
  updateMovie,
  getMovies,
  logout,
  getMovieDetails
}