import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { useCallback } from "react";
import {server} from '../lib/serverURL';
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { editBusinessAsync } from "../modules/business";

const ModalWrapper = styled.div`
  div.modal-header {
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    margin-bottom : 30px;
  }

  div.modal-content-section {
    margin-bottom : 15px;
    display : flex;
    align-items : center;
    flex-direction : row;
  }

  div.modal-content-section-left {
    width : 80px;
    margin-right : 5px;
    @media (max-width : 500px) {
      font-size : 12px;
      width : 50px;
    }
  }

  .modal-content-section-right {
    outline : none;
    width : 250px;
    padding : 10px 20px;
    border : 1px solid lightGray;
    @media (max-width : 500px) {
      width : 50vw;
      padding : 5px 10px;
    }
  }

  div.buttons {
    position : relative;
    width : 100%;
    font-size : 14px;
    color : gray;
  }

  div.buttons > div.button {
    position : absolute;
    border : 1px solid lightgray;
    bottom : -40px;
    margin-right : 30px;
    padding : 10px;
    cursor : pointer;
    &:hover {
      border : 1px solid white;
      background : lightGray;
      color : white;
    }
    @media (max-width : 500px) {
      font-size : 12px;
    }
  }

`;

const EditModal = ({editModal, setEditModal, data}) => {
  const fieldList = useSelector(state => state.field);
  const [editedData, setEditedData] = useState(data);
  const isMobile = useMediaQuery({query : '(max-width : 500px)'});
  const dispatch = useDispatch();
  const onEditBusiness = useCallback((editedData) => {
    dispatch(editBusinessAsync(editedData));
  }, [editedData]);
  
  console.log(fieldList);



  useEffect(() => {
    if (editModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[editModal]);

  const goBack = useCallback(async () => {
    if (JSON.stringify(editedData)===JSON.stringify(data)) {
      setEditModal(false);
    }
    else if (window.confirm('THE INFORMATION IS NOT SAVED. STILL WANT TO EXIT?')) {
      if (editedData.logo!==data.logo){
        const deleteResult = await axios.delete(`${editedData.logo}`);
        console.log(deleteResult.data);
      }
      setEditModal(false);
      setEditedData(data);
    }
  }, [editedData]);

  const uploadLogo = useCallback(async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    if (editedData.logo!==data.logo) {
      const deleteResult = await axios.delete(`${editedData.logo}`);
      console.log(deleteResult.data);
    } 
    const postResult = await axios.post(`${server}/business/upload`, formData);
    console.log(postResult.data);
    setEditedData({...editedData, logo : postResult.data});
  }, [editedData]);

  return (
    <Modal 
      isOpen={editModal} 
      shouldCloseOnOverlayClick={false} 
      onRequestClose={() => setEditModal(false)} 
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
          width: isMobile ? '80vw' : "450px",
          height: isMobile ? '90vh' : "600px",
          zIndex: "150",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          backgroundColor: "white",
          justifyContent: "center",
        }
      }}>
        <ModalWrapper>
          <div className="modal-header">
            <div style={{fontSize : isMobile ? '15px' : '20px', }}>UPDATE BUSINESS</div>
            <div style={{cursor : 'pointer'}} onClick={() => goBack()}>
              <AiOutlineClose style={{width : '20px', height : '20px'}}/>
            </div>
          </div>
        <div className="modal-content" style={{marginBottom : '20px', fontSize : '14px'}}>
          
          <form 
            className="logo" 
            encType='multipart/form-data'
            style={{
              marginBottom : '20px', 
              display : 'flex', 
              flexDirection : 'row', 
              alignItems : 'center'
            }}
            onSubmit={ e => uploadLogo(e)}>
            {editedData.logo ? <img src={editedData.logo} style={{width : '50px', height : '50px', objectFit : 'contain', marginRight : '30px'}} /> : 
            <div style={{marginRight : '30px', width : '50px', height : '50px',}} />}
            <input type='file' name='file' style={{cursor : 'pointer'}}/>
            <button type='submit' style={{cursor : 'pointer'}}>Upload</button>
          </form>
          
          <div className="modal-content-section">
            <div className="modal-content-section-left">NAME</div>
            <input 
              className="modal-content-section-right"
              value={editedData.name} 
              onChange={e => setEditedData({...editedData, name : e.target.value})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">FIELD</div>
            <select 
              className="modal-content-section-right"
              value={editedData.field_id} 
              onChange={e => setEditedData({...editedData, field_id : e.target.value})}>
              {fieldList?.map(f => <option key={f.id} value={f.id}>{f.english}</option>)}
            </select>
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">PHONE</div>
            <input 
              className="modal-content-section-right"
              type="text"
              maxLength={20}
              value={editedData.phone} 
              onChange={e => setEditedData({...editedData, phone : e.target.value})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">ADDRESS</div>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyCbw2mv0aLtttdNVl2hmkeZYVTo7nCHTZY"
              apiOptions={{ language: 'en', region: 'my' }}
              selectProps={{
                defaultInputValue : editedData.address,
                onChange : (place) => {
                  console.log(place.label);
                  geocodeByAddress(place.label)
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                      setEditedData({...editedData, latitude : lat, longitude : lng, address : place.label});
                      console.log('Successfully got latitude and longitude', { lat, lng });
                    });
                },  
                placeholder : 'Enter in the address',
                styles : {
                  input : (provided) => ({
                    ...provided,
                    color : "#222222",
                    minWidth : '250px',
                  }),
                  option : (provided) => ({
                    ...provided,
                    color : "#222222"
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#222222"
                  })
                }
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['my'],
                }
              }}
              onLoadFailed={(error) => (
                console.error("Could not inject Google script", error)
              )}
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">ADDRESS DETAIL</div>
            <input 
              className="modal-content-section-right"
              type="text" 
              value={editedData.addressdetail} 
              onChange={e => setEditedData({...editedData, addressdetail : e.target.value})}
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">KPASS</div>
            <input 
              className="modal-content-section-right"
              type="number"
              min={0}
              max={100}
              value={editedData.kpass}
              onChange={e => setEditedData({...editedData, kpass : parseInt(e.target.value, 10)})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">TRAVEL WALLET</div>
            <input 
              className="modal-content-section-right"
              type="number"
              min={0}
              max={100}
              value={editedData.travelwallet} 
              onChange={e => setEditedData({...editedData, travelwallet : parseInt(e.target.value, 10)})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">NOTE</div>
            <textarea 
              className="modal-content-section-right"
              max={500}
              value={editedData.note} 
              onChange={e => setEditedData({...editedData, note : e.target.value})} 
            />
          </div>
        </div>
        <div className="buttons">
          <div 
            className="button" 
            style={{right : '100px'}} 
            onClick={async () => {
              //빈칸이 있을때
              if (!editedData.name || !editedData.field_id || !editedData.address){
                window.alert('THERE IS AN EMPTY SECTION');
              } 
              // 초기 상태와 똑같을때
              else if (JSON.stringify(editedData)===JSON.stringify(data)) {
                setEditModal(false);
              }
              //무언가 바뀌었을때
              else if(window.confirm('DO YOU WANT TO EDIT?')){
                if (editedData.logo!==data.logo){ //로고가 바뀌었을때 기존 로고 삭제
                  const deleteResult = await axios.delete(`${data.logo}`);
                  console.log(deleteResult.data);
                }
                onEditBusiness(editedData);
                setEditedData(data);
                setEditModal(false);
              }
          }}>
            CONFIRM
          </div>
          <div className="button" style={{right : '0px'}} onClick={() => goBack()}>CANCEL</div>
        </div>
        </ModalWrapper>
    </Modal>
  );
};

export default EditModal;