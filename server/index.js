require('dotenv').config()
const express = require('express')
const massive = require('massive')
const dbCtrl = require('./controller/dbCtrl')

const { SERVER_PORT, CONNECTION_STRING } = process.env
const { getAllCars, getCarsByMake, getCarsByModel, getCarsByYear } = dbCtrl

const app = express()

app.use(express.json())

//ENDPOINTS
app.get('/api/cars', getAllCars)
app.get('/api/make', getCarsByMake )


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then((db)=>{
    app.set("db", db)
    app.listen(SERVER_PORT, console.log(`DB set and app listening on port ${SERVER_PORT}`))
}).catch(err=>console.log(err))
