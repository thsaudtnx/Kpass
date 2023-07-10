const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const helmet = require('helmet');
const hpp = require('hpp');
const dotenv = require('dotenv');

dotenv.config();
const rootRouter = require('./routes');
const {sequelize} = require('./models');
const passportConfig = require('./passport');
const logger = require('./logger');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 5000);


sequelize.sync({force : false})
  .then(() => {
    console.log('sequelize 연결 성공');
  })
  .catch(error => {
    console.error(error);
  })

if (process.env.NODE_ENV==='production'){
  app.use(morgan('combine'));
  app.use(helmet({contentSecurityPolicy : false}));
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  secret : process.env.COOKIE_SECRET,
  resave : false,
  saveUninitialized : false,
  cookie : {
    credentials : true,
    httpOnly : true,
    secure : false,
    maxAge : 60 * 60 * 1000,
  },
};
if (process.env.NODE_ENV === 'production'){
  sessionOption.proxy = true;
  //sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(passport.initialize()); //req 객체에 passport 설정을 심음
app.use(passport.session()); //req.session 객체에 passport 정보 저장

app.use('/', rootRouter);

const {swaggerUi, specs} = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  logger.info('hello');
  logger.error(error.message);
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});