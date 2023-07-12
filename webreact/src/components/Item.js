import React, { useState } from "react";
import EditModal from './EditModal';
import axios from "axios";
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useCallback } from "react";
import { ManageContext } from "../contexts/ManageContext";
import {server} from '../lib/serverURL';

const Item = ({data}) => {
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  const {isUpdated, setIsUpdated, setPageNum} = useContext(ManageContext);
  const [editModal, setEditModal] = useState(false);
  const [hover, setHover] = useState();
  const [showDetail, setShowDetail] = useState(false);

  const deleteItem = useCallback(async () => {
    if(window.confirm('DO YOU WANT TO DELETE?')){
      /* if (data.logo){
        const result = await axios.delete(`${data.logo}`);
        console.log(result.data);
      } */
      const deleteResult = await axios.delete(`${server}/business/delete/${data.id}`);
      console.log(deleteResult.data);
      setPageNum(0);
      setIsUpdated(isUpdated+1);
      setShowDetail(false);
    }
  }, []); 

  return(
    <>
    <div className="header"
      style={{
      display : 'grid',
      alignItems : 'center',
      gridTemplateColumns : isMobile ? '1fr 1fr 1fr 1fr 0.2fr' : '100px 150px 150px 150px 100px 150px 200px 1fr',
      transition : isMobile ? 'none' : 'all 0.1s',
      background : isMobile ? (showDetail ? 'lightGray' : 'white') : ((hover || showDetail) ? 'lightGray' : 'white') ,
      padding : isMobile ? '5px' : '20px',
      fontSize : '12px',
      color : (hover || showDetail) ? 'black' : 'grey',}}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
        {!isMobile && <div>{data.id}</div>}
        {data.logo ? <img src={data.logo} style={{width : '50px', height : '50px', objectFit : 'contain'}}></img> : <div>NO LOGO</div>}
        <div style={{
          textDecoration : (isMobile && !!!!data.deletedAt) ? 'line-through' : 'none',
        }}>{data.name}</div>
        {!isMobile && <div>{data.type}</div>}
        <div>{data.kpass}%</div>
        <div>{data.travelwallet}%</div>
        {(!isMobile && !!data.deletedAt) && <div style={{fontSize : '14px', color : 'darkred', padding : 10}}>DELETED</div>}
        {showDetail ? 
        <IoMdArrowDropup style={{width : '25px', height : '25px', cursor : 'pointer'}} onClick={() => setShowDetail(!showDetail)}/> : 
        <IoMdArrowDropdown style={{width : '25px', height : '25px', cursor : 'pointer'}} onClick={() => setShowDetail(!showDetail)}/>}
    </div>
    <EditModal editModal={editModal} setEditModal={setEditModal} data={data}/>
    {showDetail && 
      <div className="content" 
        style={{
        background : '#e3e3e3',
        padding : isMobile ? 10 : 20,
        display : 'flex',
        flexDirection : 'column',
        fontSize : isMobile ? 10 : 12,
        position : 'relative'}}>
        {isMobile && <div className="type" 
          style={{
          display : 'flex',
          flexDirection : 'row',
          alignItems : 'center',
          marginBottom : isMobile ? 10 : 15,}}>
          <div style={{
            marginRight : 20,
            borderRadius : '15px',
            background : '#f1f1f1',
            padding : isMobile ? '5px 10px' : '10px 15px',
            display : 'flex',}}>TYPE</div>
          <div>{data.type}</div>
        </div>}
        <div className="phone" 
          style={{
          display : 'flex',
          flexDirection : 'row',
          alignItems : 'center',
          marginBottom : isMobile ? 10 : 15,}}>
          <div style={{
            marginRight : 20,
            borderRadius : '15px',
            background : '#f1f1f1',
            padding : isMobile ? '5px 10px' : '10px 15px',
            display : 'flex',}}>PHONE</div>
          <div>{data.phone}</div>
        </div>
        <div className="address" 
          style={{
          display : 'flex',
          flexDirection : 'row',
          alignItems : 'center',
          marginBottom : isMobile ? 10 : 15,}}>
          <div style={{
            marginRight : 20,
            borderRadius : '15px',
            background : '#f1f1f1',
            padding : isMobile ? '5px 10px' : '10px 15px',
            whiteSpace : 'nowrap',
            display : 'flex',}}>ADDRESS</div>
          <div>{data.address}</div>
        </div>
        <div className="latitude" 
          style={{
          display : 'flex',
          flexDirection : 'row',
          alignItems : 'center',
          marginBottom : isMobile ? 10 : 15,}}>
          <div style={{
            marginRight : 20,
            borderRadius : '15px',
            background : '#f1f1f1',
            padding : isMobile ? '5px 10px' : '10px 15px',
            display : 'flex',}}>LATITUDE</div>
          <div>{data.latitude}</div>
        </div>
        <div className="longitude" 
          style={{
          display : 'flex',
          flexDirection : 'row',
          alignItems : 'center',
          marginBottom : isMobile ? 10 : 15,}}>
          <div style={{
            marginRight : 20,
            borderRadius : '15px',
            background : '#f1f1f1',
            padding : isMobile ? '5px 10px' : '10px 15px',
            display : 'flex',}}>LONGITUDE</div>
          <div>{data.longitude}</div>
        </div>
        {!data.deletedAt && 
        <div className='buttons' 
          style={{
          display : 'flex', 
          flexDirection : 'row',
          position : 'absolute',
          right : '20px',
          top : '20px',}}>
          <div style={{
            display : 'flex',
            padding : '10px',
            alignItems : 'center',
            justifyContent : 'center',
            whiteSpace : 'nowrap',
            cursor : 'pointer',
            border : '1px solid grey',
            marginRight : '10px'}}
            onClick={() => setEditModal(true)}>
            UPDATE
          </div>
          <div style={{
            display : 'flex',
            padding : '10px',
            alignItems : 'center',
            whiteSpace : 'nowrap',
            justifyContent : 'center',
            cursor : 'pointer',
            border : '1px solid grey',}}
            onClick={() => deleteItem()}>
            DELETE
          </div>
        </div>}
      </div>}
    </>
  );
};

export default React.memo(Item);