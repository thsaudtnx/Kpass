import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import {server} from '../lib/serverURL';
import { styled } from "styled-components";
import { useParams } from "react-router";
import { useMediaQuery } from "react-responsive";

const ModalWrapper = styled.div`
  div.modal-header {
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    margin-bottom : 30px;
    @media (max-width : 400px) {
      font-size : 14px;
    }
  }

  div.modal-content-section {
    margin-bottom : 20px;
    display : flex;
    align-items : center;
    flex-direction : row;
  }

  div.modal-content-section-left {
    width : 150px;
    margin-right : 5px;
    font-size : 12px;
    @media (max-width : 400px) {
      font-size : 10px;
      width : 100px;
    }
  }

  input.modal-content-section-right {
    width : 250px;
    padding : 10px 20px;
    border : 1px solid lightGray;
    outline : none;
    @media (max-width : 400px) {
      font-size : 12px;
      width : 40vw;
      padding : 5px 15px;
    }
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
    @media (max-width : 400px) {
      padding : 5px;
      font-size : 12px;
    }
  }
`

const ProfileModal = ({profileModal, setProfileModal}) => {
  const params = useParams();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const isMobile = useMediaQuery({query : '(max-width : 400px)'});
  
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
      style={{overlay: {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: "100%",
        height: "100%",
        zIndex: "1000000",
        top: "0",
        left: "0",
      },
      content: {
        width: isMobile ? '80vw' : "350px",
        height: isMobile ? '170px' : "200px",
        zIndex: "10",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "3px",
        backgroundColor: "white",
        justifyContent: "center",
      }}}>
      <ModalWrapper>
        <div className="modal-header">
          <div>Change Password</div>
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
            <div className="modal-content-section-left">New password</div>
            <input 
              type="password"
              className="modal-content-section-right"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">Confirm Password</div>
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
            style={{right : '80px'}}
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
            Confirm
          </div>
          <div 
            className="modal-button"
            style={{right : '0px'}}
            onClick={() => {
              setPassword();
              setPasswordConfirm();
              setProfileModal(false);
            }}>
            Cancel
          </div>
        </div>
      </ModalWrapper>
    </Modal>
  );
};

export default React.memo(ProfileModal);