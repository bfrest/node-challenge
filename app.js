const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

let users = [];
app.use(bodyParser.json());

app.post('/api/sign-up', (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;
  let newUser;

  // hashes the password then adds the user to users array
  bcrypt.hash(password, 2, (err, hash) => {
    newUser = {
      name,
      email,
      password: hash
    };

    // adds user to the users array
    users.push(newUser);
    // sends the ok
    res.sendStatus(200)
    console.log(
      `created user name:${newUser.name} email:${newUser.email} password:${newUser.password}`
    );
  });
});

app.post('/api/sign-in', (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  let currentUser;

  // searches array for the email that matches
  users.forEach(user => {
    // if the email matches, sets the current user
    if (user.email === email) {
      // checks the password against the stored password
      if (bcrypt.compareSync(password, user.password)) {
        // sets the user to the matched user
        currentUser = user;
        console.log(`user ${currentUser.email} logged in successfully!`);
        res.sendStatus(200);
      } else {
        // password/email didn't match
        console.log('Email/Password combo didnt match');
        res.sendStatus(400);
      }
    }
  });
})

app.get('/me', (req, res) => {
  res.send('getting me');
});

app.listen(port, () => console.log(`listening on port ${port}`));