import React, { useEffect, useState } from "react";
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import { styled } from "styled-components";
import ItemDetail from "./ItemDetail";


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

const Item = ({data, deleteItem}) => {
  const [showDetail, setShowDetail] = useState(false);

  return(
    <ItemWrapper>
      <div className={showDetail ? "item-header-show-detail" : "item-header-unshow-detail"}>
        <div>{data.id}</div>
        {data.logo ? <img src={data.logo} style={{width : '50px', height : '50px', objectFit : 'contain'}} /> : <div />}
        <div className="item-name" style={{textDecoration : data.deletedAt ? 'line-through' : 'none'}}>{data.name}</div>
        <div>{data.type}</div>
        <div>{data.kpass}%</div>
        <div>{data.travelwallet}%</div>
        {showDetail ? 
        <IoMdArrowDropup className="item-icon" onClick={() => setShowDetail(!showDetail)}/> : 
        <IoMdArrowDropdown className="item-icon" onClick={() => setShowDetail(!showDetail)}/>}
      </div>
      {showDetail && <ItemDetail data={data} deleteItem={deleteItem}/>}
    </ItemWrapper>
  );
};

export default Item;