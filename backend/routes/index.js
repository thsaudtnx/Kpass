const express = require('express');
const businessRouter = require('./business');
const fieldRouter = require('./field');
const authRouter = require('./auth');
const mobileRouter = require('./mobile');
const webRouter = require('./web');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name : business
 *  description : Fetch, Update, Insert, Delete business data
 */
router.use('/business', businessRouter);

/**
 * @swagger
 * tags:
 *  name : field
 *  description : Fetch, Update, Insert, Delete field data
 */
router.use('/field', fieldRouter);

/**
 * @swagger
 * tags:
 *  name : auth
 *  description : login authentication using passport
 */
router.use('/auth', authRouter);

/**
 * @swagger
 * tags:
 *  name : mobile
 *  description : Retrieve business data for mobile environment
 */
router.use('/mobile', mobileRouter);

router.use('/web', webRouter);

module.exports = router;