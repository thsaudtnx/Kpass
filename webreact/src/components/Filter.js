import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import AddModal from "../components/AddModal";
import { ManageContext } from "../contexts/ManageContext";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { changeField, changeInput, changeSortBy, checkDelete, setIsUpdated } from "../modules/filter";

const Filter = () => {
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  const {
    field, 
    setField, 
    inputText, 
    setInputText, 
    deletedData, 
    setDeletedData, 
    sortBy, 
    setSortBy, 
    setAddModal, 
    setIsUpdated,
  } = useContext(ManageContext);

  return (
    <div style={{
      position : 'sticky',
      background : 'white',
      top : '0px',
      display : 'flex',
      flexDirection : isMobile ? 'column' : 'row',
      justifyContent : 'space-between',
      padding : isMobile ? '10px' : '20px'}}>
      <div className='left'
        style={{
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : isMobile ? '10px' : '0px'}}>
        <select style={{
          padding : '10px',
          border : '1px solid lightGray',
          cursor : 'pointer',
          width : isMobile ? '100px' : '150px',}}
          value={field}
          onChange={e => {setField(e.target.value);setIsUpdated(true);}}>
          {['전체', '요식업', '유통', '미용', '공공기관', '기타']
            .map((element, index) => <option key={index} value={element}>{element}</option>)
          }
        </select>
        <input 
          type='text' 
          placeholder='업체명으로 검색해주세요.'
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          style={{
            padding : isMobile ? '10px' : '10px 20px',
            width : isMobile ? '150px' : '200px',
            border : '1px solid lightGray',
            marginLeft : '10px',
            cursor : 'pointer',
            marginRight : isMobile ? '0px' : '10px',
          }}
        />
        <button
          onClick={() => setIsUpdated(true)}
          style={{
            cursor : 'pointer',
            marginRight : isMobile ? 0 : 20,
            fontSize : isMobile ? 12 : 14,
            padding : '3px',
            whiteSpace : 'nowrap',
            marginLeft : isMobile ? 10 : 0,
          }}>
          검색
        </button>
        {!isMobile && <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
          <input 
            type="checkbox"
            value={deletedData}
            onChange={() => {setDeletedData(!deletedData);setIsUpdated(true);}}
            style={{width : 14, height : 14}}
          />
          <div style={{fontSize : 14, color : 'gray'}}>삭제된 항목</div>
        </div>}
      </div>
      <div className="right" style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
        {isMobile && <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center', marginRight : 10,}}>
          <input 
            type="checkbox"
            value={deletedData}
            onChange={() => {setDeletedData(!deletedData);setIsUpdated(true);}}
            style={{width : 14, height : 14}}
          />
          <div style={{fontSize : 14, color : 'gray'}}>삭제된 항목</div>
        </div>}
        <select style={{
          padding : '10px',
          border : '1px solid lightGray',
          marginRight : '10px',
          cursor : 'pointer',}}
          value={sortBy}
          onChange={ e => {setSortBy(e.target.value);setIsUpdated(true)}}>
          {['전체', 'kpass 순', 'travelwallet 순']
            .map((element, index) => <option key={index} value={element}>{element}</option>)
          }
        </select>
        <div style={{
          display : 'flex',
          padding : '10px',
          alignItems : 'center',
          justifyContent : 'center',
          border : '1px solid lightGray',
          fontSize : '12px',
          cursor : 'pointer',
          marginRight : isMobile ? '0px' : '50px'}}
          onClick={() => setAddModal(true)}>
          추가하기
        </div>
      </div>

      <AddModal />
    </div>
  );
};

export default React.memo(Filter);