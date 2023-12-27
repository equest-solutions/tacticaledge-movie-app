const bcrypt = require('bcrypt');
const userModel = require('../models/MovieModel')
const authMiddleware = require('../middlewares/authentication');
const AWS = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');

const Form = require('../form');
 
// const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()


const welcome = async (req, res) => {
    res.status(201).json({ message: 'welcome to home page' });
};

const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
      }

      // Check if the user already exists
      const existingUser = await userModel.getUserByEmail(email);

      let isTokenValid;
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
              // Token is not valid, generate a new token and update it in the database
              newToken = await authMiddleware.generateToken(existingUser);
              const resultToken = await userModel.updateUserToken(existingUser.id, newToken);
              return res.status(200).json({ data: { ...existingUserData, token: resultToken.token } });
          }

          // Token is still valid, return the existing user's data
          return res.status(200).json({ data: { ...existingUserData, token: existingToken } });
      }

      // If the user does not exist, return an error
      return res.status(404).json({ error: 'User not found' });

  } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
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
            console.log('tmp_path', tmp_path);

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
            console.log('params++++', params);  

               
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
            
                    console.log('result++++', result);
                    res.status(200).json({ data: result });
                  } catch (error) {
                    console.error('Error inserting movie:', error.message);
                    res.status(400).json({ error: 'error' });
                  }
                });
            
         } catch (error) {
          console.error('Error during login:', error.message)
          res.status(500).json({ error: 'Internal Server Error' })
        }
}

const updateMovie = async (req, res) => {
  try {
        console.log('in update movie');
      
        const { user_uuid } = req.params;
        console.log('user_uuid++++', user_uuid);

        let formData = new Form(req);
        let formObject = await formData.parse();  
        const uploadImageName = formObject.files.image[0].originalFilename; 
        const { title, publishingYear } = formObject.fields;

        console.log(`title:- ${title}, publishingYear:- ${publishingYear}`)


          if (!title || !publishingYear) {
            return res.status(400).json({ error: 'Title and publishingYear are required' });
          }
                    
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

              console.log('params', params);   
              s3.upload(params, async (err, data) => {
                if (err) {
                  return res.status(500).send(err.message);
                }
                console.log("Update File uploaded successfully", data);
                try {
                    const result = await userModel.updateMovie({
                      user_uuid,
                      title,
                      publishingYear,
                      imageUrl: data.Key,
                    });
            
                    console.log('result++++', result);
                    res.status(200).json({ data: result });
                  } catch (error) {
                    console.error('Error inserting movie:', error.message);
                    res.status(400).json({ error: 'error' });
                  }
                });
      
    }
    catch (error) {
    console.error('Error during update movie:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getMovies = async (req, res) => {
   
  try {
    const {user_uuid, limitStart , limitEnd} = req.query;
        const result = await userModel.getMovie({user_uuid, limitStart , limitEnd});
        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error during get movie list:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }   

}

const logout = async (req, res) => {
  try {

    const userId = req.user.id;
    console.log('userId', userId);


  } catch (error) {
    console.error('Error during get movie list:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }  
}  

  module.exports = {
    welcome,
    login,
    createMovie,
    updateMovie,
    getMovies,
    logout
  }