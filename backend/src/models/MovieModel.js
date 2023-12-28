const db = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const getUserByEmail = (email) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  try {
    return new Promise((resolve, reject) => {
      db.query(sql, [email], (err, result) => {
        if (err) {
          console.error('Error retrieving user by email:', err);
          reject(err);
        } else {
          // If a user is found, return the user data
          if (result && result.length > 0) {
            resolve(result[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error user by email:', error);
    throw error;
  }
};

const updateUserToken = (userId, token) => {
  const sql = 'UPDATE user SET token = ? WHERE id = ?';
  try {
    return new Promise((resolve, reject) => {
      db.query(sql, [token, userId], (err, result) => {
        if (err) {
          console.error('Error updating user token: ' + err.message);
          reject({ error: err.message });
        } else {
          const updatedData = {
            userId,
            token,
            affectedRows: result.affectedRows,
            changedRows: result.changedRows
          };
          console.log('Update successful:', updatedData);
          resolve(updatedData);
        }
      });
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

const createMovie = async (movieData) => {
  const { user_uuid, title, publishingYear, imageUrl } = movieData;
  console.log('movieData', movieData);

  const uuid = uuidv4()

  const sql = 'INSERT INTO movie (uuid, user_uuid, title, publish_year, image) VALUES (?, ?, ?, ?, ?)';

  try {
    return new Promise((resolve, reject) => {
      db.query(sql, [uuid, user_uuid, title, publishingYear, imageUrl], (err, result) => {
        if (err) {
          console.error('Error inserting movie:', err);
          reject(new Error(err.message));
        } else {
          const insertedData = {
            movieId: result.insertId,
            title,
            publishingYear,
            imageUrl
          };
          console.log('Insert movie successful:', insertedData);
          resolve(insertedData);
        }
      });
    });
  } catch (error) {
    console.error('Error inserting movie:', error);
    throw error;
  }
};

const getUserByIdOrToken = (userId = null, token = null) => {
  console.log('userId:-----', userId);
  console.log('token: getUserByIdOrToken ', token);
  const sql = 'SELECT * FROM user WHERE ' + (userId ? 'id = ?' : 'token = ?');

  return new Promise((resolve, reject) => {
    db.query(sql, [userId || token], (err, result) => {
      if (err) {
        console.error('Error retrieving user by ID:', err);
        reject(err);
      } else {
        // If a user is found, return the user data
        if (result && result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
};


const updateMovie = (updateMovieData) => {
  const { movie_uuid, title, publishingYear, imageUrl } = updateMovieData;

  let sql = 'UPDATE movie SET title = ?, publish_year = ?';
  if (imageUrl) {
    sql = sql + ', image = ?'
  }
  sql = sql + ' WHERE uuid = ?';

  let setData = imageUrl ? [title, publishingYear, imageUrl, movie_uuid] : [title, publishingYear, movie_uuid]

  try {
    return new Promise((resolve, reject) => {
      db.query(sql, setData, (err, result) => {
        if (err) {
          console.error('Error updating movie: ' + err.message);
          reject({ error: err.message });
        } else {
          const updatedData = {
            movie_uuid,
            title,
            publishingYear,
            imageUrl,
            affectedRows: result.affectedRows,
            changedRows: result.changedRows
          };
          resolve(updatedData);
        }
      });
    });
  } catch (error) {
    console.error('Error updating movie data:', error);
    throw error;
  }
}

const getMovie = (user_uuid, limitStart, limitEnd) => {
  const sql = 'SELECT * FROM movie WHERE user_uuid = ? ORDER BY id ASC LIMIT ?, ?';
  const countSql = 'SELECT COUNT(*) AS total FROM movie WHERE user_uuid = ?';

  // Adjust the offset if limitStart is greater than 0
  // const offset = parseInt(limitStart, 10) > 0 ? parseInt(limitStart, 10) - 1 : 0;

  limitStart =   parseInt(limitStart) ? parseInt(limitStart) : 1 
  limitEnd = limitEnd ? limitEnd : limitStart + 6

  let dataLimit  =  (limitEnd - limitStart) ; 
  
  return new Promise((resolve, reject) => {
    // First, execute the query to get paginated movie data
    db.query(sql, [user_uuid, parseInt(limitStart - 1 ), parseInt(dataLimit +  1 ) ], (err, result) => {
      if (err) {
        console.error('Error retrieving movies:', err);
        reject(err);
      } else {
        // Then, execute the query to get the total count of movies
        db.query(countSql, [user_uuid], (countErr, countResult) => {
          if (countErr) {
            console.error('Error retrieving total count:', countErr);
            reject(countErr);
          } else {
            // Include the total count in the response
            const totalCount = countResult[0].total;
            resolve({ movies: result, totalCount });
          }
        });
      }
    });
  });
};

const updateUser = (user_id, updateJson) => {
  return new Promise((resolve, reject) => {

    let sql = `UPDATE user SET ?  WHERE id = ? `;

    db.query(sql, [updateJson, user_id], (err, result) => {
      if (err) {
        console.error('Error while updating user:', err);
        reject(err);
      } else {
        // If a user is found, return the user data
        if (result && result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
}


const getMovieDetails = (movie_uuid) => {
  try {
    const sql = 'SELECT * FROM movie WHERE uuid = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [movie_uuid], (err, result) => {
        if (err) {
          console.error('Error retrieving user by email:', err);
          reject(err);
        } else {
          // If a user is found, return the user data
          if (result && result.length > 0) {
            resolve(result[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error user by email:', error);
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  updateUserToken,
  createMovie,
  updateMovie,
  getUserByIdOrToken,
  getMovie,
  getMovieDetails,
  updateUser
}