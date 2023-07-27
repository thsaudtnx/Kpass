import React, { useContext, useState } from "react";
import axios from "axios";
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import { useCallback } from "react";
import {server} from '../lib/serverURL';
import { styled } from "styled-components";
import ItemDetail from "./ItemDetail";
import { ManageContext } from "../contexts/ManageContext";


const ItemWrapper = styled.div`

  div.item-header-unshow-detail {
    display : grid;
    align-items : center;
    grid-template-columns : 100px 150px 200px 200px 100px 2fr 1fr;
    transition : all 0.1s;
    background : white;
    padding : 20px;
    font-size : 12px;
    color : grey;
    &:hover {
      background : lightGray;
      color : black;
    }
  }

  div.item-header-show-detail {
    display : grid;
    align-items : center;
    grid-template-columns : 100px 150px 200px 200px 100px 2fr 1fr;
    transition : all 0.1s;
    background : lightGray;
    padding : 20px;
    font-size : 12px;
    color : black;
  }

  .item-icon {
    width : 25px; 
    height : 25px; 
    cursor : pointer;
  }

  div.item-name {
    width : 150px;
    overflow: hidden;  		// 을 사용해 영역을 감출 것
    text-overflow: ellipsis;  	// 로 ... 을 만들기 
    white-space: nowrap; 		// 아래줄로 내려가는 것을 막기위해
    word-break:break-all
  }

  div.item-type {
    width : 150px;
    overflow: hidden;  		// 을 사용해 영역을 감출 것
    text-overflow: ellipsis;  	// 로 ... 을 만들기 
    white-space: nowrap; 		// 아래줄로 내려가는 것을 막기위해
    word-break:break-all
  }
`;


const Item = ({data}) => {
  const [showDetail, setShowDetail] = useState(false);
  const {isUpdated, setIsUpdated, setPageNum} = useContext(ManageContext);

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
    <ItemWrapper>
      <div className={showDetail ? "item-header-show-detail" : "item-header-unshow-detail"}>
        <div>{data.id}</div>
        {data.logo ? <img src={data.logo} style={{width : '50px', height : '50px', objectFit : 'contain'}}></img> : <div />}
        <div className="item-name">{data.name}</div>
        <div>{data.type}</div>
        <div>{data.kpass}%</div>
        <div>{data.travelwallet}%</div>
        {!!data.deletedAt && <div style={{fontSize : '14px', color : 'darkred', padding : 10}}>DELETED</div>}
        {showDetail ? 
        <IoMdArrowDropup className="item-icon" onClick={() => setShowDetail(!showDetail)}/> : 
        <IoMdArrowDropdown className="item-icon" onClick={() => setShowDetail(!showDetail)}/>}
      </div>
      {showDetail && <ItemDetail data={data} deleteItem={deleteItem}/>}
    </ItemWrapper>
  );
};

export default React.memo(Item);