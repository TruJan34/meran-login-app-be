const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const responses = require('../utils/responses');

const router = express.Router();

router.post('/register', (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.json(
          responses.genericError(100, 'Something went wrong. Please try again.')
        );
      } else {
        User.create({ ...req.body, password: hash }, (mongooseError, user) => {
          if (mongooseError) {
            res.json(errJSON);
          } else {
            res.json(
              responses.genericSuccess({
                code: 1,
                message: 'Suceesfully registered. You can login now.'
              })
            );
          }
        });
      }
    });
  } else {
    res.json(responses.genericError(100, 'Invalid Input!'));
  }
});

router.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    const query = {};
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z.]{2,5}$/i.test(req.body.email)) {
      query.email = req.body.email.toLowerCase();
    } else {
      res.json(responses.genericError(100, 'Invalid Input!'));
      res.end();
    }
    User.findOne(query, (err, user) => {
      if (err) {
        res.json(err);
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            user = user.toObject();
            delete user['password'];
            const token = jwt.sign({ user: user }, config.jwt.secret, {
              expiresIn: '10h'
            });
            res.json(responses.genericSuccess({ token }));
          } else if (err) {
            res.json(err);
          } else {
            res.json(
              responses.genericError(
                100,
                'Authentication failed. Incorrect Password!'
              )
            );
          }
        });
      } else {
        res.json(
          responses.genericError(
            100,
            'Authentication failed. This Email Address is not registered!'
          )
        );
      }
    });
  } else {
    res.json(
      responses.genericError(100, 'Email Address and Password are required!')
    );
  }
});

router.get('/test', (req, res) => {
  res.send('Hi Users Here');
});

module.exports = router;
