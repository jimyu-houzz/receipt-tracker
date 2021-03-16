const router = require('express').Router();
const { json } = require('body-parser');
// import the User schema
const User = require('../models/user.model');



/* POST login */
router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if(username && password){
        User.find({"username": username, "password": password})
            .then(users => {
                console.log('Users: ', users);
                // if we find the user from the collection
                if(users.length !== 0){
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.send(`${username} logged in successfully!!`);
                }else{
                    res.send('Incorrect username and/or password');
                }

            })
            .catch(err => res.status(400).json('Error: ' + err));
    }else{
        res.send('Please enter Username and Password');
        res.end();
    }   
})

router.route('/signup').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const newUser = new User({
        username, password, name,
    });

    newUser.save()
        .then(() => {
            console.log(`User: ${username} created!!`);
            req.session.loggedin = true;
            req.session.username = username;
            res.send(`Created new user: ${username} !!`);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})



/* GET all users */
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

