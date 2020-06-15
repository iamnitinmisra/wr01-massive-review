# 1.  demonstrate the app
Notice front-end functionality is present, only SQL queries are missing
<br/> The app will demonstrate joining two different tables and displaying their respective data
<br/> The filter features work via queries as well rather than array methods
<br/>
<br/>
<br/>
<br/>
# 2.  setup server
run npm install to install required app packages. 

* Then set your server up to connect to your db via Massive
* Set your app up to listen on port 3500

* Write an endpoint and method that will be used to query for all vehicle makes. name this method getAllCars
* Write an endpoint and method that will be used to query for a specific vehicle make. name this method getCarsByMake
<details closed>

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

</details>
<br/>
<br/>
<br/>
<br/>

# 3.  setup .env
Setup your environment variables. SERVER_PORT should be set to 3500. Grab your CONNECTION_STRING from Heroku
<details closed>

```js
SERVER_PORT = 3500
CONNECTION_STRING = 'your connection string'
```

</details >
<br/>
<br/>
<br/>
<br/>


# 4. Open SQL TABS and create two tables

## 4a. the first table (called "cars") should list the cars with columns of make, model, and year
<details closed>

```SQL
CREATE TABLE cars(
    id SERIAL PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(500),
    year INTEGER
);
```
</details>
<br/>
<br/>
<br/>
<br/>

## 4b. the second table (called "garage") should list the name and vehicle id that they own from the cars table

<details closed>

```SQL
CREATE TABLE garage(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    vehicle INTEGER
);
```

</details>

<br/>
<br/>
<br/>
<br/>

# create a db folder to store queries in


## 5. get_all_cars.sql
write a query that will select everything on the cars table

<details closed>

```SQL
SELECT * FROM cars
```

</details>

<br/>
<br/>
<br/>
<br/>


## 6. get_cars_by_make.sql
write a query that will select 

<details closed>

```SQL
SELECT g.name, c.make, c.model, c.year, g.vehicle, c.id
FROM garage g
JOIN cars c ON g.vehicle = c.id
WHERE make = $1
```

</details>

<br/>
<br/>
<br/>
<br/>


## 7. get_cars_by_make_person.sql
write a query that will select vehicles for up to 3 selected people (checkbox)

<details closed>

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

</details>

<br/>
<br/>
<br/>
<br/>


## 8. Open the seed.sql file and copy the data over using SQL Tabs

<br/>
<br/>
<br/>
<br/>


## 9. The App should now be fully functional