import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import note from './note';
import dialog from './dialog';

const rootReducer = combineReducers({
    note,
    dialog,
    routing
});

export default rootReducer;
