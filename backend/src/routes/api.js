const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authenticateToken } = require('../middlewares/authentication');


router.get('/welcome', userController.welcome);
router.post('/login', userController.login);
router.post('/create-movie', authenticateToken, userController.createMovie);
router.put('/update-movie/:user_uuid', authenticateToken, userController.updateMovie);
router.get('/get-movies', authenticateToken, userController.getMovies);
router.get('/logout', authenticateToken, userController.logout);
// router.post('/vipula-movie', authenticateToken, userController.vipulaMovie);




module.exports = router