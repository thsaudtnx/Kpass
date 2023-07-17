const express = require('express');
const passport = require('passport');
const bcypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /auth/authentication:
 *    get:
 *      description: "Check Authentication"
 *      tags: [auth]
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    authenticated:
 *                      type: boolean
 */
router.get('/authentication', (req, res, next) => {
  console.log('user : ', req.user);
  res.send({authenticated : !!req.user});
});


/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *    description: "Login using passport"
 *    tags: [auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    login:
 *                      type: boolean
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
  console.log(req.body);
  console.log(req);
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(200).json({login : false});
    }
    return req.login(user, (loginError) => {
      if (loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.send({login : true});
    });
  })(req, res, next);
});


/**
 * @swagger
 *
 * /auth/logout:
 *  post:
 *    description: "Logout using passport"
 *    tags: [auth]
 *    requestBody:
 *      required: false
 *    responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    logout:
 *                      type: boolean
 */
router.post('/logout', (req, res, next) => {
  req.logout(error => {
    if (error) next(error);
    req.session.destroy();
    res.status(200).json({ok : 1, message : "LOGOUT SUCCESS"});
  });
});


module.exports = router;