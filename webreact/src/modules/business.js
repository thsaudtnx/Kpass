import axios from 'axios';
import { server } from '../lib/serverURL';

//액션 타입 정리
const FETCH_BUSINESS = "business/FETCH_BUSINESS";

//액션 생성 함수 with Redux-Thunk
export const fetchBusinessAsync = () => async (dispatch, getState) => {
  try {
    const fetchResult = await axios.get(`${server}/business/list`, {
      params : {
        pageNum : pageNum,
        pageSize : pageSize,
        field : field,
        inputText : inputText,
        sortBy : sortBy,
        deletedData : deletedData,
      }
    })
    return dispatch({
      type : FETCH_BUSINESS,
      payload : fetchResult.data
    })
  } catch(err) {
    console.error(err);
  }
};

export const deleteFieldAsync = (id) => async (dispatch) => {
  
};

export const editFieldAsync = (editedData) => async (dispatch) => {};

export const insertFieldAsync = (newData) => async (dispatch) => {};

//초기 상태 및 리듀서
const initialState = [];

export default function business(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUSINESS:
      return action.payload;
    default:
      return state;
  }
};
