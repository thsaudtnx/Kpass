import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LogContext } from "../contexts/LogContext";

const LoginPage = () => {
  const {server, checkAuth} = useContext(LogContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  /* useEffect(() => {
    (async()=>{
      await axios.get(`${server}/auth/authentication`,  { withCredentials: true })
        .then(res => {
          console.log(res.data);
          if (res.data.authenticated) navigate('/manage');
        })
        .catch(err => {
          console.log(err);
        })
    })()
  }, []); */

  return (
    <div style={{background : '#e1e1e1', width : '100vw', height : '100vh'}}>
      <div style={{background : '#e1e1e1', width : '100vw', height : '15vh'}}/>
      <div className="screen"
        style={{
        width : '300px',
        height : '400px',
        margin : 'auto',
        background : 'white',
        border : '1px solid lightGray',
        borderRadius : '10px',
        padding : '30px',
        alignItems : 'center',
        display : 'flex',
        flexDirection : 'column'}}>
        <div style={{fontSize : '20px', fontWeight : 'bold', marginBottom : '80px'}}>관리자 로그인</div>
        <div className="local" 
          style={{display : 'flex', flexDirection : 'column'}}>
          <input 
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width : '250px',
              padding : '10px',
              border : '1px solid lightGray',
              marginBottom : '20px',
            }}
          />
          <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width : '250px',
              padding : '10px',
              border : '1px solid lightGray',
              marginBottom : '50px',
            }}
          />
          <div style={{
            border : 'none',
            borderRadius : '10px',
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'center',
            alignItems : 'center',
            background : '#e3e3e3',
            fontSize : '14px',
            fontWeight : 'bold',
            color : 'white',
            width : '270px',
            height : '40px',
            textAlign : 'center',
            cursor : 'pointer',
            marginBottom : '15px',}}
            onClick={async () => {
              if (username && password){
                const result = await axios.post(`${server}/auth/login`, {
                  username : username,
                  password : password,
                }, { withCredentials: true});
                if (result.data.login){
                  console.log(result.data);
                  window.alert('로그인 성공');
                  navigate('/manage');
                } else {
                  window.alert('가입된 회원정보가 없습니다.');
                }
              } else window.alert('빈 칸이 있습니다!');
            }}>
            로그인
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;