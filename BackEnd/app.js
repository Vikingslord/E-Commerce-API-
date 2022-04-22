const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv/config');

//MiddleWare
app.use(bodyparser.json()); //parsing JSON
app.use(morgan('tiny')) //to see update (requests)
app.use(cors())
app.use('*', cors())

//Routes
const productRoutes = require('./routers/products')
const categoryRoutes = require('./routers/categories')
const userRoutes = require('./routers/users')

const api = process.env.API_URL

app.use(`${api}/products`, productRoutes) //Express Routes (Routers)
app.use(`${api}/categories`, categoryRoutes) //Express Routes (Routers)
app.use(`${api}/users`, userRoutes)



//MongoDB Connection
mongoose.connect(process.env.Connection_String, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'E-Shop'
})
    .then(() => {
        console.log("Database Connection Successful!");
    }).catch((err) => {
        console.log(err);
    })

app.listen(5000, () => {
    console.log(`App running on http://localhost:5000`);
})