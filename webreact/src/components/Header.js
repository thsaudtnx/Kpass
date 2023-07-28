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

  div.header-title {
    padding : 20px;
    font-size : 20px; 
    font-weight : bold;
  }

  div.header-buttons {
    display : flex;
    flex-direction : row;
    align-items : center;
  }

  div.header-button {
    font-size : 14px;
    color : gray;
    padding : 10px;
    &:hover {
      cursor : pointer;
      font-weight : bold;
      color : black;
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
        KPASS MANAGE
      </div>
      <div className="header-buttons">
        <ExcelDownload/>
        <div className="header-button" onClick={() => setFieldListModal(true)}>
          EDIT FIELD LIST
        </div>
        <div className="header-button" onClick={() => setProfileModal(true)}>
          CHANGE PASSWORD
        </div>
        <div className="header-button" onClick={() => logout()}>
          LOGOUT
        </div>
      </div>
      <ProfileModal profileModal={profileModal} setProfileModal={setProfileModal}/>
      <FieldListModal fieldListModal={fieldListModal} setFieldListModal={setFieldListModal}/>
    </HeaderWrapper>
  );
};

export default React.memo(Header);