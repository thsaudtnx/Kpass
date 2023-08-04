import React, { useEffect, useState } from "react";
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import { styled } from "styled-components";
import ItemDetail from "./ItemDetail";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";


const ItemWrapper = styled.div`

  div.item-header-unshow-detail {
    display : grid;
    align-items : center;
    grid-template-columns : 1fr 1.5fr 2fr 2fr 1fr 3fr 1fr;
    transition : all 0.1s;
    background : white;
    padding : 20px;
    font-size : 12px;
    color : grey;
    &:hover {
      background : lightGray;
      color : black;
    }
    @media (max-width : 900px) {
      grid-template-columns : 1.5fr 3fr 2fr 2fr 1fr;
      padding : 10px;
    }
    @media (max-width : 670px) {
      font-size : 10px;
    }
  }

  div.item-header-show-detail {
    display : grid;
    align-items : center;
    grid-template-columns : 1fr 1.5fr 2fr 2fr 1fr 3fr 1fr;
    transition : all 0.1s;
    background : lightGray;
    padding : 20px;
    font-size : 12px;
    color : black;
    @media (max-width : 900px) {
      grid-template-columns : 1.5fr 3fr 2fr 2fr 1fr;
      padding : 10px;
    }
    @media (max-width : 670px) {
      font-size : 10px;
    }
  }

  .item-icon {
    width : 25px; 
    height : 25px; 
    cursor : pointer;
    @media (max-width : 670px) {
      width : 15px;
      height : 15px;
    }
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
  const fieldList = useSelector(state => state.field);
  const isMobile = useMediaQuery({query : '(max-width : 900px)'});

  return(
    <ItemWrapper>
      <div className={showDetail ? "item-header-show-detail" : "item-header-unshow-detail"}>
        {!isMobile && <div>{data.id}</div>}
        {data.logo ? <img src={data.logo} style={isMobile ? {width : '25px', height : '25px', objectFit : 'contain'} : {width : '50px', height : '50px', objectFit : 'contain'}} /> : <div />}
        <div className="item-name" style={{textDecoration : data.deletedAt ? 'line-through' : 'none'}}>{data.name}</div>
        {!isMobile && <div>{fieldList?.find(field => field.id===parseInt(data.field_id, 10))?.english}</div>}
        <div>{data.kpass}%</div>
        <div>{data.travelwallet}%</div>
        {showDetail ? 
        <IoMdArrowDropup className="item-icon" onClick={() => setShowDetail(!showDetail)}/> : 
        <IoMdArrowDropdown className="item-icon" onClick={() => setShowDetail(!showDetail)}/>}
      </div>
      {showDetail && <ItemDetail 
        data={data} 
        setShowDetail={setShowDetail}
      />}
    </ItemWrapper>
  );
};

export default Item;