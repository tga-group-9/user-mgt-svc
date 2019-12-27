const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../config/config');

require('../models/UserModel');
const UserModel= mongoose.model('user'); 

const userController = {

  registerUser: (req, res, next) => {
    const saltRounds = 10;
    try {
      UserModel.find({ username: req.body.username })
      .exec().then((user) => {
        if(user.length > 0) {
          res.status(409).send({ msg: 'User name already taken, Please try with other.' });
        } else {
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const userModel = new UserModel({
              fname: req.body.fname,
              lname: req.body.lname,
              username: req.body.username,
              password: hash,
              badge: req.body.badge
            });
            userModel.save((error, response) => {
              res.set('Content-Type', 'application/json');
              res.status(201).send({
                id: response._id,
                fname: response.fname,
                lname: response.lname,
                username: response.username,
                badge: response.badge,
                createdAt: response.createdAt,
                msg: 'User registered successfully!!!'
              });
            });
          });
        }
      }); 
    } catch (error) {
      res.status(500).send({ msg: 'Error in registration.' });
    }
  },

  logoutUser: (req, res, next) => {
    try {
      res.set('Content-Type', 'application/json');
      res.status(201).send({ 
        token: null,
        id: null,
        message: 'You have logged out successfully!!!'
      });
    } catch (error) {
      res.status(500).send({ msg: 'Error in logout' });
    }
  },

  loginUser: (req, res, next) => {
    UserModel.find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          res.status(401).json({
            msg: 'Auth failed',
          });
        } else {
          bcrypt.compare(req.body.password, user[0].password, function(err, compareRes) {
            if(compareRes === true) {
                /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                const token = jwt.sign({ sub: user[0]._id, username: user[0].username }, config.secret, { expiresIn: '1h' });
                return res.status(200).json({
                  msg: 'Auth successful',
                  token,
                  id: user[0]._id,
                });
            } else {
              res.status(401).json({
                msg: 'Auth failed',
              });
            }
          });
        }
      })
      .catch((error) => {
        res.status(401).send({
          msg: 'Auth failed',
        });
      });
  },

  getUserById: (req, res, next) => {
    UserModel.findById({ _id: req.params.id }, (err, user) => {
      if (err) {
        throw err;
      } else {
        return res.status(200).json({ 
          id: user._id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          badge: user.badge,
          createdAt: user.createdAt,
         });
      }
    });
  },

  getUserByName: (req, res, next) => {
    UserModel.find({ username: req.params.username }, (err, user) => {
      if (err) {
        throw err;
      } else {
        return res.status(200).json({ 
          id: user[0]._id,
          fname: user[0].fname,
          lname: user[0].lname,
          username: user[0].username,
          badge: user[0].badge,
          createdAt: user[0].createdAt,
         });
      }
    });
  }

}

module.exports = userController;
