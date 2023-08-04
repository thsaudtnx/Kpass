import axios from 'axios';
import client from '../api/client';

//액션 타입 정리
const INIT_BUSINESS = "business/INIT_BUSINESS";
const FETCH_BUSINESS = "business/FETCH_BUSINESS";
const CHANGE_PAGENUM = "business/CHANGE_PAGENUM";
const CHANGE_HASMORE = "business/CHANGE_HASMORE";

const DELETE_BUSINESS = "business/DELETE_BUSINESS";
const EDIT_BUSINESS = "business/EDIT_BUSINESS";
const INSERT_BUSINESS = "business/INSERT_BUSINESS";
const RESTORE_BUSINESS = "business/RESTORE_BUSINESS";

//일반 액션 생성 함수
export const initBusiness = () => ({type : INIT_BUSINESS});
export const fetchBusiness = (data) => ({type : FETCH_BUSINESS, payload : data});
export const changePageNum = (pageNum) => ({type : CHANGE_PAGENUM, payload : pageNum});
export const changeHasMore = (hasMore) => ({type : CHANGE_HASMORE, payload : hasMore});

export const deleteBusiness = (id) => ({type : DELETE_BUSINESS, payload : id});
export const editBusiness = (editedData) => ({type : EDIT_BUSINESS, payload : editedData});
export const insertBusiness = (newData) => ({type : INSERT_BUSINESS, payload : newData});
export const restoreBusiness = (id) => ({type : RESTORE_BUSINESS, payload : id});

//Redux-Thunk
export const fetchBusinessAsync = (params) => async (dispatch) => {
  console.log(params);
  try {
    const business = await client.get('/business/list', {
      params : params,
    });
    dispatch(fetchBusiness(business.data));
    if (business.data.length < params.pageSize) {
      dispatch(changeHasMore(false));
    }
    return;
  } catch(err) {
    console.error(err);
  }
};

export const deleteBusinessAsync = (data) => async (dispatch) => {
  try {
    if (data.logo && data.deletedAt){
      const result = await axios.delete(`${data.logo}`);
      console.log(result.data);
    }
    const deleteResult = await client.delete(`/business/delete/${data.id}`);
    console.log(deleteResult.data);
    if (deleteResult.data.ok){
      dispatch(deleteBusiness(data.id));
    }
  } catch(err) {
    console.error(err);
  }
};

export const restoreBusinessAsync = (id) => async (dispatch) => {
  try {
    const restoreResult = await client.put(`/business/restore/${id}`);
    console.log(restoreResult.data);
    if (restoreResult.data.ok){
      dispatch(restoreBusiness(id));
    }
  } catch(err) {
    console.error(err);
  }
}

export const editBusinessAsync = (editedData) => async (dispatch) => {
  try {
    const editResult =  await client.patch(`/business/edit/${editedData.id}`, editedData);
    console.log(editResult.data);
    if (editResult.data.ok){
      dispatch(editBusiness(editedData));
    }
  } catch(err){
    console.error(err);
  }
};

export const insertBusinessAsync = (newData) => async (dispatch, getState) => {
  try {
    const result = await client.post(`/business/add`, newData);
    console.log(result.data);
    if(result.data.ok){
      dispatch(insertBusiness({...newData, id : result.data.id}));
    }
  } catch(err) {
    console.error(err);
  }
};

//초기 상태 및 리듀서
const initialState = {
  data : [],
  pageNum : 0,
  hasMore : true,
  pageSize : 20,
};

export default function business(state = initialState, action) {
  switch (action.type) {
    case INIT_BUSINESS:
      return initialState
    case FETCH_BUSINESS:
      return ({
        ...state,
        data : [...state.data, ...action.payload],
      })
    case CHANGE_PAGENUM:
      return ({
        ...state,
        pageNum : action.payload,
      })
    case CHANGE_HASMORE:
      return ({
        ...state,
        hasMore : action.payload
      })
    case DELETE_BUSINESS:
      return({
        ...state,
        data : state.data.filter(item => item.id!==action.payload)
      })
    case EDIT_BUSINESS:
      return ({
        ...state,
        data : state.data.map(item => item.id===action.payload.id ? action.payload : item)
      })
    case INSERT_BUSINESS:
      return ({
        ...state,
        data : state.data.concat(action.payload)
      })
    case RESTORE_BUSINESS:
      return ({
        ...state,
        data : state.data.filter(item => item.id!==action.payload)
      })
    default:
      return state;
  }
};
