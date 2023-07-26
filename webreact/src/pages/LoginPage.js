import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {server} from '../lib/serverURL';
import logo from '../lib/images/oxpayment-logo.png';
import styled from 'styled-components';

const PageWrapper = styled.div`
  width : 100vw; 
  height : 100vh;
  background : #e1e1e1;
  display : flex;

  div.loginModal {
    width : 300px;
    height : 350px;
    margin : auto;
    background : white;
    border : 1px solid lightGray;
    border-radius : 5px;
    padding : 30px;
  }

  div.header {
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    margin-bottom : 30px;
  }

  div.local {
    display : flex;
    flex-direction : column;
    justify-content : center;
  }

  div.local > input {
    margin : auto;
    width : 250px;
    padding : 10px;
    border : 1px solid lightGray;
    margin-bottom : 20px;
    outline : none;
  }

  div.button {
    border : 1px solid lightGray;
    border-radius : 10px;
    background : white;
    font-size : 14px;
    font-weight : bold;
    color : lightGray;
    width : 270px;
    height : 40px;
    display : flex;
    justify-content : center;
    align-items : center;
    margin : auto;
    margin-top : 20px;
    &:hover {
      border : 2px solid white;
      color : white;
      background : lightGray;
      cursor : pointer;
    }
  }
`;


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = useCallback(async () => {
    if (username && password){
      const result = await axios.post(`${server}/auth/login`, {
        username : username,
        password : password,
      }, { withCredentials: true});
      //return navigate('/manage');
      console.log(result.data);
      if (result.data.login){
        window.alert('LOGIN SUCCESS');
        navigate('/manage');
      } else {
        window.alert('NOT REGISTERED');
      }
    } else window.alert('THERE IS AN EMPTY SECTION');
  }, [username, password, navigate]);

  return (
    <PageWrapper>
      <div className="loginModal">
        <div className="header">
          <img src={logo} alt={logo} style={{width : '100px', objectFit : 'contain', marginBottom : '10px'}}/>
          <div style={{fontSize : '20px', fontWeight : 'bold', marginLeft : '10px'}}>KPASS LOGIN</div>
        </div>
        
        <div className="local">
          <input 
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyPress={e => {
              if (e.key==='Enter'){
                onSubmit();
              }
            }}
          />
          <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => {
              if (e.key==='Enter'){
                onSubmit();
              }
            }}
          />
        </div>
        <div className="button" onClick={() => onSubmit()}>LOGIN</div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;