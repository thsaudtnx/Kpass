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
          ['로고', '업체명', 'K.P', 'T.W'].map((element, index) => <div key={index}>{element}</div>)
          :
          ['id', '로고', '업체명', '업종', 'KPASS', 'TRAVELWALLET'].map((element, index) => <div key={index}>{element}</div>)
        }
      </div>
      <InfiniteScroll
        className="content"
        style={{padding : 10}}
        dataLength={data?.length || 0}
        next={() => getData()}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={
          <div style={{textAlign : 'center', paddingTop : '20px', fontSize : '14px', color : 'gray', fontWeight : 'bold'}}>
            <div>더 이상 데이터가 없습니다.</div>
          </div>
        }>
        {data?.map((element, index)=> <Item key={index} data={element}/>)}
      </InfiniteScroll>
    </div>
  );
};

export default React.memo(ItemList);