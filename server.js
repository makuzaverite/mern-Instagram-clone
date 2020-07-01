const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middleware/error')
const colors = require('colors')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const cors = require('cors')
const connetDB = require('./config/db')

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config({ path: './config/.env' })

//connecting to database
connetDB()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//For handling fileuploading
app.use(fileupload())

//set static folder
app.use('/public', express.static(path.join('public/')))
//Mount routes
const users = require('./routers/users')
const auth = require('./routers/auth')
const profile = require('./routers/profile')
const post = require('./routers/post')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//Mount routers
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/post', post)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at ${PORT}`.yellow.bold
  )
)

//Handled promise rejection
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red)
  server.close(() => process.exit(1))
})
