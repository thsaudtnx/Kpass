import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import AddModal from "../components/AddModal";
import { ManageContext } from "../contexts/ManageContext";

const Filter = () => {
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  const {
    setPageNum,
    field, 
    setField, 
    inputText, 
    setInputText, 
    deletedData, 
    setDeletedData, 
    sortBy, 
    setSortBy, 
    setAddModal, 
    isUpdated,
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
          onChange={e => {setField(e.target.value);setPageNum(0);setIsUpdated(isUpdated + 1);}}>
          {['ALL', 'FOOD', 'TRANSPORT', 'HEALTH', 'ETC']
            .map((element, index) => <option key={index} value={element}>{element}</option>)
          }
        </select>
        <input 
          type='text' 
          placeholder='SEARCH BY NAME'
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
          onClick={() => {setPageNum(0);setIsUpdated(isUpdated + 1);}}
          style={{
            cursor : 'pointer',
            marginRight : isMobile ? 0 : 20,
            fontSize : isMobile ? 12 : 14,
            padding : '3px',
            whiteSpace : 'nowrap',
            marginLeft : isMobile ? 10 : 0,
          }}>
          SEARCH
        </button>
        {!isMobile && <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
          <input 
            type="checkbox"
            value={deletedData}
            onChange={() => {setDeletedData(!deletedData);setPageNum(0);setIsUpdated(isUpdated + 1);}}
            style={{width : 14, height : 14}}
          />
          <div style={{fontSize : 14, color : 'gray'}}>DELETED DATA</div>
        </div>}
      </div>
      <div className="right" style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
        {isMobile && <div style={{display : 'flex', flexDirection : 'row', alignItems : 'center', marginRight : 10,}}>
          <input 
            type="checkbox"
            value={deletedData}
            onChange={() => {setDeletedData(!deletedData);setPageNum(0);setIsUpdated(isUpdated + 1);}}
            style={{width : 14, height : 14}}
          />
          <div style={{fontSize : 14, color : 'gray'}}>DELETED DATA</div>
        </div>}
        <select style={{
          padding : '10px',
          border : '1px solid lightGray',
          marginRight : '10px',
          cursor : 'pointer',}}
          value={sortBy}
          onChange={ e => {setSortBy(e.target.value);setPageNum(0);setIsUpdated(isUpdated + 1);}}>
          {['ALL', 'KPASS', 'TRAVELWALLET']
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
          ADD
        </div>
      </div>

      <AddModal />
    </div>
  );
};

export default React.memo(Filter);