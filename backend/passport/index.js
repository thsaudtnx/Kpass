const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

//serializeUser
//strategy에서 로그인 성공 시 호출하는 done(null, user) 함수의 두번째 인자 user를 전갈 받아 세션 req.session.passport.user에 저장
//보통 세션의 무게를 줄이시 위해, user의 id 만 세션에 저장

//deserializeUser
//서버로 들어오는 요청마다 세션정보를 실제 DB와 비교
//해당 유저 정보가 있으면 done을 통해 req.user에 저장
//serializeUser에서 done으로 넘겨주는 user가 deserializeUser의 첫번째 매개변수로 전달되기 때문에 둘의 타입은 항상 일치 필요


module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
    console.log('serializeUser');
  });

  passport.deserializeUser((id, done) => {
    User.findOne({where : {id}})
      .then(user => {
        console.log('deserializeUser');
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  });

  local();
};