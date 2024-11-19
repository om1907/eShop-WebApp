const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const authRoute = require('./routes/authRoutes')
const categoryRoute =require('./routes/categoryRoute')
const productRoute =require('./routes/productRoute')
const cors = require('cors')

//config env
dotenv.config()

//Database config
connectDB()

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));


//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)

//rest api
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to eShop app',
  })
})

//Port
const PORT = process.env.PORT || 4000

//run listen
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
