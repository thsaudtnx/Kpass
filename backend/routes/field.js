const express = require('express');
const Field = require('../models/field');
const Sequelize = require('sequelize');

const router = express.Router();

/**
 * @swagger
 *  /field:
 *    get:
 *      description: "GET all field data"
 *      tags: [field]
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ok :
 *                    type : number
 *                  fieldList:
 *                    type: array
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await Field.findAll({});
    console.log(result);
    res.send({ok : 1, fieldList : result});
  } catch(err) {
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 *
 * /field:
 *  post:
 *    description: "ADD new field data"
 *    tags: [field]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok : 
 *                  type: integer
 *                message : 
 *                  type: string
 *                
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await Field.create(req.body);
    res.status(200).json({ok : 1, message : 'INSERT SUCCESS'});
  } catch(err){
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 * /field/:id:
 *   delete:
 *    description: "Delete specific field data"
 *    tags: [business]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: integer
 *                  example : 1
 *                message:
 *                  type: string
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Field.destroy({
      where : {
        id : req.params.id,
      }
    });
    res.status(200).json({ok : 1, message : `ID :${req.params.id} DELETED SUCCESS`});
  } catch(err){
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 * /field/:id:
 *   put:
 *    description: "Update specific field data"
 *    tags: [field]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: integer
 *                message:
 *                  type: string
 */
router.patch ('/edit/:id', async (req, res, next) => {
  try {
      const result = await Field.update(req.body, {
        where : {
          id : req.params.id
        }
      });
      console.log(result.data);
      res.status(200).json({ok : 1, message : `ID ${req.params.id} UPDATED SUCCESS`});
    } catch(err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;