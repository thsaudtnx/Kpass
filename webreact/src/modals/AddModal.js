import React, { useEffect, useState, useMemo } from "react";
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';
import axios from "axios";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { useCallback } from "react";
import {server} from '../lib/serverURL';
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { insertBusinessAsync } from "../modules/business";

const ModalWrapper = styled.div`
  div.modal-header {
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    margin-bottom : 30px;
  }

  div.modal-content > div.modal-content-section {
    margin-bottom : 20px;
    display : flex;
    align-items : center;
    flex-direction : row;
    font-size : 12px;
  }

  div.modal-content-section-left {
    display : flex;
    flex-direction : row;
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

const initData = {
  logo : "",
  name : "",
  field_id : null,
  phone : "",
  address : "",
  addressdetail : "",
  latitude : null,
  longitude : null,
  kpass : 0,
  travelwallet : 0,
  note : "",
};

const AddModal = ({addModal, setAddModal}) => {
  const isMobile = useMediaQuery({query : '(max-width : 500px)'});
  const fieldList = useSelector(state => state.field);
  const {data} = useSelector(state => state.business);
  const dispatch = useDispatch();
  const onInsertBusiness = useCallback((newData) => dispatch(insertBusinessAsync(newData)));
  const [newData, setNewData] = useState(initData);

  useEffect(() => {
    if (addModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  },[addModal]);

  const goBack = useCallback(async () => {
    if (JSON.stringify(newData)===JSON.stringify(initData)) {
      setAddModal(false);
    } else if (window.confirm('Do you want to exit?')) {
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
          width: isMobile ? '80vw' : "450px",
          height: isMobile ? '90vh' : "650px",
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
          <div style={{fontSize : isMobile ? '15px' : '20px', }}>Register New Business</div>
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
            <div className="modal-content-section-left">
              <div>Name</div>
              <div style={{color : 'red', marginLeft : 3}}>*</div>
            </div>
            <input 
              className="modal-content-section-right"
              value={newData.name} 
              onChange={e => setNewData({...newData, name : e.target.value})} 
            />
          </div>

          <div className="modal-content-section">
            <div className="modal-content-section-left">
              <div>Field</div>
              <div style={{color : 'red', marginLeft : 3}}>*</div>
            </div>
            <select
              className="modal-content-section-right" 
              value={newData.field_id} 
              onChange={e => setNewData({...newData, field_id : e.target.value})}>
              <option value={null} defaultChecked>---</option>
              {fieldList?.map(f => <option key={f.id} value={f.id}>{f.english}</option>)}
            </select>
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">Phone</div>
            <input 
              className="modal-content-section-right"
              type="text"
              maxLength={20}
              value={newData.phone} 
              onChange={e => setNewData({...newData, phone : e.target.value})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">
              <div>Address</div>
              <div style={{color : 'red', marginLeft : 3}}>*</div>
            </div>
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
            <div className="modal-content-section-left">Address Details</div>
            <input 
              className="modal-content-section-right"
              type="text" 
              value={newData.addressdetail} 
              onChange={e => setNewData({...newData, addressdetail : e.target.value})}
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">Kpass</div>
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
            <div className="modal-content-section-left">Travel Wallet</div>
            <input 
              className="modal-content-section-right"
              type="number"
              min={0}
              max={100}
              value={newData.travelwallet} 
              onChange={e => setNewData({...newData, travelwallet : parseInt(e.target.value, 10)})} 
            />
          </div>
          <div className="modal-content-section">
            <div className="modal-content-section-left">Note</div>
            <textarea 
              className="modal-content-section-right"
              max={250}
              value={newData.note} 
              onChange={e => setNewData({...newData, note : e.target.value})} 
            />
          </div>
        </div>
        <div className="buttons">
          <div className="button" style={{right : '80px'}} onClick={() => {
            if (!newData.name || !newData.field_id || !newData.address) {
              window.alert('There is an empty section!');
            }
            else if (data?.map(d => d.name).includes(newData.name)){
              window.alert('Already same name exist!');
            }
            else if (window.confirm('DO YOU WANT TO ADD?')){
              onInsertBusiness(newData);
              setNewData(initData);
              setAddModal(false);
            }
          }}>Confirm</div>
          <div className="button" style={{right : '0px'}} onClick={() => goBack()}>Cancel</div>
        </div>
      </ModalWrapper>
    </Modal>
  );
};

export default React.memo(AddModal);