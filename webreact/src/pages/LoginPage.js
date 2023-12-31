import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {server} from '../lib/serverURL';
import styled from 'styled-components';
import kpassLogo from '../lib/kpass-app-button(no-bg).png';

const PageWrapper = styled.div`
  width : 100vw; 
  height : 100vh;
  background : #e9e9e9;
  display : flex;

  div.loginModal {
    width : 300px;
    height : 350px;
    margin : auto;
    background : white;
    border : 1px solid lightGray;
    border-radius : 5px;
    padding : 30px;
    @media (max-width : 350px) {
      width : 100vw;
      padding : 10px;
    }
  }

  div.header {
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    margin-bottom : 30px;
  }

  div.header > img {
    width : 100px;
    height : 100px;
    margin-top : -20px;
    margin-bottom : -5px;
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
    border-radius : 3px;
    margin-bottom : 20px;
    outline : none;
    @media (max-width : 350px) {
      width : 60vw;
    }
  }

  div.button {
    border : 1px solid lightGray;
    border-radius : 3px;
    background : white;
    font-size : 14px;
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
    @media (max-width : 350px) {
      width : 60vw;
    }
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        navigate(`/manage/${username}`);
      } else {
        window.alert('NOT REGISTERED');
      }
    } else window.alert('THERE IS AN EMPTY SECTION');
  }, [username, password, navigate]);

  return (
    <PageWrapper>
      <div className="loginModal">
        <div className="header">
          <img src={kpassLogo} alt="kpass_logo" />
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