import React, { useContext } from "react";
import AddModal from "../components/AddModal";
import { ManageContext } from "../contexts/ManageContext";
import { styled } from "styled-components";
import { FieldContext } from "../contexts/FieldContext";

const FilterWrapper = styled.div`
  position : sticky;
  background : white;
  top : 0px;
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  padding : 20px;

  div.filter-left {
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-bottom : 0px;
  }

  div.filter-left > select {
    padding : 10px;
    border : 1px solid lightGray;
    cursor : pointer;
    width : 150px;
    outline : none;
  }

  div.filter-left > input.inputText {
    padding : 10px 20px;
    width : 200px;
    border : 1px solid lightGray;
    margin-left : 10px;
    cursor : pointer;
    margin-right : 10px;
    outline : none;
  }

  div.filter-left > div.button {
    padding : 8px 15px;
    border : 1px solid lightGray;
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
  }

  div.filter-left > input[type="checkbox"] {
    width : 14px;
    height : 14px;
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
  }
`;

const Filter = () => {
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
  const {fieldList} = useContext(FieldContext);

  return (
    <FilterWrapper>
      <div className='filter-left'>
        <select
          value={field}
          onChange={e => {
            setField(e.target.value);
            setPageNum(0);
            setIsUpdated(isUpdated + 1);
          }}>
          {fieldList.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
        </select>
        <input 
          className="inputText"
          type='text' 
          placeholder='SEARCH BY NAME'
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <div className="button" onClick={() => {
          setPageNum(0);
          setIsUpdated(isUpdated + 1);}}>
          SEARCH
        </div> 
        <input 
          type="checkbox"
          value={deletedData}
          onChange={() => {
            setDeletedData(!deletedData);
            setPageNum(0);
            setIsUpdated(isUpdated + 1);
          }}
        />
        <div style={{fontSize : 14, color : 'gray'}}>DELETED DATA</div>
      </div>

      <div className="filter-right">
        <select
          value={sortBy}
          onChange={ e => {
            setSortBy(e.target.value);
            setPageNum(0);
            setIsUpdated(isUpdated + 1);
          }}>
          {['ALL', 'KPASS', 'TRAVELWALLET'].map((element, index) => <option key={index} value={element}>{element}</option>)}
        </select>
        <div className="button" onClick={() => setAddModal(true)}>
          ADD
        </div>
      </div>
      <AddModal />
    </FilterWrapper>
  );
};

export default React.memo(Filter);