const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const products = require('./products')
const register = require('./routes/register')
const login = require('./routes/login')
const stripe = require('./routes/stripe')

const app = express()

require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use("/api/register",register)
app.use("/api/login",login)
app.use("api/stripe",stripe)

app.get('/',(req,res) => { 
    res.send('welcome t our online shop API....')
})

app.get('/products',(req,res) => { 
    res.send(products)
}) 

const port = process.env.PORT || 5000
const uri = process.env.DB_URI

app.listen(port, console.log(`server running on port ${port}`))

mongoose.connect(
    uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
.then(() => console.log('mongoDB connection is successful...'))
.catch(err => console.log('mongoDB connection failed',err.message))
