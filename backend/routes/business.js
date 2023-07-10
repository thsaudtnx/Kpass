const express = require('express');
const Business = require('../models/business');
const Sequelize = require('sequelize');

const router = express.Router();

/**
 * @swagger
 * /business/list:
 *  get:
 *    summary: "업체 특정 분류로 조회"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
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
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (업체 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok : 
 *                  type: integer
 *                  description: "response 코드"
 *                data : 
 *                  type : object
 *                  description : "불러온 데이터"
 *                  properties:
 *                    logo:
 *                      type: string
 *                      description: "로고"
 *                    name:
 *                      type: string
 *                      description: "업체명"
 *                    type:
 *                      type: string
 *                      description : "업종"
 *                    phone:
 *                      type: string
 *                      description: "전화번호"
 *                    address:
 *                      type: string
 *                      description: "주소"
 *                    latitude:
 *                      type: number
 *                      description : "위도"
 *                    longitude:
 *                      type: number
 *                      description: 경도"
 *                    kpass:
 *                      type: integer
 *                      description : "kpass 할인률"
 *                    travelwallet:
 *                      type: integer
 *                      description : "travelwallet 할인률"
 */
router.get('/list', async (req, res, next) => {
  const {pageNum, pageSize, field, inputText, sortBy, deletedData} = req.query;
  console.log(req.query);
  const Op = Sequelize.Op;
  let where = {};
  let order = [];
  if (field!=='전체') where['type'] = field;
  if (inputText) where['name'] = {[Op.like]: `%${inputText}%`};
  switch(sortBy){
    case '전체':
      order = ['id', 'ASC'];
      break;
    case 'kpass 순':
      order = ['kpass', 'DESC'];
      break;
    case 'travelwallet 순':
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
 *    summary: "업체 등록"
 *    description: "신규 업체를 등록한다."
 *    tags: [business]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              logo:
 *                type: string
 *                description: "로고"
 *              name:
 *                type: string
 *                description: "업체명"
 *              type:
 *                type: string
 *                description : "업종"
 *              phone:
 *                type: string
 *                description: "전화번호"
 *              address:
 *                type: string
 *                description: "주소"
 *              latitude:
 *                type: number
 *                description : "위도"
 *              longitude:
 *                type: number
 *                description: 경도"
 *              kpass:
 *                type: integer
 *                description : "kpass 할인률"
 *              travelwallet:
 *                type: integer
 *                description : "travelwallet 할인률"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (업체 등록)
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
     const result = await Business.create({
        logo : req.body.logo,
        name : req.body.name,
        type : req.body.type,
        phone : req.body.phone,
        address : req.body.address,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        kpass : req.body.kpass,
        travelwallet : req.body.travelwallet,
      });
      res.send({message : '추가 되었습니다.'})
    } catch(err) {
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 * /business/delete/:id:
 *   delete:
 *    summary: "특정 업체 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [business]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
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
 *                  example : "1번이 삭제되었습니다."
 */
router.delete('/delete/:id', async (req, res, next) => {
  console.log(req.params);
  try {
      const result = await Business.destroy({
        where : {
          id : req.params.id
        }
      });
      res.send({message : `${req.params.id}번이 삭제되었습니다`});
    } catch(err) {
    console.error(err);
    next(err);
  }
});

/**
 * @swagger
 * /business/edit/:id:
 *   patch:
 *    summary: "특정 업체 수정"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [business]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 수정 항목
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              logo:
 *                type: string
 *                description: "로고"
 *              name:
 *                type: string
 *                description: "업체명"
 *              type:
 *                type: string
 *                description : "업종"
 *              phone:
 *                type: string
 *                description: "전화번호"
 *              address:
 *                type: string
 *                description: "주소"
 *              latitude:
 *                type: number
 *                description : "위도"
 *              longitude:
 *                type: number
 *                description: 경도"
 *              kpass:
 *                type: integer
 *                description : "kpass 할인률"
 *              travelwallet:
 *                type: integer
 *                description : "travelwallet 할인률"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.(유저 수정)
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
 *                  example : "1번이 수정되었습니다."
 */
router.patch ('/edit/:id', async (req, res, next) => {
  try {
      const result = await Business.update({
        logo : req.body.logo,
        name : req.body.name,
        type : req.body.type,
        phone : req.body.phone,
        address : req.body.address,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        kpass : req.body.kpass,
        travelwallet : req.body.travelwallet,
      }, {
        where : {id : req.params.id}
      }); 
      res.send({message : `${req.params.id}번이 수정되었습니다.`});
    } catch(err) {
    console.error(err);
    next(err);
  }
});


//여기서부터는 이미지 다루는 라우터
//이미지는 삭제, 추가, 수정 구현하기 business table과 id 동일시
const multer = require('multer');
const fs = require('fs');
const path = require('path');

try {
  fs.readdirSync('upload');
} catch (error){
  console.error('upload 폴더가 없어 upload 폴더를 생성합니다.');
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
router.use('/upload', express.static('upload')); //파일에 접근하기 디렉토리 경로 설정


/**
 * @swagger
 *
 * /business/upload:
 *  post:
 *    summary: "로고 업로드"
 *    description: "multer 이용한 로고 업로드"
 *    tags: [business]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: false
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: integer
 *                  example : 1
 *                filepath:
 *                  type: string
 *              
 */
router.post('/upload', upload.single('file'), (req, res, next) => {
  if(req.file){
    const filePath = 'http://localhost:5000/business/upload/' + req.file.filename;
    console.log(req.file);
    res.send(filePath);
  }
});


/**
 * @swagger
 * /business/upload/:filepath:
 *   delete:
 *    summary: "로고 삭제"
 *    description: "multer을 이용한 로고 삭제"
 *    tags: [business]
 *    parameters:
 *      - in: path
 *        name: filepath
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: integer
 *                  example: 1
 *                message:
 *                  type: string
 *                  example: "이미지가 삭제되었습니다"
 */
router.delete('/upload/:filepath', async (req, res, next) => {
  if (fs.existsSync('upload/' + req.params.filepath)){
    try {
      fs.unlinkSync('upload/' + req.params.filepath);
      res.json({message : '이미지가 삭제되었습니다'});
    } catch(error){
      console.error(error);
    }
  }
})

module.exports = router;

