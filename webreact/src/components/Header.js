import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import {server} from '../lib/serverURL';
import { styled } from "styled-components";
import ProfileModal from "../modals/ProfileModal";
import FieldListModal from "../modals/FieldListModal";
import ExcelDownload from "./ExcelDownload";

const HeaderWrapper = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : space-between;
  @media (max-width : 670px) {
    flex-direction : column;
    align-items : flex-start;
    margin-bottom : 15px;
  }

  div.header-title {
    display : flex;
    flex-direction : row;
    align-items : center;
    font-size : 20px; 
    font-weight : bold;
    padding : 20px;
    @media (max-width : 670px) {
      font-size : 18px;
      padding : 10px;
    }

    @media (max-width : 300px) {
      font-size : 15px;
      padding : 10px;
    }
    
  }

  div.header-buttons {
    display : flex;
    flex-direction : row;
    align-items : center;
  }

  div.header-button {
    padding-left : 20px;
    padding-right : 20px;
    font-size : 14px;
    color : gray;
    &:hover {
      cursor : pointer;
      font-weight : bold;
      color : black;
    }
    @media (max-width : 670px) {
      font-size : 12px;
      padding-left : 10px;
      padding-right : 10px;
    }
    @media (max-width : 300px) {
      font-size : 10px;
      padding-left : 10px;
      padding-right : 10px;
    }
  }

`;
const Header = () => {
  const navigate = useNavigate();
  const [fieldListModal, setFieldListModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const logout = useCallback(
    async () => {
      if (window.confirm('ARE YOU GOING TO LOGOUT?')){
        await axios.post(`${server}/auth/logout`)
          .then(res => {
            navigate('/');
            console.log(res.data);
          })
          .catch(error => {
            console.error(error);
          })
      }
  }, [])

  return (
    <HeaderWrapper>
      <div className='header-title'>
        <div>KPASS MANAGE</div>
        <div><ExcelDownload/></div>
      </div>
      <div className="header-buttons">
        <div className="header-button" onClick={() => setFieldListModal(true)}>EDIT FIELD LIST</div>
        <div className="header-button" onClick={() => setProfileModal(true)}>CHANGE PASSWORD</div>
        <div className="header-button" onClick={() => logout()}>LOGOUT</div>
      </div>
      <ProfileModal profileModal={profileModal} setProfileModal={setProfileModal}/>
      <FieldListModal fieldListModal={fieldListModal} setFieldListModal={setFieldListModal}/>
    </HeaderWrapper>
  );
};

export default React.memo(Header);