const bcrypt = require('bcrypt');
const userModel = require('../models/UserModel')
const authMiddleware = require('../middlewares/authentication');
const aws = require('aws-sdk'); // Import the AWS SDK
const multer = require('multer');

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
        console.log('formObject++++', formObject);
        console.log('image++++', formObject.files.image )

        const uploadImagePath = formObject.files.image[0].originalFilename;
        console.log('uploadImagePath++++',  uploadImagePath);

    //    console.log('In create funtion'); 
      const { user_uuid, title, publishingYear } = formObject.fields;
  
      // Validate input
      if (!title || !publishingYear) {
        return res.status(400).json({ error: 'Title and publishingYear are required' });
      }

  
      // Check if an image file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }
  
      // Generate a unique filename for the image
      const imageName = `${uuidv4()}-${req.file.originalname}`;     
      console.log('imageName', imageName);
  
      // Upload the image to S3
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read',
      };

      console.log('params', params);
  
      const s3Response = await s3.upload(params).promise();
  
      // Save movie data to the database
      const movieData = {
        title,
        publishingYear,
        imageUrl: s3Response.Location,
        user_uuid,
      };
  
      const result = await userModel.createMovie(movieData);

      console.log('result!!!!!!!', result);
  
      res.status(201).json({ data: result });
    } catch (error) {
      console.error('Error during movie creation:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};



// const createMovie = async (req, res) => {
//     try {
//         console.log('In creare new functions');

//         console.log('req.file:', req.file);
        
//         upload(req, res, async function (err) {
//             if (err) {
//               console.error('Error uploading image to S3:', err);
//               return res.status(500).json({ error: 'Error uploading image to S3' });
//             }
      
//             const { user_uuid, title, publishingYear } = req.body;
//             const imageUrl = req.file.location; // S3 URL of the uploaded image
//             console.log('imageUrl+++', imageUrl);
      
//             // Insert movie into the database using the model
//             const result = await userModel.createMovie({
//               user_uuid,  
//               title,
//               publishingYear,
//               imageUrl,
//             });

//             console.log('Result######', result);
      
//             res.status(201).json({ data: result });
//           });
//      } catch (error) {
//       console.error('Error during login:', error.message)
//       res.status(500).json({ error: 'Internal Server Error' })
//     }
// }
  


  module.exports = {
    welcome,
    login,
    createMovie
  }