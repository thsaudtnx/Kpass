import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";
import { useCallback } from "react";
import {server} from '../lib/serverURL';

const EditModal = ({editModal, setEditModal, data}) => {
  const {isUpdated, setIsUpdated, setPageNum} = useContext(ManageContext);
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
      }}
    >
        <div
          className="header" 
          style={{
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            marginBottom : '30px',
          }}>
            <div style={{fontSize : '20px', }}>UPDATE BUSINESS</div>
            <div style={{cursor : 'pointer'}} onClick={() => goBack()}>
              <AiOutlineClose style={{width : '20px', height : '20px'}}/>
            </div>
        </div>
        <div className="content" style={{marginBottom : '20px', fontSize : '14px'}}>
          <form className="logo" encType='multipart/form-data'
            style={{marginBottom : '20px', display : 'flex', flexDirection : 'row', alignItems : 'center'}}
            onSubmit={ async e => uploadLogo(e)}>
            {!editedData.logo && !data.logo && <div style={{width : '50px', height : '50px', marginRight : '30px'}}></div>}
            {editedData.logo && <img src={editedData.logo} style={{width : '50px', height : '50px', objectFit : 'contain', marginRight : '30px'}}></img>}
            {!editedData.logo && data.logo && <img src={data.logo} style={{width : '50px', height : '50px', objectFit : 'contain', marginRight : '30px'}}></img>}
            <input type='file' name='file' style={{cursor : 'pointer'}}/>
            <button type='submit' style={{cursor : 'pointer'}}>Upload</button>
          </form>
          <div 
            className="name" 
            style={{
              marginBottom : '20px', 
              display : 'flex',
              alignItems : 'center',
              flexDirection : 'row',}}>
            <div style={{width : '80px'}}>NAME</div>
            <input 
              value={editedData.name} 
              onChange={e => setEditedData({...editedData, name : e.target.value})} 
              style={{
                padding : '10px 20px',
                border : '1px solid lightGray',}}
            />
          </div>
          <div className="type" 
            style={{
              marginBottom : '20px', 
              display : 'flex',
              alignItems : 'center',
              flexDirection : 'row',
              }}>
            <div style={{width : '80px'}}>TYPE</div>
            <select 
              value={editedData.type} 
              onChange={e => setEditedData({...editedData, type : e.target.value})} 
              style={{
              padding : '10px 20px',
              border : '1px solid lightGray',}}>
              <option value={null} defaultChecked>---</option>
              {[{label: 'RESTURANT', value: 'RESTURANT'},
                {label: 'CAFE/BAKERY', value: 'CAFE/BAKERY'},
                {label: 'MART/TRANSPORT', value: 'MART/TRANSPORT'},
                {label: 'EDUCATION/CONSULTING', value: 'EDUCATION/CONSULTING'},
                {label: 'HEALTH/HOSPITAL', value: 'HEALTH/HOSPITAL'},
                {label: 'TRAVEL/FACILITY', value: 'TRAVEL/FACILITY'},
                {label: 'HAIR SALON', value: 'HAIR SALON'},
                {label: 'FITNESS', value: 'FITNESS'},
                {label: 'FASHION/SPORT', value: 'FASHION/SPORT'},
                {label: 'ETC', value: 'ETC', },].map((element, index) => <option key={index} value={element.value}>{element.label}</option>)}
            </select>
          </div>
          <div className="phone" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>PHONE</div>
            <input 
              type="text"
              maxLength={20}
              value={editedData.phone} 
              onChange={e => setEditedData({...editedData, phone : e.target.value})} 
              style={{
              padding : '10px 20px',
              border : '1px solid lightGray',}}/>
          </div>
          <div className="address" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>ADDRESS</div>
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
                    color : "#222222"
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
          <div className="kpass" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>KPASS</div>
            <input 
              type="number"
              min={0}
              max={100}
              value={editedData.kpass}
              onChange={e => setEditedData({...editedData, kpass : parseInt(e.target.value, 10)})} 
              style={{
              padding : '10px 20px',
              border : '1px solid lightGray',}}/>
          </div>
          <div className="travelwallet" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>TRAVEL WALLET</div>
            <input 
              type="number"
              min={0}
              max={100}
              value={editedData.travelwallet} 
              onChange={e => setEditedData({...editedData, travelwallet : parseInt(e.target.value, 10)})} 
              style={{
              padding : '10px 20px',
              border : '1px solid lightGray',
            }}/>
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
            onClick={() => submitAll()}>
            CONFIRM
          </div>
          <div style={{
            position : 'absolute',
            right : '0',
            border : '1px solid lightgray',
            bottom : '-50px',
            padding : '10px',
            cursor : 'pointer',}}
            onClick={() => goBack()}>
            CANCEL
          </div>
        </div>
      
    </Modal>
  );
};

export default EditModal;