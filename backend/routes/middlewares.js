//로그인을 꼭 해야되는 페이지와, 하지 않아도 되는 페이지 구분하는 미들웨어 작성
//req.isAuthenticated 함수를 아용하여 요청에 인증여부 확인

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    console.log('로그인 한 상태')
    next();
  } else {
    res.status(200).res.send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()){
    console.log('로그인 하지 않은 상태');
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.json({message : '이미 로그인한 상태입니다.'});
  }
};


