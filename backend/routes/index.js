const express = require('express');
const businessRouter = require('./business');
const authRouter = require('./auth');
const mobileRouter = require('./mobile');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name : business
 *  description : 관리자 업체 조회, 수정, 추가, 삭제
 */
router.use('/business', businessRouter);

/**
 * @swagger
 * tags:
 *  name : auth
 *  description : passport 이용한 로그인 인증
 */
router.use('/auth', authRouter);

/**
 * @swagger
 * tags:
 *  name : mobile
 *  description : 모바일 업체 조회
 */
router.use('/mobile', mobileRouter);

module.exports = router;