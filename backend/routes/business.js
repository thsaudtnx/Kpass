const express = require('express');
const Business = require('../models/business');
const Sequelize = require('sequelize');

const router = express.Router();

/**
 * @swagger
 * /business/list:
 *  get:
 *    description: "GET business data with options"
 *    tags: [business]
 *    parameters:
 *      - in: query
 *        name: pageNum
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: pageSize
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: field
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: inputText
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: sortBy
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: deletedData
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
 *                ok : 
 *                  type: integer
 *                data : 
 *                  type : object
 *                  properties:
 *                    logo:
 *                      type: string
 *                    name:
 *                      type: string
 *                    type:
 *                      type: string
 *                    phone:
 *                      type: string
 *                    address:
 *                      type: string
 *                    addressdetail:
 *                      type: string
 *                    latitude:
 *                      type: number
 *                    longitude:
 *                      type: number
 *                    kpass:
 *                      type: integer
 *                    travelwallet:
 *                      type: integer
 */
router.get('/list', async (req, res, next) => {
  const {pageNum, pageSize, field, inputText, sortBy, deletedData} = req.query;
  const Op = Sequelize.Op;
  let where = {};
  let order = [];
  if (deletedData==='true'){
    where['deletedAt'] = {[Op.not]: null}
  };
  if (field!=='ALL') {
    where['type'] = field;
  }
  if (inputText) {
    where['name'] = {[Op.like]: `%${inputText}%`};
  }
  switch(sortBy){
    case 'ALL':
      order = ['id', 'ASC'];
      break;
    case 'KPASS':
      order = ['kpass', 'DESC'];
      break;
    case 'TRAVELWALLET':
      order = ['travelwallet', 'DESC'];
      break;
    default :
      order = ['id', 'ASC'];
      break;
  }
  console.log(req.query);
  console.log(where, order);
  try {
    const business = await Business.findAll({
      paranoid : deletedData==='true' ? false :  true,
      where : where,
      order : [order],
      limit : parseInt(pageSize),
      offset : parseInt(pageNum) * parseInt(pageSize),
    });
    res.send(business);
  } catch(err) {
  console.error(err);
  next(err);
 }
})


/**
 * @swagger
 *
 * /business/add:
 *  post:
 *    description: "ADD new business data"
 *    tags: [business]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              logo:
 *                type: string
 *              name:
 *                type: string
 *              type:
 *                type: string
 *              phone:
 *                type: string
 *              address:
 *                type: string
 *              latitude:
 *                type: number
 *              longitude:
 *                type: number
 *              kpass:
 *                type: integer
 *              travelwallet:
 *                type: integer
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
router.post('/add', async (req, res, next) => {
  try {
     const result = await Business.create(req.body);
      res.status(200).json({ok : 1, message : 'INSERT SUCCESS'})
    } catch(err) {
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 * /business/delete/:id:
 *   delete:
 *    description: "Delete specific business data"
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
router.delete('/delete/:id', async (req, res, next) => {
  console.log(req.params);
  try {
      const temp = await Business.findOne({
        where : {
          id : req.params.id,
        }
      });
      const result = await Business.destroy({
        paranoid : !!temp.deletedAt,
        where : {
          id : req.params.id
        }
      });
      res.status(200).json({ok : 1, message : `ID :${req.params.id} DELETED SUCCESS`});
    } catch(err) {
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 * /business/edit/:id:
 *   patch:
 *    description: "Update specific business data"
 *    tags: [business]
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
 *              logo:
 *                type: string
 *              name:
 *                type: string
 *              type:
 *                type: string
 *              phone:
 *                type: string
 *              address:
 *                type: string
 *              latitude:
 *                type: number
 *              longitude:
 *                type: number
 *              kpass:
 *                type: integer
 *              travelwallet:
 *                type: integer
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
      const result = await Business.update(req.body, {
        where : {id : req.params.id}
      });
      console.log(result.data);
      res.status(200).json({ok : 1, message : `ID ${req.params.id} UPDATED SUCCESS`});
    } catch(err) {
    console.error(err);
    next(err);
  }
});


//Using Multer to add and delete image file
const multer = require('multer');
const fs = require('fs');
const path = require('path');

try {
  fs.readdirSync('upload');
} catch (error){
  console.error('There is no upload folder so creating a upload folder');
  fs.mkdirSync('upload');
}

const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, done) {
      done(null, 'upload/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits : {fileSize : 5 * 1024 * 1024},
});
router.use('/upload', express.static('upload')); //set directory path to access the file


/**
 * @swagger
 *
 * /business/upload:
 *  post:
 *    description: "Uploda logo image using multer"
 *    tags: [business]
 *    requestBody:
 *      required: false
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: integer
 *                filepath:
 *                  type: string
 *              
 */
router.post('/upload', upload.single('file'), (req, res, next) => {
  if(req.file){
    const filePath = `http://13.215.32.109/business/upload/` + req.file.filename;
    console.log(req.file);
    res.send(filePath);
  }
});

/**
 * @swagger
 * /business/upload/:filepath:
 *   delete:
 *    description: "Delete logo image using multer"
 *    tags: [business]
 *    parameters:
 *      - in: path
 *        name: filepath
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
 *                message:
 *                  type: string
 */
router.delete('/upload/:filepath', async (req, res, next) => {
  if (fs.existsSync('upload/' + req.params.filepath)){
    try {
      fs.unlinkSync('upload/' + req.params.filepath);
      res.json({message : 'IMAGE DELETED SUCCESS'});
    } catch(error){
      console.error(error);
    }
  }
})

module.exports = router;

