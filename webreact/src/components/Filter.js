import React, { useCallback, useContext, useEffect, useState } from "react";
import AddModal from "../modals/AddModal";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { initBusiness } from "../modules/business";
import { setDeletedData, setFieldId, setSortBy, setInputText, setSearch } from "../modules/filter";
import {AiOutlineSearch, AiOutlineFileAdd} from 'react-icons/ai'

const FilterWrapper = styled.div`
  position : sticky;
  background : #f1f1f1;
  top : 0px;
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  padding : 10px;
  z-index : 1;
  @media (max-width : 900px) {
    flex-direction : column;
  }
  @media (max-width : 670px) {
    padding : 10px;
  }

  div.filter-left {
    display : flex;
    flex-direction : row;
    align-items : center;
  }

  div.filter-left > select {
    padding : 10px;
    border : 1px solid lightGray;
    cursor : pointer;
    width : 120px;
    outline : none;
    @media (max-width : 670px) {
      width : 20vw;
      font-size : 12px;
      padding : 5px 10px;
    }
  }

  div.filter-left > input.inputText {
    padding : 10px 20px;
    width : 200px;
    border : 1px solid lightGray;
    margin-left : 10px;
    margin-right : 10px;
    outline : none;
    @media (max-width : 670px) {
      width : 35vw;
      font-size : 12px;
      padding : 5px 10px;
    }
  }

  div.filter-left > div.button {
    padding : 6px 15px;
    border : 1px solid lightGray;
    background : white;
    color : gray;
    cursor : pointer;
    margin-right : 10px;
    font-size : 14px;
    white-space : nowrap;
    &:hover {
      background : lightGray;
      color : white;
      border : 1px solid white;
    }
    @media (max-width : 670px) {
      padding : 1px 5px;
      margin-right : 0px;
    }
  }

  div.deleted {
    display : flex;
    flex-direction : row;
    @media (max-width : 670px) {
      display : none;
    }
  }

  div.filter-left > input[type="checkbox"] {
    width : 15px;
    height : 15px;
    cursor : pointer;
    
  }

  div.filter-right {
    display : flex; 
    flex-direction : row; 
    align-items : center;
  }

  div.filter-right > select {
    padding : 10px;
    border : 1px solid lightGray;
    margin-right : 10px;
    cursor : pointer;
    @media (max-width : 670px) {
      font-size : 10px;
      padding : 5px 10px;
    }
  }

  div.filter-right > div.button {
    display : flex;
    padding : 10px;
    align-items : center;
    justify-content : center;
    border : 1px solid lightGray;
    background : white;
    font-size : 12px;
    cursor : pointer;
    &:hover {
      border : 1px solid white;
      background : lightGray;
      color : white;
    }
    @media (max-width : 670px) {
      font-size : 10px;
      padding : 5px 10px;
    }
  }
`;

const Filter = () => {
  const fieldList = useSelector(state => state.field);
  const {field_id, inputText, deletedData, sortBy, search} = useSelector(state => state.filter);
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (() => dispatch(initBusiness()))();
  }, [field_id, deletedData, sortBy, search]);

  return (
    <FilterWrapper>
      <div className='filter-left'>
        <select
          value={field_id}
          onChange={e => dispatch(setFieldId(e.target.value))}>
            <option value={0}>All</option>
          {fieldList?.map(f => <option key={f.id} value={f.id}>{f.english}</option>)}
        </select>
        <input 
          className="inputText"
          type='text' 
          placeholder='search by name...'
          value={inputText}
          onChange={e => dispatch(setInputText(e.target.value))}
        />
        <div className="button" onClick={() => {
          dispatch(setSearch());}}>
          <AiOutlineSearch style={{width : 18, height : 18}}/>
        </div> 
        <div className="deleted">
          <input 
            type="checkbox"
            value={deletedData}
            onChange={e => {
              dispatch(setDeletedData(e.target.checked));
            }}
          />
          <div style={{fontSize : 14, color : 'gray'}}>Deleted</div>
        </div>
        
      </div>

      <div className="filter-right">
        <select
          value={sortBy}
          onChange={ e => {
            dispatch(setSortBy(e.target.value));
          }}>
          {[
            'All', 
            'Kpass', 
            'TravelWallet'
          ].map((element, index) => (
            <option
              key={index} 
              value={index}>{element}</option>))}
        </select>
        <div className="button" onClick={() => setAddModal(true)}>
         <AiOutlineFileAdd style={{width : 15, height : 15}}/>
        </div>
      </div>
      <AddModal addModal={addModal} setAddModal={setAddModal}/>
    </FilterWrapper>
  );
};

export default React.memo(Filter);