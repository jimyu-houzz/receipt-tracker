const express = require('express');
const session = require('express-session');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// to read const from .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// temporary array to store receupts data
const receipts = [
{
    "receiptId": "87450",
    "tag": "Food",
    "date": "05.04.2020",
    "total": "50.60",
    "username": "jimyu"
},
{
    "receiptId": "92737",
    "tag": "Food",
    "date": "14.04.2020",
    "total": "42.70",
    "username": "jimyu"
},
{
    "receiptId": "98260",
    "tag": "",
    "date": "25.04.2020",
    "total": "4.40",
    "username": "johnsmith"
}]

const users = [
{
    "username": "jimyu",
    "password": "password",
},
{
    "username": "johnsmith",
    "password": "password"
}]

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


// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// import the routers
const receiptRouter = require('./routes/receipts');
const userRouter = require('./routes/users');

app.use('/receipts', receiptRouter);
app.use('/users', userRouter);




// app.post('/auth', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     if(username && password){
//         for(let user of users){
//             if(user.username === username && user.password === password){
//                 req.session.loggedin = true;
//                 // store username in session
//                 req.session.username = username;
//                 res.redirect('/receipts');
//                 console.log('found user!!', user);
//                 return;
//             }
//         }
//         console.log('should not run this code!!');
//         res.send('Incorrect username and/or password!');
//         res.end();
//     }else{
//         res.send('Please enter Username and Password');
//         res.end();
//     }
// })



// app.get('/', (req, res) => {
//     res.send('entry point for receipt tracker');
// })

// // url to get receipts based on username from session
// app.get('/receipts', (req, res) => {
//     const output = [];
//     for(let receipt of receipts){
//         if(receipt.username === req.session.username){
//             output.push(receipt);
//         }
//     }
//     res.json(output);
// });

// // get all receipts, even from different users
// app.get('/admin/receipts/', (req, res) => {
//     res.json(receipts);
// })

// // create new receipt
// app.post('/receipts', (req, res) => {
//     const newReceipt = req.body;
//     newReceipt.username = req.session.username;

//     console.log('Created new receipts: ', newReceipt);
//     receipts.push(newReceipt);

//     res.send('New receipt is added');
// })

// // get specific receipt with ID
// app.get('/receipts/:id', (req, res) => {
//     const id = req.params.id;
//     for(let receipt of receipts){
//         if(receipt.receiptId === id){
//             res.json(receipt);
//             return;
//         }
//     }
//     res.status(404).send(`Cannot find receipt id: ${id}`);
    
// })

// // update specific receipt
// app.post('/receipts/:id', (req, res) => {
//     const id = req.params.id;
//     const newReceipt = req.body;

//     for(let i=0; i<receipts.length; i++){
//         let receipt = receipts[i];
//         if(receipt.receiptId === id){
//             receipts[i] = newReceipt;
//             console.log(`updated receipt ${id} success!`)
//             res.send(`Receipt ${id} is updated!!`);
//             return;
//         }
//     }
//     console.log(`Cannot update receipt id:${id}`);
//     res.status(404).send(`Cannot update receipt id:${id}`);
    
// })

// // get receipts based on tags
// app.get('/receipts/tag/:tag', (req, res) => {
//     const tag = req.params.tag.toUpperCase();
//     console.log('finding by tags...');
//     const output = []
//     for(let receipt of receipts){
//         if(receipt.tag.toUpperCase() === tag){
//             output.push(receipt);
//         }
//     }
//     console.log(`Receipts with tag: ${tag}`, output);
//     res.json(output);   
// })

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
})