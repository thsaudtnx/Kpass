import {combineReducers} from 'redux';
import field from './field';
import business from './business';

const rootReducer = combineReducers({
  field,
  business,
});

export default rootReducer;