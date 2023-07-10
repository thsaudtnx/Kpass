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
 *      summary: "관리자 인증"
 *      description: "서버에 데이터를 보내지 않고 GET요청"
 *      tags: [auth]
 *      responses:
 *        "200":
 *          description: 인증 결과 확인
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
 *    summary: "관리자 로그인"
 *    description: "POST 방식으로 로그인 구현."
 *    tags: [auth]
 *    requestBody:
 *      description: username과 password
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: "관리자 고유아이디"
 *              password:
 *                type: string
 *                description: "관리자 비밀번호"
 *    responses:
 *        "200":
 *          description: 로그인 결과 확인
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
 *    summary: "관리자 로그아웃"
 *    description: "POST 방식으로 관리자 로그아웃"
 *    tags: [auth]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. 
 *      required: false
 *    responses:
 *        "200":
 *          description: 로그아웃 결과 확인
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    logout:
 *                      type: boolean
 */
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout(error => {
    if (error) next(error);
    req.session.destroy();
    res.status(200).json({ok : 1, message : "로그아웃 성공"});
  });
});


module.exports = router;