const express = require('express');
const Business = require('../models/business');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

/**
 * @swagger
 * /business:
 *  get:
 *    description: "GET All business data for excel download"
 *    tags: [business]
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
 */
router.get('/', async (req, res, next) => {
  try {
    const business = await Business.findAll();
    res.send({ok : 1, data : business});
  } catch(err) {
    console.error(err);
    next(err);
  }
});

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
 *                    field_id:
 *                      type: number
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
  const {
    pageNum, 
    pageSize, 
    field_id, 
    inputText, 
    sortBy, 
    deletedData
  } = req.query;

  let where = {};
  let order = [];
  if (deletedData==='true'){
    where['deletedAt'] = {[Op.not]: null}
  };
  if (field_id!=='0') {
    where['field_id'] = field_id;
  }
  if (inputText) {
    where['name'] = {[Op.like]: `%${inputText}%`};
  }

  switch(sortBy){
    case '0': //ALL
      order = ['id', 'ASC'];
      break;
    case '1': //KPASS
      order = ['kpass', 'DESC'];
      break;
    case '2': //TRAVELWALLET
      order = ['travelwallet', 'DESC'];
      break;
    default :
      order = ['id', 'ASC'];
      break;
  }
  
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
 *              field_id:
 *                type: number
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
 *                data : 
 *                  type: integer
 *                
 */
router.post('/add', async (req, res, next) => {
  try {
     const result = await Business.create(req.body);
      res.status(200).json({ok : 1, message : 'INSERT SUCCESS', id : result.id});
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
      const data = await Business.findOne({
        paranoid : false,
        where : {
          id : req.params.id,
        }
      });
      const result = await Business.destroy({
        where : {
          id : req.params.id
        },
        force : !!data.deletedAt
      });
      res.status(200).json({ok : 1, message : `ID :${req.params.id} DELETED SUCCESS`});
    } catch(err) {
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 * /business/restore/:id:
 *   put:
 *    description: "Restore business data"
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
router.put('/restore/:id', async (req, res, next) => {
  console.log(req.params);
  try {
    const result = await Business.restore({
      where: {
        id : req.params.id,
      }
    });
      res.status(200).json({ok : 1, message : `ID :${req.params.id} restore sucess`});
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
 *              field_id:
 *                type: number
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
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { server } = require('../serverURL');

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
  try {
    sharp(req.file.path)  // 압축할 이미지 경로
      .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
      .withMetadata()	// 이미지의 exif데이터 유지
      .toBuffer((err, buffer) => {
        if (err) throw err;
        // 압축된 파일 새로 저장(덮어씌우기)
        fs.writeFile(req.file.path, buffer, (err) => {
          if (err) throw err;
        });
      });
  } catch (err) {
    console.log(err);
  }

  if(req.file){
    const filePath = `${server}/business/upload/` + req.file.filename;
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

