import { combineReducers } from 'redux';
// import desktop from './desktop';
// import {dockItems} from './desktop';
// import settings from './settings';
// import contactMessage from './contact';


const emptyReducer = (state = {}, action) => { return state;}


const reducers = combineReducers({
	emptyReducer
});

export default reducers;