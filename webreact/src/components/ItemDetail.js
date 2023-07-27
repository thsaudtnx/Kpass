import React, { useState } from "react";
import EditModal from '../modals/EditModal';
import { styled } from "styled-components";

const ItemDetailWrapper = styled.div`
  background : #e3e3e3;
  padding : 20px;
  display : flex;
  flex-direction : column;
  fontSize : 12px;
  position : relative;
  font-size : 12px;

  div.item-detail-section {
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-bottom : 15px;
  }
  div.item-detail-section-left {
    margin-right : 20px;
    border-radius : 15px;
    background : #f1f1f1;
    padding : 5px 10px;
    display : flex;
    white-space : nowrap;
  }

  div.item-detail-buttons {
    display : flex; 
    flex-direction : row;
    position : absolute;
    right : 20px;
    top : 20px;
  }

  div.item-detail-button {
    display : flex;
    padding : 10px;
    align-items : center;
    justify-content : center;
    white-space : nowrap;
    cursor : pointer;
    border : 1px solid gray;
    color : gray;
    margin-right : 10px;
    &:hover{
      background : gray;
      color : white;
    }
  }
`;

const ItemDetail = ({data, deleteItem, restoreItem}) => {
  const [editModal, setEditModal] = useState(false);

  return (
    <ItemDetailWrapper>
      <div className="item-detail-section">
        <div className="item-detail-section-left">PHONE</div>
        <div className="item-detail-section-right">{data.phone}</div>
      </div>
      <div className="item-detail-section">
        <div className="item-detail-section-left">ADDRESS</div>
        <div className="item-detail-section-right">{data.address}</div>
      </div>
      <div className="item-detail-section">
        <div className="item-detail-section-left">ADDRESS DETAIL</div>
        <div className="item-detail-section-right">{data.addressdetail}</div>
      </div>
      <div className="item-detail-section">
        <div className="item-detail-section-left">LATITUDE</div>
        <div className="item-detail-section-right">{data.latitude}</div>
      </div>
      <div className="item-detail-section">
        <div className="item-detail-section-left">LONGITUDE</div>
        <div className="item-detail-section-right">{data.longitude}</div>
      </div>

      {data.deletedAt && <div className='item-detail-buttons'>
        <div 
          className="item-detail-button" 
          onClick={() => restoreItem(data)}>
          RESTORE
        </div>
        <div className="item-detail-button" onClick={() => deleteItem(data)}>
          DELETE FOREVER
        </div>
      </div>}

      {!data.deletedAt && <div className='item-detail-buttons'>
        <div 
          className="item-detail-button" 
          onClick={() => setEditModal(true)}>
          UPDATE
        </div>
        <div className="item-detail-button" onClick={() => deleteItem(data)}>
          DELETE
        </div>
      </div>}

      <EditModal editModal={editModal} setEditModal={setEditModal} data={data}/>
    </ItemDetailWrapper>
  );
};

export default ItemDetail;