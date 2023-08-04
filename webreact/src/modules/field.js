import axios from 'axios';
import { server } from '../lib/serverURL';

//액션 타입 정리
const FETCH_FIELD = "field/FETCH_FIELD";

//액션 생성 함수 with Redux-Thunk
export const fetchFieldAsync = () => async (dispatch) => {
  try {
    const fetchResult = await axios.get(`${server}/field`);
    return dispatch({
      type : FETCH_FIELD,
      payload : fetchResult.data.fieldList
    })
  } catch(err) {
    console.error(err);
  }
};

export const deleteFieldAsync = (id) => async (dispatch) => {
  try {
    const deleteResult = await axios.delete(`${server}/field/${id}`)
    console.log(deleteResult.data);
    const fetchResult = await axios.get(`${server}/field`);
    return dispatch({
      type : FETCH_FIELD,
      payload : fetchResult.data.fieldList
    })
  } catch(err) {
    console.error(err);
  }
};

export const editFieldAsync = (editedData) => async (dispatch) => {
  try {
    const editResult = await axios.patch(`${server}/field/${editedData.id}`, {
      english : editedData.english,
      korean : editedData.korean,
    });
    console.log(editResult.data);
    const fetchResult = await axios.get(`${server}/field`);
    return dispatch({
      type : FETCH_FIELD,
      payload : fetchResult.data.fieldList
    })
  } catch(err){
    console.error(err);
  }
};

export const insertFieldAsync = (newData) => async (dispatch) => {
  try {
    const insertResult = await axios.post(`${server}/field`, newData);
    console.log(insertResult.data);
    const fetchResult = await axios.get(`${server}/field`);
    return dispatch({
      type : FETCH_FIELD,
      payload : fetchResult.data.fieldList
    })
  } catch(err) {
    console.error(err);
  }
};

//초기 상태 및 리듀서
const initialState = [];

export default function field(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIELD:
      return action.payload;
    default:
      return state;
  }
};
