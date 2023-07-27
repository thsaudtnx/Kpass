import React, { useCallback } from "react";
import { useContext } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Item from "../components/Item";
import { ManageContext } from "../contexts/ManageContext";
import { styled } from "styled-components";
import axios from "axios";
import { server } from "../lib/serverURL";


const ItemListWrapper = styled.div`
  color : gray;

  .item-list-header {
    display : grid;
    grid-template-columns : 100px 150px 200px 200px 100px 100px;
    border-bottom : 1px solid lightGray;
    padding : 10px;
    margin : 0px 20px;
    font-size : 12px;
  }
`;

const category = ['ID', 'LOGO', 'NAME', 'TYPE', 'KPASS', 'TRAVELWALLET'];

const ItemList = () => {
  const {
    data, 
    hasMore, 
    getData,
    setPageNum,
    isUpdated,
    setIsUpdated,
    setShowDetail,
  } = useContext(ManageContext);

  const deleteItem = useCallback(async (data) => {
    if(window.confirm('DO YOU WANT TO DELETE?')){
      if (data.logo && data.deletedAt){
        const result = await axios.delete(`${data.logo}`);
        console.log(result.data);
      }
      const deleteResult = await axios.delete(`${server}/business/delete/${data.id}`);
      console.log(deleteResult.data);
      setPageNum(0);
      setIsUpdated(isUpdated+1);
      setShowDetail(false);
    }
  }, []); 

  const restoreItem = useCallback(async (data) => {
    if(window.confirm('Do you want to Restore?')){
      const restoreResult = await axios.put(`${server}/business/restore/${data.id}`);
      console.log(restoreResult.data);
      setPageNum(0);
      setIsUpdated(isUpdated+1);
      setShowDetail(false);
    }
  }, []); 

  return (
    <ItemListWrapper>
      <div className='item-list-header'>
        {category.map((element, index) => <div key={index}>{element}</div>)}
      </div>

      <InfiniteScroll
        className="content"
        style={{padding : 10}}
        dataLength={() => {return data.length}}
        next={() => getData()}
        hasMore={hasMore}
        loader={<div style={{width : '100%', padding : 20, fontSize : 14, fontWeight : 'bold', color : 'gray'}}>Loading...</div>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>NO MORE DATA</b>
          </p>
        }
      >
        {data?.map((element, index)=> (
          <Item 
            key={index} 
            data={element} 
            deleteItem={deleteItem}
            restoreItem={restoreItem}
          />
        ))}
      </InfiniteScroll>
    </ItemListWrapper>
  );
};

export default ItemList;