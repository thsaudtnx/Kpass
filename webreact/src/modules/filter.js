import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';
import { useContext } from 'react';
import { LogContext } from '../contexts/LogContext';


export const setIsUpdated = createAction('SET_ISUPDATED');
export const changeField = createAction('CHANGE_FIELD', (field) => async(dispatch, getState) => {});
export const changeInput = createAction('CHANGE_INPUT', (text) => (text));
export const checkDelete = createAction('CHECK_DELETE');
export const changeSortBy = createAction('CHANGE_SORTBY', (sortBy) => (sortBy));


const initialState = {
  isUpdated : false,
  inputText : null,
  field : '전체',
  sortBy : '전체',
  deleted : false,
  data : null,
  pageNum : 0,
  pageSize : 10,
  hasMore : true,
  addModal : false,
};


const filter = handleActions(
  {
    ['SET_ISUPDATED'] : (state) => ({
      ...state,
      isUpdated : !state.isUpdated,
    }),
    ['CHANGE_FIELD'] : (state, {payload : field}) => ({
      ...state,
      field : field,
    }),   
    ['CHANGE_INPUT'] : (state, {payload : inputText}) => ({
      ...state,
      inputText : inputText,
    }),
    ['CHECK_DELETE'] : (state) => ({
      ...state,
      deleted : !state.deleted,
    }),
    ['CHANGE_SORTBY'] : (state, {payload : sortBy}) => ({
      ...state,
      sortBy : sortBy,
    }),
  },
  initialState,
);

export default filter;
