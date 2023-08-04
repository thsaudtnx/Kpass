import {combineReducers} from 'redux';
import field from './field';
import business from './business';
import filter from './filter';

const rootReducer = combineReducers({
  field,
  business,
  filter
});
export default rootReducer;