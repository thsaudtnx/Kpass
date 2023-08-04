import React, { useCallback, useState } from "react";
import EditModal from '../modals/EditModal';
import { styled } from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { deleteBusinessAsync, restoreBusinessAsync } from "../modules/business";

const ItemDetailWrapper = styled.div`
  background : #e3e3e3;
  padding : 20px;
  display : flex;
  flex-direction : column;
  fontSize : 12px;
  position : relative;
  font-size : 12px;
  @media (max-width : 670px) {
    font-size : 10px;
    padding : 10px;
  }

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

  textarea.item-detail-section-right {
    font-size : 12px;
    color : gray;
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
    @media (max-width : 670px) {
      font-size : 10px;
      padding : 5px;
    }
  }
`;

const ItemDetail = ({data, setShowDetail}) => {
  const [editModal, setEditModal] = useState(false);
  const isMobile = useMediaQuery({query : '(max-width : 900px)'});
  const fieldList = useSelector(state => state.field);
  const dispatch = useDispatch();
  const onDeleteBusiness = useCallback((data) => {
    if (window.confirm(`Do you want to delete${data.deletedAt && ' forever'}?`)){
      dispatch(deleteBusinessAsync(data));
      setShowDetail(false);
    }
  }, [data]);
  const onRestoreBusiness = useCallback((id) => {
    if (window.confirm("Do you want to restore?")){
      dispatch(restoreBusinessAsync(id));
      setShowDetail(false);
    }
  }, [data]);

  return (
    <ItemDetailWrapper>
      {isMobile && <div className="item-detail-section">
        <div className="item-detail-section-left">TYPE</div>
        <div className="item-detail-section-right">{fieldList?.find(field => field.id===data.field_id)?.english}</div>
      </div>}
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
      <div className="item-detail-section">
        <div className="item-detail-section-left">NOTE</div>
          <textarea 
            className="item-detail-section-right"
            value={data.note}
            disabled={true}
          />
      </div>

      {data.deletedAt && <div className='item-detail-buttons'>
        <div className="item-detail-button" 
          onClick={() => onRestoreBusiness(data.id)}>
          RESTORE
        </div>
        <div className="item-detail-button" 
          onClick={() => onDeleteBusiness(data)}>
          DELETE FOREVER
        </div>
      </div>}

      {!data.deletedAt && <div className='item-detail-buttons'>
        <div className="item-detail-button" 
          onClick={() => setEditModal(true)}>
          UPDATE
        </div>
        <div 
          className="item-detail-button" 
          onClick={() => onDeleteBusiness(data)}>
          DELETE
        </div>
      </div>}
      <EditModal editModal={editModal} setEditModal={setEditModal} data={data}/>
    </ItemDetailWrapper>
  );
};

export default ItemDetail;