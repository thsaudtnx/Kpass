import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";
import { useCallback } from "react";
import {server} from '../lib/serverURL';

const AddModal = () => {
  const {setPageNum, isUpdated, setIsUpdated, addModal, setAddModal} = useContext(ManageContext);
  useEffect(() => {
    if (addModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[addModal]);
  const [newData, setNewData] = useState({
    logo : null,
    name : null,
    type : null,
    phone : null,
    address : null,
    latitude : null,
    longitude : null,
    kpass : 0,
    travelwallet : 0,
  });
  const initData = useMemo(() => {
    return {
      logo : null,
      name : null,
      type : null,
      phone : null,
      address : null,
      latitude : null,
      longitude : null,
      kpass : 0,
      travelwallet : 0,
    }}, []);
  const goBack = useCallback(async () => {
    if (!newData.logo && !newData.name && !newData.type && !newData.phone && !newData.address && !newData.kpass && !newData.travelwallet) setAddModal(false);
    else if (window.confirm('THE INFORMATION IS NOT SAVED. STILL WANT TO EXIT')) {
      if (!!newData.logo){
        const result = await axios.delete(`${newData.logo}`);
        console.log(result.data);
      }
      setAddModal(false);
      setNewData(initData);
    }
  }, [newData]);

  const submitLogo = useCallback(async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    if (newData.logo) axios.delete(`${newData.logo}`)
      .then(res => {
        console.log(res.data);
      })
      .then(() => {
        axios.post(`${server}/business/upload`, formData)
          .then(res => {
            console.log(res.data);
            setNewData({...newData, logo : res.data});
          });
      })
    else axios.post(`${server}/business/upload`, formData)
      .then(res => {
        console.log(res.data);
        setNewData({...newData, logo : res.data});
      });
  }, [newData]);

  const submitAll = useCallback(() => {
    if (!newData.name || !newData.type || !newData.phone || !newData.address) {
      window.alert('THERE IS AN EMPTY SECTION');
    }
    else if (window.confirm('DO YOU WANT TO ADD?')){
      return axios.post(`${server}/business/add`, {
        logo : newData.logo,
        name : newData.name,
        type : newData.type,
        phone : newData.phone,
        address : newData.address,
        latitude : newData.latitude,
        longitude : newData.longitude,
        kpass : newData.kpass,
        travelwallet : newData.travelwallet, 
      })
        .then(res => {
          console.log(newData);
          console.log(res.data.message);
          setPageNum(0);
          setIsUpdated(isUpdated + 1);
          setNewData(initData);
          setAddModal(false);
        })
    }
  }, [newData]);


  return (
    <Modal 
      isOpen={addModal} 
      shouldCloseOnOverlayClick={false} 
      onRequestClose={() => setAddModal(false)} 
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
          <div style={{fontSize : '20px', }}>REGISTER BUSINESS</div>
          <div style={{cursor : 'pointer'}} onClick={() => goBack()}>
            <AiOutlineClose />
          </div>
        </div>
        <div 
          className="content" 
          style={{marginBottom : '20px', fontSize : '14px'}}>
          <form 
            className="logo" 
            encType='multipart/form-data'
            style={{marginBottom : '20px', display : 'flex', flexDirection : 'row', alignItems : 'center',}}
            onSubmit={e => submitLogo(e)}>
            {newData.logo ? <img src={newData.logo} style={{width : '50px', height : '50px', objectFit : 'contain', marginRight : '30px'}} /> : 
            <div style={{marginRight : '30px', width : '50px', height : '50px',}} />}
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
              value={newData.name} 
              onChange={e => setNewData({...newData, name : e.target.value})} 
              style={{
                width : '250px',
              padding : '10px 20px',
              border : '1px solid lightGray',
            }}/>
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
              value={newData.type} 
              onChange={e => setNewData({...newData, type : e.target.value})} 
              style={{
              padding : '10px 20px',
              width : '150px',
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
              value={newData.phone} 
              onChange={e => setNewData({...newData, phone : e.target.value})} 
              style={{
                width : '200px',
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
                defaultInputValue : newData.address,
                onChange : (place) => {
                  console.log(place.label);
                  geocodeByAddress(place.label)
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                      setNewData({...newData, latitude : lat, longitude : lng, address : place.label});
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
              value={newData.kpass}
              onChange={e => setNewData({...newData, kpass : parseInt(e.target.value, 10)})} 
              style={{
                width : '80px',
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
              value={newData.travelwallet} 
              onChange={e => setNewData({...newData, travelwallet : parseInt(e.target.value, 10)})} 
              style={{
                width : '80px',
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

export default React.memo(AddModal);