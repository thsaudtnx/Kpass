//액션 타입 정리
const FIELD_ID = "filter/FIELD_ID";
const INPUT_TEXT = "filter/INPUT_TEXT";
const DELETED_DATA = "filter/DELTED_DATA";
const SORT_BY = "filter/SORT_BY";
const SEARCH = "filter/SEARCH";

//액션생성 함수
export const setFieldId = (field_id) => ({type : FIELD_ID, payload : field_id});
export const setInputText = (inputText) => ({type : INPUT_TEXT, payload : inputText});
export const setDeletedData = (deletedData) => ({type : DELETED_DATA, payload : deletedData});
export const setSortBy = (sortBy) => ({type : SORT_BY, payload : sortBy});
export const setSearch = () => ({type : SEARCH});

//초기 상태 및 리듀서
const initialState = {
  field_id : 0,
  inputText : '',
  deletedData : false,
  sortBy : 0,
  search : 0,
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case FIELD_ID:
      return ({
        ...state,
        field_id : action.payload,
      });
    case INPUT_TEXT:
      return({
        ...state,
        inputText : action.payload,
      })
    case DELETED_DATA:
      return({
        ...state,
        deletedData : action.payload,
      })
    case SORT_BY:
      return({
        ...state,
        sortBy : action.payload,
      })
    case SEARCH:
      return({
        ...state,
        search : state.search + 1,
      })
    default:
      return state;
  }
};
