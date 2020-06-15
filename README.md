## 1.  demonstrate the app
Show what its features are
Notice front-end functionality is present, only SQL queries are missing

## 2.  setup server
```js
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
```

## 3.  setup .env
```js
SERVER_PORT = 3500
CONNECTION_STRING = 'your connection string'
```

## 4. Open SQL TABS and create two tables

4a. the first table (called "cars") should list the cars with columns of make, model, and year
```SQL
CREATE TABLE cars(
    id SERIAL PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(500),
    year INTEGER
);
```
4b. the second table (called "garage") should list the name and vehicle id that they own from the cars table
```SQL
CREATE TABLE garage(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    vehicle INTEGER
);
```

# create a db folder to store queries in


## 5. get_all_cars.sql
write a query that will select everything on the cars table
```SQL
SELECT * FROM cars
```

## 6. get_cars_by_make.sql
write a query that will select 
```SQL
SELECT g.name, c.make, c.model, c.year, g.vehicle, c.id
FROM garage g
JOIN cars c ON g.vehicle = c.id
WHERE make = $1
```

## 7. get_cars_by_make_person.sql
write a query that will select vehicles for up to 3 selected people (checkbox)

```SQL
SELECT g.name, c.make, c.model, c.year, g.vehicle, c.id
FROM garage g
JOIN cars c ON g.vehicle = c.id
WHERE make = $1
AND name = $2
OR make = $1
AND name = $3
OR make = $1
AND name = $4
```

## 8. Open the seed.sql file and copy the data over using SQL Tabs

## 9. The App should now be fully functional