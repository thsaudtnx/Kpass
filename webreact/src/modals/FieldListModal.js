import React, { useEffect, useState, useMemo, useContext } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import { styled } from "styled-components";
import { onInsert, onRemove, onEdit } from "../lib/api";
import { FieldContext } from "../contexts/FieldContext";

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
    width: "450px",
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

  div.modal-header {
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    margin-bottom : 20px;
  }

  div.modal-filter {
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-bottom : 10px;
    position : sticky;
  }

  div.modal-filter > input {
    margin-right : 5px;
    padding : 10px 20px;
    border : 1px solid lightGray;
    width : 130px;
    outline : none;
  }

  div.modal-filter > div.modal-filter-button {
    padding : 7px 15px;
    border : 1px solid lightGray;
    color : gray;
    background : white;
    &:hover {
      border : 1px solid white;
      color : white;
      background : lightGray;
      cursor : pointer;
    }
  }

  div.modal-content-header {
    display : grid;
    grid-template-columns : 70px 1fr 1fr;
    border-bottom : 1px solid lightGray;
    padding : 10px;
    margin-bottom : 10px;
    font-size : 12px;
    color : gray;
  }
`;

const FieldItemWrapper = styled.div`
  display : grid;
  grid-template-columns : 70px 1fr 1fr 1fr;
  padding : 10px;
  font-size : 12px;
  color : gray;

  div.item-buttons {
    display : flex;
    flex-direction : row;
    align-items : center;
    font-size : 10px;
  }

  div.item-button {
    cursor : pointer;
    margin-left : 5px;
  }

  input {
    outline : none;
    border : 1px solid lightGray;
    padding : 5px 10px;
  }
`;


const FieldItem = ({field, onRemove, onEdit}) => {

  const [edit, setEdit] = useState(false);
  const [editedData, setEditedData] = useState(field);
  const {isUpdated, setIsUpdated} = useContext(FieldContext);
  
  return (
    <FieldItemWrapper>
      <div>{field.id}</div>
      {edit ? <input 
        type="text" 
        placeholder={editedData.english} 
        value={editedData.english} 
        onChange={e => setEditedData({...editedData, english : e.target.value})}
      /> : <div>{field.english}</div>}
      {edit ? <input 
        type="text" 
        placeholder={editedData.korean} 
        value={editedData.korean} 
        onChange={e => setEditedData({...editedData, korean : e.target.value})}
      /> : <div>{field.korean}</div>}
      <div className="item-buttons">
        <button 
          className="item-button" 
          onClick={() => {
            if (edit){
              if (editedData.english===field.english && editedData.korea===field.korean) {
                window.alert('Looks the same...');
              } else if (!editedData.korean || !editedData.english){
                window.alert('Section Empty!');
              } else if (window.confirm('Do you want to edit the field?')){
                onEdit(editedData);
                setIsUpdated(isUpdated + 1);
              }
            }
            setEdit(!edit);
          }}>
            {edit ? 'apply' : 'edit'}
        </button>
        <button 
          className="item-button" 
          style={{marginLeft : 5}}
          onClick={() => {
            if (edit){
              setEdit(false);
              setEditedData(field);
            } else {
              if (window.confirm("Do you want to delete the field?")){
                onRemove(field.id);
                setIsUpdated(isUpdated + 1);
              }
            }
          }}>
            {edit ? 'cancel' : 'delete'}
        </button>
      </div>
    </FieldItemWrapper>
  );
};


const FieldListModal = ({fieldListModal, setFieldListModal}) => {

  const {fieldList, isUpdated, setIsUpdated} = useContext(FieldContext);
  const [inputTextEnglish, setInputTextEnglish] = useState();
  const [inputTextKorean, setInputTextKorean] = useState();

  useEffect(() => {
    if (fieldListModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[fieldListModal]);
  
  return (
    <Modal 
      isOpen={fieldListModal} 
      shouldCloseOnOverlayClick={false} 
      onRequestClose={() => setFieldListModal(false)} 
      ariaHideApp={false} 
      style={modalStyle}>
        <ModalWrapper>
        <div className="modal-header">
          <div>FIELD LIST</div>
          <div style={{cursor : 'pointer'}} 
            onClick={() => {
              setFieldListModal(false);
            }}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="modal-filter">
          <input 
            type="text" 
            value={inputTextEnglish} 
            onChange={e => setInputTextEnglish(e.target.value)}
            placeholder="new field in English"
          />
          <input 
            type="text" 
            value={inputTextKorean} 
            onChange={e => setInputTextKorean(e.target.value)}
            placeholder="new field in Korean"
          />
          <div className="modal-filter-button" onClick={() => {
            if (!inputTextKorean || !inputTextEnglish){
              window.alert('Section is empty!');
            }
            else if (window.confirm('DO YOU WANT TO ADD NEW FIELD?')){
              onInsert(inputTextEnglish, inputTextKorean);
              setIsUpdated(isUpdated + 1);
              setInputTextEnglish();
              setInputTextKorean();
            }
          }}>ADD</div>
        </div>
        <div className="modal-content">
          <div className="modal-content-header">
            <div>id</div>
            <div>English</div>
            <div>Korean</div>
          </div>
          <div className="field-list-wrapper">
            {fieldList?.map(item => (
              <FieldItem 
                key={item.id}
                field={item}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            ))}
          </div>
        </div>
        </ModalWrapper>
    </Modal>
  );
};

export default React.memo(FieldListModal);