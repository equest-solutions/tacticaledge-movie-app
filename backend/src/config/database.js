const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// connect to the MySQL database
db.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error)
  } else {
    console.log('Connected to MySQL database!')
  }
})

module.exports = db