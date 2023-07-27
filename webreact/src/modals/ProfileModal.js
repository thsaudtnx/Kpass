import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";
import { useCallback } from "react";
import {server} from '../lib/serverURL';
import { styled } from "styled-components";
import { useParams } from "react-router";

const modalStyle = {
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
    height: "250px",
    zIndex: "10",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "white",
    justifyContent: "center",
  }
}

const ModalWrapper = styled.div`
  div.modal-header {
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    margin-bottom : 30px;
  }

  div.modal-content-section {
    margin-bottom : 20px;
    display : flex;
    align-items : center;
    flex-direction : row;
  }

  div.modal-content-section-left {
    width : 150px;
  }

  input.modal-content-section-right {
    width : 250px;
    padding : 10px 20px;
    border : 1px solid lightGray;
    outline : none;
  }

  div.modal-buttons {
    position : relative;
    width : 100%;
    font-size : 14px;
    color : gray;
  }

  div.modal-button {
    position : absolute;
    border : 1px solid lightgray;
    color : gray;
    background : white;
    padding : 10px;
    cursor : pointer;
    &:hover {
      border : 1px solid white;
      color : white;
      background : lightGray;
    }
  }
`

const ProfileModal = ({profileModal, setProfileModal}) => {

  const params = useParams();
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
      style={modalStyle}>
      <ModalWrapper>
        <div className="modal-header">
          <div>CHANGE PASSWORD</div>
          <div 
            style={{cursor : 'pointer'}} 
            onClick={() => {
              setPassword();
              setPasswordConfirm();
              setProfileModal(false);
            }}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="content">
          <div className="modal-content-section">
            <div className="modal-content-section-left">new password</div>
            <input 
              type="password"
              className="modal-content-section-right"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">password confirm</div>
            <input 
              type="password"
              className="modal-content-section-right"
              value={passwordConfirm} 
              onChange={e => setPasswordConfirm(e.target.value)} 
            />
          </div>
        </div>

        <div className="modal-buttons">
          <div
            className="modal-button"
            style={{right : '100px'}}
            onClick={async () => {
              if (!password || !passwordConfirm){
                window.alert('There is an empty section!');
              } else if (password !== passwordConfirm){
                window.alert('Check the password confirm!');
              } else if (window.confirm('Do you want to change the password?')){
                await axios.post(`${server}/auth/changePassword`, {
                  username : params.username, 
                  password : password
                }).then(res => {
                  console.log(res.data);
                  if (res.data.ok){
                    window.alert('Password Changed Successful');
                  }
                  setProfileModal(false);
                }).catch(err => {
                  console.error(err);
                });
              }
            }}>
            CONFIRM
          </div>
          <div 
            className="modal-button"
            style={{right : '0px'}}
            onClick={() => {
              setPassword();
              setPasswordConfirm();
              setProfileModal(false);
            }}>
            CANCEL
          </div>
        </div>
      </ModalWrapper>
    </Modal>
  );
};

export default React.memo(ProfileModal);