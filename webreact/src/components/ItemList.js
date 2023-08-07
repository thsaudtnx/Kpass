import React, { useCallback, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Item from "../components/Item";
import { styled } from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { changePageNum, deleteBusinessAsync, fetchBusinessAsync, fetchBusinessLaterAsync, restoreBusinessAsync } from "../modules/business";


const ItemListWrapper = styled.div`
  color : gray;
  .item-list-header {
    display : grid;
    grid-template-columns : 1fr 1.5fr 2fr 2fr 1fr 3fr 1fr;
    border-bottom : 1px solid lightGray;
    padding : 10px;
    margin : 10px 20px;
    font-size : 12px;

    @media (max-width : 670px) {
      margin : 0px 5px;
      font-size : 10px;
    }

    @media (max-width : 900px) {
      grid-template-columns : 1.5fr 3fr 2fr 2fr 1fr;
    }
  }
`;

const ItemList = () => {
  const isMobile = useMediaQuery({query : '(max-width : 900px)'});
  const category = isMobile ? ['Logo', 'Name', 'Kpass', 'TravelWallet'] : ['Id', 'Logo', 'Name', 'Field', 'Kpass', 'TravelWallet'];
  const {data, hasMore, pageNum, pageSize} = useSelector(state => state.business);
  const {field_id, inputText, deletedData, sortBy, search} = useSelector(state => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      dispatch(fetchBusinessAsync({
        field_id, 
        inputText, 
        deletedData, 
        sortBy, 
        pageNum, 
        pageSize
      }));
    })();
  }, [field_id, search, deletedData, sortBy, pageNum, pageSize]);
  
  return (
    <ItemListWrapper>
      <div className='item-list-header'>
        {category.map((element, index) => <div key={index}>{element}</div>)}
      </div>
      <InfiniteScroll
        className="content"
        style={{padding : 10}}
        dataLength={data.length}
        next={() => {
          if (data.length!==0) dispatch(changePageNum(pageNum + 1))
        }}
        hasMore={hasMore}
        loader={<div style={{width : '100%', padding : 20, fontSize : 14, fontWeight : 'bold', color : 'gray'}}>Loading...</div>}
        endMessage={<div style={{height : '5vh'}}/>}
      >
        {data?.map((element, index)=> (
          <Item 
            key={index} 
            data={element} 
          />
        ))}
      </InfiniteScroll>
    </ItemListWrapper>
  );
};

export default ItemList;