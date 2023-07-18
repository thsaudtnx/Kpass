const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /auth/changePassword:
 *    post:
 *      description: "Change Password"
 *      tags: [auth]
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: number
 *                    message:
 *                      type: string
 * 
 */
router.post('/changePassword', async (req, res, next) => {
  console.log(req.body);
  const {username, password} = req.body;
  const hash = await bcrypt.hash(password, 12);
  const UpdatedInfo = await User.update({password : hash}, { where: { username : username } });
  res.send({ok : 1, message : 'password change success!'});
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
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout(() => {
    req.session.destroy();
    res.status(200).json({ok : 1, message : "LOGOUT SUCCESS"});
  });
});


module.exports = router;