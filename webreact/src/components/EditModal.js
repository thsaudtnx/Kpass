import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import { useMemo } from "react";
import { ManageContext } from "../contexts/ManageContext";
import { useCallback } from "react";

const EditModal = ({editModal, setEditModal, data}) => {
  const {server} = useContext(LogContext);
  const {setIsUpdated} = useContext(ManageContext);
  const initData = useMemo(() => {
    return {
      logo : null,
      name : data.name,
      type : data.type,
      phone : data.phone,
      address : data.address,
      latitude : data.latitude,
      longitude : data.longitude,
      kpass : data.kpass,
      travelwallet : data.travelwallet,
    }
  }, [data]);
  const [editedData, setEditedData] = useState({...data, logo : null});
  useEffect(() => {
    // 모달 시 백그라운드 스크롤 불가
    if (editModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[editModal]);

  const goBack = useCallback(async () => {
    if (editedData===initData) setEditModal(false);
    else if (window.confirm('해당 내용은 저장되지 않습니다. 그래도 나가시겠습니까?')) {
      if (editedData.logo){
        const deleteResult = await axios.delete(`${editedData.logo}`);
        console.log(deleteResult.data);
      }
      setEditModal(false);
      setEditedData(initData);
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
    if (!editedData.name || !editedData.type || !editedData.phone || !editedData.address || !editedData.kpass || !editedData.travelwallet){
      window.alert('빈 칸이 있습니다.');
    } 
    // 초기 상태와 똑같을때
    else if (editedData===data) setEditModal(false);
    //무언가 바뀌었을때
    else if(window.confirm('정말로 수정하시겠습니까?')){
      //로고가 바뀌었을때 기존 로고 삭제
      if (editedData.logo){
        const deleteResult = await axios.delete(`${data.logo}`);
        console.log(deleteResult.data);
        setEditedData({...editedData, logo : data.logo});
        const result =  await axios.patch(`${server}/business/edit/${data.id}`, editedData);
        console.log(result.data);
      }
      //로고는 바뀌지 않았을때
      else {
        const result =  await axios.patch(`${server}/business/edit/${data.id}`, {...editedData, logo : data.logo});
        console.log(result.data);
      }
      setIsUpdated(true);
      setEditedData(initData);
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
            <div style={{fontSize : '20px', }}>업체 정보 수정</div>
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
            <button type='submit' style={{cursor : 'pointer'}}>업로드</button>
          </form>
          <div 
            className="name" 
            style={{
              marginBottom : '20px', 
              display : 'flex',
              alignItems : 'center',
              flexDirection : 'row',}}>
            <div style={{width : '80px'}}>업체명</div>
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
            <div style={{width : '80px'}}>업종</div>
            <select 
              value={editedData.type} 
              onChange={e => setEditedData({...editedData, type : e.target.value})} 
              style={{
              padding : '10px 20px',
              border : '1px solid lightGray',}}>
              <option value={null} defaultChecked>---</option>
              {['food', 'finance', 'health'].map((element, index) => <option key={index} value={element}>{element}</option>)}
            </select>
          </div>
          <div className="phone" 
            style={{
            marginBottom : '20px', 
            display : 'flex',
            alignItems : 'center',
            flexDirection : 'row',}}>
            <div style={{width : '80px'}}>휴대전화</div>
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
            <div style={{width : '80px'}}>주소</div>
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
            수정하기
          </div>
          <div style={{
            position : 'absolute',
            right : '0',
            border : '1px solid lightgray',
            bottom : '-50px',
            padding : '10px',
            cursor : 'pointer',}}
            onClick={() => goBack()}>
            취소하기
          </div>
        </div>
      
    </Modal>
  );
};

export default React.memo(EditModal);