const bcrypt = require('bcrypt');
const userModel = require('../models/UserModel')
const authMiddleware = require('../middlewares/authentication');
const aws = require('aws-sdk');
const AWS = require('aws-sdk'); // Import the AWS SDK
const multer = require('multer');
const fs = require('fs');

const path = require('path');

const Form = require('../form');
 
 
// const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()



// Configure AWS
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
// console.log('s3@@@@@@', s3);  

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

console.log('upload', upload);


const welcome = async (req, res) => {
    res.status(201).json({ message: 'welcome to home page' });
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

    // Check if the user already exists in the database
    const existingUser = await userModel.getUserByEmail(email);
    console.log('existingUser:-', existingUser);

    let isTokeValid;
    if (existingUser) {
      // Check if the existing token is still valid
      const existingToken = existingUser.token;
      console.log('existingToken', existingToken);
      const resToken = authMiddleware.isTokenValid(existingToken);
      console.log('resToken++++', resToken);
      isTokeValid = resToken.success;
      let newToken = existingToken;
      const existingUserData = {
        id: existingUser.id,
        uuid: existingUser.uuid,
        email: existingUser.email,
      };

      console.log('existingUserData:-', existingUserData);

      if (!isTokeValid) {
        console.log('check is not valid token');
        // Token is still not valid, generate new token
        newToken = await authMiddleware.generateToken(existingUser);
      }

      console.log('newToken+++++', newToken);
      const resultToken = await userModel.updateUserToken(existingUser.id, newToken);
      console.log('resultToken+++', resultToken);

      return res.status(200).json({ data: { ...existingUserData, token: resultToken.token } });
    }
    
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);  
    console.log('hashedPassword', hashedPassword);

    // Insert user into the database using the model
    const result = await userModel.createUser({
        email,
        password: hashedPassword,
      });


    console.log('result++++', result);

    // Generate JWT token
    const generateToken = await authMiddleware.generateToken(result);
    console.log('generateToken', generateToken);

    // Update user's token in the database
    const resultToken = await userModel.updateUserToken(result.userId, generateToken);


    res.status(201).json({ data: { ...result, token: resultToken.token } });
  
      // res.status(200).json({ data: { email: result.email , token: resultToken.token } });
    } catch (error) {
      console.error('Error during login:', error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    }
}


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


          // Check if an image file is uploaded
            // if (!req.file) {
            //   return res.status(400).json({ error: 'Image file is required' });
            // }
                    
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
              };

               
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
    console.log('in get movies')
    const {limtStart , limitEnd} = req.params;
        const result = await userModel.getMovie({limtStart , limitEnd});
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