import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";
import { useCallback } from "react";
import {server} from '../lib/serverURL';

const ProfileModal = ({profileModal, setProfileModal}) => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  
  useEffect(() => {
    if (profileModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[profileModal]);
  

  return (
    <Modal 
      isOpen={profileModal} 
      shouldCloseOnOverlayClick={false} 
      onRequestClose={() => setProfileModal(false)} 
      ariaHideApp={false} 
      style={{
        overlay: {
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          width: "100%",
          height: "100%",
          zIndex: "1000000",
          top: "0",
          left: "0",
        },
        content: {
          width: "350px",
          height: "450px",
          zIndex: "10",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          backgroundColor: "white",
          justifyContent: "center",
        }
      }}
    >
        <div style={{
          display : 'flex',
          flexDirection : 'row',
          justifyContent : 'space-between',
          alignItems : 'center',
          marginBottom : '30px',}}>
          <div style={{fontSize : '20px', }}>CHANGE PASSWORD</div>
          <div 
            style={{cursor : 'pointer'}} 
            onClick={() => {
              setUsername();
              setPassword();
              setPasswordConfirm();
              setProfileModal(false);
            }}>
            <AiOutlineClose />
          </div>
        </div>
        <div 
          className="content" 
          style={{marginBottom : '20px', fontSize : '14px'}}>
          <div 
            className="username" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>USERNAME</div>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              style={{
                width : '250px',
              padding : '10px 20px',
              border : '1px solid lightGray',
            }}/>
          </div>
          <div 
            className="new_password" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>NEW PASSWORD</div>
            <input 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={{
                width : '250px',
              padding : '10px 20px',
              border : '1px solid lightGray',
            }}/>
          </div>
          <div 
            className="password_confirm" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>PASSWORD CONFIRM</div>
            <input 
              value={passwordConfirm} 
              onChange={e => setPasswordConfirm(e.target.value)} 
              style={{
                width : '250px',
              padding : '10px 20px',
              border : '1px solid lightGray',
            }}/>
            {passwordConfirm!==password && <div style={{color : 'darkRed', fontSize : 12}}>please confirm your password</div>}
          </div>
        </div>
        <div className="buttons"
          style={{
          position : 'relative',
          width : '100%',
          fontSize : '14px',
          color : 'gray',}}>
          <div style={{
            position : 'absolute',
            border : '1px solid lightgray',
            right : '80px',
            bottom : '-50px',
            marginRight : '30px',
            padding : '10px',
            cursor : 'pointer',}}
            onClick={async () => {
              if (window.confirm('DO YOU REALLY WANT TO CHANGE THE PASSWORD?')){
               if (passwordConfirm===password){
                  await axios.post(`${server}/auth/changePassword`, {
                    username : username, 
                    password : password
                  }).then(res => {
                    console.log(res.data);
                    if (res.data.ok){
                      window.alert('Password Changed Successful');
                    }
                    setProfileModal(false);
                  })
                }
              }
            }}>
            CONFIRM
          </div>
          <div style={{
            position : 'absolute',
            right : '0',
            border : '1px solid lightgray',
            bottom : '-50px',
            padding : '10px',
            cursor : 'pointer',}}
            onClick={() => {
              setUsername();
              setPassword();
              setPasswordConfirm();
              setProfileModal(false);
            }}>
            CANCEL
          </div>
        </div>
    </Modal>
  );
};

export default React.memo(ProfileModal);