const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./src/routes/api')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})