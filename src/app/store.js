import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  quoteSliceReducer  from '../features/quote/quoteSlice';
import gemSliceReducer from '../features/animation/gemSlice';
import mouseSliceReducer from '../features/functional/mouseSlice';

const rootReducer = combineReducers({
		quote: quoteSliceReducer,
		gem: gemSliceReducer,
		mouse: mouseSliceReducer,
	})

const store = configureStore({
	reducer: rootReducer
});

export default store; 
