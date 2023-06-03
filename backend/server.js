const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/mediaContents', require('./routes/mediaContentRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.use(cors());

app.listen(port, () => console.log(`Server started on port ${port}`))