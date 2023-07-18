const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    session : true //세션에 저장 여부
    //passReqToCallback : false,
  }, async (username, password, done) => {
    try {
      const exUser = await User.findOne({where : {username}});
      if (exUser){
        //const result = await bcrypt.compare(password, exUser.password);
        if (password===exUser.password) {
          done(null, exUser); //user 객체 전송 또는 에러 리턴
        } else {
          done(null, false, {message : '비밀번호가 일치하지 않습니다.'});
        }
      } else {
        done(null, false, {message : '가입되지 않은 회원입니다.'});
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};

//done : verify callback
//첫번째 인자 : DB 조회시 발생하는 서버 에러. 무조선 실패하는 경우에만 사용
// 두번째 인자 : 성공했을 때 return 값
//세번째 인자 : 사용자가 임의로 실패를 만들고 싶을 때 사용 위에서 비밀번호가 틀렸다는 에러