const express = require('express');
const Business = require('../models/business');
const Sequelize = require('sequelize');

const router = express.Router();

/**
 * @swagger
 *  /mobile:
 *    get:
 *      summary: "업체 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mobile]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
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