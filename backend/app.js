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

passportConfig();
const app = express();

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
    maxAge : 60 * 1000,
    //sameSite: 'none',
  },
};
if (process.env.NODE_ENV === 'production'){
  sessionOption.proxy = true;
  //sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use(cors({ 
  origin: ['http://13.215.32.109', 'http://localhost:3000', 'https://k-pass.mcpayment.com.my/'],
  methods: ["POST", "PUT", "GET", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  credentials: true,
}));
app.use(passport.initialize()); //req 객체에 passport 설정을 심음
app.use(passport.session()); //req.session 객체에 passport 정보 저장

app.use(express.static(path.join(__dirname, '../webreact/build'), {
  setHeaders: (res) => {
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    res.set('Cross-Origin-Embedder-Policy', 'require-corp');
  }
}));
app.use('/', rootRouter);

const {swaggerUi, specs} = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  res.redirect('/');
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});