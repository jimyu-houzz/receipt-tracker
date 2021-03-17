const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

// to read const from .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// cross-origin
app.use(cors());
app.use(express.json());

// connect to Mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
})


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// import the routers
const receiptRouter = require('./src/routes/receipts');
const userRouter = require('./src/routes/users');

// default entry point for app
app.get('/', (req, res) => {
    console.log('App is up and running!');
    res.send('App is up and running!!');
});

// import routers
app.use('/receipts', receiptRouter);
app.use('/users', userRouter);




app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
})