const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authenticateToken } = require('../middlewares/authentication');


router.get('/welcome', userController.welcome);
router.post('/login', userController.login);
router.post('/create-movie', authenticateToken, userController.createMovie);




module.exports = router