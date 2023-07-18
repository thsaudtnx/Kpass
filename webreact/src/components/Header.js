import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import axios from 'axios';
import {server} from '../lib/serverURL';
import ProfileModal from './ProfileModal';

const Header = () => {
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  const navigate = useNavigate();
  const [profileModal, setProfileModal] = useState(false);

  return (
    <div 
      className="header"
      style={{
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between',}}>
      <div className='title' 
        style={{
        padding : isMobile ? '10px' : '20px',
        fontSize : '20px', 
        fontWeight : 'bold',}}>
        KPASS MANAGER PAGE 
      </div>
      <div className="right"
        style={{
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center'}}>
        <div style={{
          fontSize : '14px',
          color : 'gray',
          cursor : 'pointer',
          padding : '10px',}}
          onClick={() => profileModal(true)}>
          CHANGE PASSWORD
        </div>
        <div style={{
          fontSize : '14px',
          color : 'gray',
          cursor : 'pointer',
          padding : '10px',}}
          onClick={async () => {
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
          }}>
            LOGOUT
        </div>
      </div>
      <ProfileModal 
        profileModal={profileModal} 
        setProfileModal={setProfileModal} 
      />
    </div>
  );
};

export default React.memo(Header);