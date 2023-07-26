import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
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
    width: "450px",
    height: "550px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "white",
    justifyContent: "center",
  }
};

const fieldList = [
  {label: 'RESTURANT', value: 'RESTURANT'},
  {label: 'CAFE/BAKERY', value: 'CAFE/BAKERY'},
  {label: 'MART/TRANSPORT', value: 'MART/TRANSPORT'},
  {label: 'EDUCATION/CONSULTING', value: 'EDUCATION/CONSULTING'},
  {label: 'HEALTH/HOSPITAL', value: 'HEALTH/HOSPITAL'},
  {label: 'TRAVEL/FACILITY', value: 'TRAVEL/FACILITY'},
  {label: 'HAIR SALON', value: 'HAIR SALON'},
  {label: 'FITNESS', value: 'FITNESS'},
  {label: 'FASHION/SPORT', value: 'FASHION/SPORT'},
  {label: 'ETC', value: 'ETC', },
]

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
  }

  .modal-content-section-right {
    outline : none;
    width : 250px;
    padding : 10px 20px;
    border : 1px solid lightGray;
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
    bottom : -50px;
    margin-right : 30px;
    padding : 10px;
    cursor : pointer;
    &:hover {
      border : 1px solid white;
      background : lightGray;
      color : white;
    }
  }

`;

const EditModal = ({editModal, setEditModal, data}) => {
  const {isUpdated, setIsUpdated, setPageNum, setHasMore, setData} = useContext(ManageContext);
  const [editedData, setEditedData] = useState({...data, logo : null});
  useEffect(() => {
    if (editModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[editModal]);

  const goBack = useCallback(async () => {
    if (JSON.stringify(editedData)===JSON.stringify({...data, logo : null})) setEditModal(false);
    else if (window.confirm('THE INFORMATION IS NOT SAVED. STILL WANT TO EXIT?')) {
      if (editedData.logo){
        const deleteResult = await axios.delete(`${editedData.logo}`);
        console.log(deleteResult.data);
      }
      setEditModal(false);
      setEditedData({...data, logo : null});
    }
  }, [editedData]);

  const uploadLogo = useCallback(async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    if (editedData.logo) {
      const deleteResult = await axios.delete(`${editedData.logo}`);
      console.log(deleteResult.data);
    } 
    const postResult = await axios.post(`${server}/business/upload`, formData);
    console.log(postResult.data);
    setEditedData({...editedData, logo : postResult.data});
  }, [editedData]);

  const submitAll = useCallback(async () => {
    //빈칸이 있을때
    if (!editedData.name || !editedData.type || !editedData.phone || !editedData.address){
      window.alert('THERE IS AN EMPTY SECTION');
    } 
    // 초기 상태와 똑같을때
    else if (JSON.stringify(editedData)===JSON.stringify({...data, logo : null})) setEditModal(false);
    //무언가 바뀌었을때
    else if(window.confirm('DO YOU WANT TO EDIT?')){
      if (editedData.logo){ //로고가 바뀌었을때 기존 로고 삭제
        const deleteResult = await axios.delete(`${data.logo}`);
        console.log(deleteResult.data);
      }
      let updateObject = {};
      for (const key in editedData){
        if (key==='logo') {
          if (editedData[key]!==null)updateObject[key] = editedData[key]
        }
        else if (data[key]!==editedData[key]) updateObject[key] = editedData[key];
      }
      console.log(updateObject);
      const result =  await axios.patch(`${server}/business/edit/${data.id}`, updateObject);
      console.log(result.data);
      setPageNum(0);
      setData([]);
      setHasMore(true);
      setIsUpdated(isUpdated + 1);
      setEditedData({...data, logo : null});
      setEditModal(false); 
    }
  }, [editedData]);

  return (
    <Modal 
      isOpen={editModal} 
      shouldCloseOnOverlayClick={false} 
      onRequestClose={() => setEditModal(false)} 
      ariaHideApp={false} 
      style={modalStyle}>
        <ModalWrapper>
          <div className="modal-header">
            <div style={{fontSize : '20px', }}>UPDATE BUSINESS</div>
            <div style={{cursor : 'pointer'}} onClick={() => goBack()}>
              <AiOutlineClose style={{width : '20px', height : '20px'}}/>
            </div>
          </div>
        <div className="modal-content" style={{marginBottom : '20px', fontSize : '14px'}}>
          <form className="logo" encType='multipart/form-data'
            style={{marginBottom : '20px', display : 'flex', flexDirection : 'row', alignItems : 'center'}}
            onSubmit={ async e => uploadLogo(e)}>
            {!editedData.logo && !data.logo && <div style={{width : '50px', height : '50px', marginRight : '30px'}}></div>}
            {editedData.logo && <img src={editedData.logo} style={{width : '50px', height : '50px', objectFit : 'contain', marginRight : '30px'}}></img>}
            {!editedData.logo && data.logo && <img src={data.logo} style={{width : '50px', height : '50px', objectFit : 'contain', marginRight : '30px'}}></img>}
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
            <div className="modal-content-section-left">TYPE</div>
            <select 
              className="modal-content-section-right"
              value={editedData.type} 
              onChange={e => setEditedData({...editedData, type : e.target.value})}>
              <option value={null} defaultChecked>---</option>
              {fieldList.map((element, index) => <option key={index} value={element.value}>{element.label}</option>)}
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
        </div>
        <div className="buttons">
          <div className="button" style={{right : '100px'}} onClick={() => submitAll()}>CONFIRM</div>
          <div className="button" style={{right : '0px'}} onClick={() => goBack()}>CANCEL</div>
        </div>
        </ModalWrapper>
    </Modal>
  );
};

export default EditModal;