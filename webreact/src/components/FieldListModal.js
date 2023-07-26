import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";
import { useCallback } from "react";
import {server} from '../lib/serverURL';
import { styled } from "styled-components";

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
};

const ModalWrapper = styled.div`
  .modal-header {
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    margin-bottom : 30px;
  }

`;


const FieldListModal = ({fieldListModal, setFieldListModal}) => {

  const [fieldList, setFieldList] = useState();
  
  useEffect(() => {
    if (fieldListModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[fieldListModal]);

  const onSubmit = useCallback(async() => {
    if (window.confirm('DO YOU REALLY WANT TO CHANGE THE FIELD LIST?')){
      if (passwordConfirm===password){
         await axios.post(`${server}/field`, {
           username : username, 
           password : password
         }).then(res => {
           console.log(res.data);
           if (res.data.ok){
             window.alert('Password Changed Successful');
           }
           setFieldListModal(false);
         })
       }
     }
  }, []);
  
  return (
    <Modal 
      isOpen={fieldListModal} 
      shouldCloseOnOverlayClick={false} 
      onRequestClose={() => setFieldListModal(false)} 
      ariaHideApp={false} 
      style={modalStyle}>
        <ModalWrapper>
        <div className="modal-header">
          <div style={{fontSize : '20px', }}>FIELD LIST</div>
          <div style={{cursor : 'pointer'}} 
            onClick={() => {
              setFieldListModal(false);
            }}>
            <AiOutlineClose />
          </div>
        </div>



        
        <div className="modal-content" style={{marginBottom : '20px', fontSize : '14px'}}>
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
            onClick={async () => {}}>
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
        </ModalWrapper>
    </Modal>
  );
};

export default React.memo(FieldListModal);