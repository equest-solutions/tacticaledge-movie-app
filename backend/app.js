const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./src/routes/api')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Swagger Options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Move App API Documentation',
      version: '1.0.0',
      description: 'Documentation for Movie App API',
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));


// Other middleware and route configurations
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})