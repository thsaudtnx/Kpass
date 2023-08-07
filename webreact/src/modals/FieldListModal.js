import React, { useEffect, useState, useMemo, useContext, useCallback } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteFieldAsync, editFieldAsync, insertFieldAsync } from "../modules/field";
import { useMediaQuery } from "react-responsive";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';


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
    position : sticky;
    @media (max-width : 300px) {
      flex-direction : column;
      align-items : flex-start;
    }
  }

  div.modal-filter > input {
    margin-bottom : 5px;
    margin-right : 5px;
    padding : 10px 20px;
    border : 1px solid lightGray;
    width : 130px;
    outline : none;
    @media (max-width: 500px) and (min-width: 300px) {
      width : 25vw;
      padding : 5px 10px;
    }
    @media (max-width : 300px) {
      padding : 5px 10px;
    }
  }

  div.modal-filter > div.modal-filter-button {
    margin-bottom : 5px;
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
    @media (max-width : 500px) {
      padding : 3px 10px;
    }
  }

  div.modal-content-header {
    display : grid;
    grid-template-columns : 30px 2fr 2fr 1fr;
    border-bottom : 1px solid lightGray;
    padding : 10px;
    margin-bottom : 10px;
    font-size : 12px;
    color : gray;
  }
`;

const FieldItemWrapper = styled.div`
  display : grid;
  grid-template-columns : 30px 2fr 2fr 1fr;
  padding : 10px;
  font-size : 12px;
  color : gray;

  div.item-words {
    margin-left : 5px;
    margin-right : 5px;
    overflow: hidden;  		// 을 사용해 영역을 감출 것
    text-overflow: ellipsis;  	// 로 ... 을 만들기 
    white-space: nowrap; 		// 아래줄로 내려가는 것을 막기위해
    word-break:break-all
  }

  div.item-buttons {
    display : flex;
    flex-direction : row;
    align-items : center;
    font-size : 10px;
  }

  div.item-button {
    display : flex;
    flex-direction : row;
    align-items : center;
    cursor : pointer;
    padding : 5px;
  }

  input {
    outline : none;
    max-width : 120px;
    border : 1px solid lightGray;
    padding : 5px 10px;
    font-size : 12px;
    @media (max-width : 500px) {
      width : 60%;
      min-width : 30px;
    }
  }
`;


const FieldItem = ({field, onDelete, onEdit}) => {

  const [edit, setEdit] = useState(false);
  const [editedData, setEditedData] = useState(field);
  
  return (
    <FieldItemWrapper>
      <div>{field.id}</div>
      <input 
        type="text" 
        disabled={!edit}
        placeholder={editedData.english} 
        value={editedData.english} 
        onChange={e => setEditedData({...editedData, english : e.target.value})}
      />
      <input 
        type="text" 
        disabled={!edit}
        placeholder={editedData.korean} 
        value={editedData.korean} 
        onChange={e => setEditedData({...editedData, korean : e.target.value})}
      />
      {edit ? 
      <div className="item-buttons">
        <button className="item-button" onClick={() => {
          if (editedData.english===field.english && editedData.korean===field.korean) {
            //아무것도 안함...
          } else if (!editedData.korean || !editedData.english){
            window.alert('Section Empty!');
          } else if (window.confirm('Do you want to edit the field?')){
            onEdit(editedData);
          }
          setEdit(!edit);}}>Apply</button>
        <button className="item-button" onClick={() => {
            setEdit(false);
            setEditedData(field);
          }}>
          Cancel
        </button>
      </div> : <div className="item-buttons">
        <div className="item-button" onClick={() => setEdit(true)}>
          <AiFillEdit style={{width : 12, height : 12, marginRight : 3}}/><div>Edit</div>
        </div>
        <div className="item-button" onClick={() => {
            if (window.confirm("Do you want to delete the field?")){
              onDelete(field.id);
            }
          }}>
          <AiFillDelete style={{width : 12, height : 12, marginRight : 3}}/><div>Delete</div>
        </div>
      </div>}
    </FieldItemWrapper>
  );
};


const FieldListModal = ({fieldListModal, setFieldListModal}) => {

  const isMobile = useMediaQuery({query : '(max-width : 500px)'});
  const fieldList = useSelector(state => state.field);
  const dispatch = useDispatch();
  const onInsert = useCallback((newData) => dispatch(insertFieldAsync(newData)), []);
  const onDelete = useCallback((id) => dispatch(deleteFieldAsync(id)), []);
  const onEdit = useCallback((editedData) => dispatch(editFieldAsync(editedData)), []);

  const [inputTextEnglish, setInputTextEnglish] = useState("");
  const [inputTextKorean, setInputTextKorean] = useState("");

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
          width: isMobile ? '80vw' : "500px",
          height: isMobile ? '80vh' : "600px",
          zIndex: "10",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "3px",
          backgroundColor: "white",
          justifyContent: "center",
        }
      }}>
        <ModalWrapper>
        <div className="modal-header">
          <div>EDIT FIELD</div>
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
              onInsert({
                english : inputTextEnglish, 
                korean : inputTextKorean
              });
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
                onDelete={onDelete}
                setFieldListModal={setFieldListModal}
              />
            ))}
          </div>
        </div>
        </ModalWrapper>
    </Modal>
  );
};

export default FieldListModal;