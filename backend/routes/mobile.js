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
const { Op } = Sequelize;
router.get('/', async (req, res, next) => {
  console.log(req.query);
  if (req.query.updatedAt){
    const result = await Business.findAll({
      paranoid : true,
      where: {
        [Op.or]: [
          { createdAt: { [Op.gt]: req.query.updatedAt } },
          { updatedAt: { [Op.gt]: req.query.updatedAt } },
          { deletedAt: { [Op.gt]: req.query.updatedAt } }
        ]
      }
    });
    console.log(result);
    res.send(result);
  } else {
    const result = await Business.findAll({});
    console.log(result);
    res.send(result);
  }
});


module.exports = router;