import React from "react";
import { useContext } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Item from "../components/Item";
import { useMediaQuery } from "react-responsive";
import { ManageContext } from "../contexts/ManageContext";

const ItemList = () => {
  const {data, hasMore, getData} = useContext(ManageContext);
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  return (
    <div>
      <div className='header'
        style={{
        display : 'grid',
        gridTemplateColumns : isMobile ? '1fr 1fr 1fr 1fr 0.2fr' : '100px 150px 150px 150px 100px 100px',
        borderBottom : '1px solid lightGray',
        padding : '10px',
        margin : isMobile ? '0px' : '0px 20px',
        fontSize : '12px',}}>
        { isMobile ?
          ['LOGO', 'NAME', 'K.P', 'T.W'].map((element, index) => <div key={index}>{element}</div>)
          :
          ['ID', 'LOGO', 'NAME', 'TYPE', 'KPASS', 'TRAVELWALLET'].map((element, index) => <div key={index}>{element}</div>)
        }
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
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data?.map((element, index)=> <Item key={index} data={element}/>)}
      </InfiniteScroll>
    </div>
  );
};

export default ItemList;