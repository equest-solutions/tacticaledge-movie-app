const express = require('express')
const router = express.Router()
const movieController = require('../controllers/MovieController')
const { authenticateToken } = require('../middlewares/authentication');


router.get('/welcome', movieController.welcome);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: login
 *     description: Logged In a user and returns a JWT token with User Data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully Logged In
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully Logged In
 *               data: { token: 'your_jwt_token_here' }
 *       403:    
 *          description: Email and password are required
 *          content:
 *           application/json:
 *            example:
 *               message: Email and password are required
 *               status: false
 *       500:
 *         description: display error message
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: display error message
 */
router.post('/login', movieController.login);


/**
 * @swagger
 * /api/create-movie:
 *   post:
 *     summary: Create a movie
 *     description: Creates a new movie.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_uuid:
 *                 type: string
 *               title:
 *                 type: string
 *               publishingYear:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie Created Successfullly
 *         content:
 *           application/json:
 *             example:
 *               message: Movie Created Successfullly
 *               data: { movieId: dc7c1cc8-a8b0-40ed-857d-9590d27f0e6d, title: 'Movie Title', publishingYear: 2022, imageUrl: 'a5433894-1a53-4fd2-89b0-62a82eaf41b7-image.jpg' }
 *       500:
 *         description: display error message
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: display error message
 */
router.post('/create-movie', authenticateToken, movieController.createMovie);

/**
 * @swagger
 * /api/update-movie/{movie_uuid}:
 *   put:
 *     summary: Update a movie
 *     description: Updates an existing movie.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movie_uuid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publishingYear:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Movie updated successfully
 *               data: { movie_uuid: 'dc7c1cc8-a8b0-40ed-857d-9590d27f0e6d', title: 'Updated Title', publishingYear: 2023, imageUrl: 'a5433894-1a53-4fd2-89b0-62a82eaf41b7-image.jpg' }
 *       500:
 *         description: display error message
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: display error message
 */
router.put('/update-movie/:movie_uuid', authenticateToken, movieController.updateMovie);

/**
 * @swagger
 * /api/get-movies{?user_uuid,limitStart,limitEnd}:
 *   get:
 *     summary: Get movies
 *     description: Retrieves a list of movies for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limitStart
 *         schema:
 *           type: integer
 * 
 *       - in: query
 *         name: limitEnd
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of movies retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               movies: [{ movieId: 'dc7c1cc8-a8b0-40ed-857d-9590d27f0e6d', title: 'Movie 1', publishingYear: 2022, imageUrl: 'a5433894-1a53-4fd2-89b0-62a82eaf41b7-image.jpg' }]
 *               totalCount: 1
 *       500:
 *         description: display error message
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: display error message
 */
router.get('/get-movies', authenticateToken, movieController.getMovies);

/**
 * @swagger
 * /api/get-movie-details/{?movie_uuid}:
 *   get:
 *     summary: Get movie details
 *     description: Retrieves details of a specific movie.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movie_uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details fetch successfully
 *         content:
 *           application/json:
 *             example:
 *               movie_uuid: 'movie-uuid'
 *               title: 'Movie Title'
 *               publishingYear: 2022
 *               imageUrl: 'a5433894-1a53-4fd2-89b0-62a82eaf41b7-image.jpg'
 *       500:
 *         description: display error message
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: display error message
 */
router.get('/get-movie-details', authenticateToken, movieController.getMovieDetails);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Logout
 *     description: Logs Out Successfully.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logged Out Successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Logged Out Successfully
 *       500:
 *         description: display error message
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: display error message
 */
router.get('/logout', authenticateToken, movieController.logout);




module.exports = router