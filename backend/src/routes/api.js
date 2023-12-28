const express = require('express')
const router = express.Router()
const movieController = require('../controllers/MovieController')
const { authenticateToken } = require('../middlewares/authentication');


router.get('/welcome', movieController.welcome);
router.post('/login', movieController.login);
router.post('/create-movie', authenticateToken, movieController.createMovie);
router.put('/update-movie/:movie_uuid', authenticateToken, movieController.updateMovie);
router.get('/get-movies', authenticateToken, movieController.getMovies);
router.get('/get-movie-details', authenticateToken, movieController.getMovieDetails);


router.get('/logout', authenticateToken, movieController.logout);




module.exports = router