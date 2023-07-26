import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { useContext } from "react";
import { ManageContext } from "../contexts/ManageContext";
import { useCallback } from "react";
import {server} from '../lib/serverURL';
import { styled } from "styled-components";

const fieldCategory = [
  {label: 'RESTAURANT', value: 'RESTAURANT'},
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
    margin-bottom : 30px;
  }

  div.modal-content > div.modal-content-section {
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

const AddModal = () => {
  const {
    setPageNum, 
    isUpdated, 
    setIsUpdated, 
    addModal, 
    setAddModal, 
    setHasMore, 
    setData
  } = useContext(ManageContext);

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
    addressdetail : null,
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
      addressdetail : null,
      latitude : null,
      longitude : null,
      kpass : 0,
      travelwallet : 0,
  }}, []);

  const goBack = useCallback(
    async () => {
    if (!newData.logo && 
      !newData.name && 
      !newData.type && 
      !newData.phone && 
      !newData.address && 
      !newData.addressdetail && 
      !newData.kpass && 
      !newData.travelwallet
      ) setAddModal(false);
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
    if (!newData.name || !newData.type || !newData.address) {
      window.alert('THERE IS AN EMPTY SECTION');
    }
    else if (window.confirm('DO YOU WANT TO ADD?')){
      return axios.post(`${server}/business/add`, newData)
        .then(res => {
          console.log(newData);
          console.log(res.data.message);
          setPageNum(0);
          setData([]);
          setHasMore(true);
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
      style={modalStyle}>
      <ModalWrapper>
        <div className="modal-header">
          <div style={{fontSize : '20px', }}>REGISTER BUSINESS</div>
          <div style={{cursor : 'pointer'}} onClick={() => goBack()}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="modal-content" style={{marginBottom : '20px', fontSize : '14px'}}>
          <form className="logo" 
            encType='multipart/form-data'
            style={{marginBottom : '20px', display : 'flex', flexDirection : 'row', alignItems : 'center',}}
            onSubmit={e => submitLogo(e)}>
            {newData.logo ? <img src={newData.logo} style={{width : '50px', height : '50px', objectFit : 'contain', marginRight : '30px'}} /> : 
            <div style={{marginRight : '30px', width : '50px', height : '50px',}} />}
            <input type='file' name='file' style={{cursor : 'pointer'}}/>
            <button type='submit' style={{cursor : 'pointer'}}>Upload</button>
          </form>
          <div className="modal-content-section">
            <div className="modal-content-section-left">NAME</div>
            <input 
              className="modal-content-section-right"
              value={newData.name} 
              onChange={e => setNewData({...newData, name : e.target.value})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">TYPE</div>
            <select
              className="modal-content-section-right" 
              value={newData.type} 
              onChange={e => setNewData({...newData, type : e.target.value})}>
              <option value={null} defaultChecked>---</option>
              {fieldCategory.map((element, index) => <option key={index} value={element.value}>{element.label}</option>)}
            </select>
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">PHONE</div>
            <input 
              className="modal-content-section-right"
              type="text"
              maxLength={20}
              value={newData.phone} 
              onChange={e => setNewData({...newData, phone : e.target.value})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">ADDRESS</div>
            <GooglePlacesAutocomplete
              className="modal-content-section-right"
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
              value={newData.addressdetail} 
              onChange={e => setNewData({...newData, addressdetail : e.target.value})}
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">KPASS</div>
            <input 
              className="modal-content-section-right"
              type="number"
              min={0}
              max={100}
              value={newData.kpass}
              onChange={e => setNewData({...newData, kpass : parseInt(e.target.value, 10)})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">TRAVEL WALLET</div>
            <input 
              className="modal-content-section-right"
              type="number"
              min={0}
              max={100}
              value={newData.travelwallet} 
              onChange={e => setNewData({...newData, travelwallet : parseInt(e.target.value, 10)})} 
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

export default React.memo(AddModal);