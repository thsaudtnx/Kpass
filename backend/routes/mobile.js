const express = require('express');
const Business = require('../models/business');
const Sequelize = require('sequelize');

const router = express.Router();

/**
 * @swagger
 *  /mobile:
 *    get:
 *      description: "GET all business data"
 *      tags: [mobile]
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  logo:
 *                    type: string
 *                  name:
 *                    type: string
 *                  type:
 *                    type: string
 *                  phone:
 *                    type: string
 *                  address:
 *                    type: string
 *                  latitude:
 *                    type: number
 *                  longitude:
 *                    type: number
 *                  kpass:
 *                    type: integer
 *                  travelwallet:
 *                    type: integer
 */
router.get('/', async (req, res, next) => {
  console.log(req.query.updatedAt);
  if (req.query.updatedAt){
    const result = await Business.findAll({
      where : Sequelize.or({
        //createdAt : {[Sequelize.Op.gt] : req.query.updatedAt},
        updatedAt : {[Sequelize.Op.gt] : req.query.updatedAt},
        deletedAt : {[Sequelize.Op.gt] : req.query.updatedAt},
      })
    });
    console.log(result.data || 'no data');
    res.send(result.data);
  } else {
    const result = await Business.findAll({});
    console.log(result);
    res.send(result);
  }
});


module.exports = router;