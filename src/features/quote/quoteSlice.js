import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchQuotes } from './quoteAPI'

export const loadQuotes = createAsyncThunk( 'fetchQuotesStatus', async ()=> await fetchQuotes());

export const initialState= {
	curIndex: -1,
	author: '',
	quote: '',
	quotes: [],
	loading: false,
	classes: 'init',
};


const quoteSlice=createSlice({
	name: 'quote',
	initialState,
	reducers: {
		next:state=>{
				const i = state.curIndex;
				let loc;
				while(loc==undefined || loc==i)loc=Math.floor(Math.random()*state.quotes.length);

				return {
					curIndex: loc,
					author: state.quotes[loc].author,
					quote: state.quotes[loc].quote,
					quotes: [...state.quotes],
					classes: 'init',
					loading: false,
				}
		},
		display: state=>{
			return {
			curIndex: state.curIndex,
			author: state.author,
			quote: state.quote,
			quotes: state.quotes,
			classes: 'longFade',
			loading: false,
		}
		}
	},	
	extraReducers: (builder)=>{
		builder
		.addCase(loadQuotes.pending, (state)=>{
			const _ = {...state};
			_.loading= true;
			return _;
		})
		.addCase(loadQuotes.fulfilled, (state, action)=>{
			const _ = action.payload;
			const index = Math.floor(Math.random()*_.length)
			const { author, quote } = _[index];
			return {
				curIndex: index,
				author: author,
				quote: quote, 
				quotes: [..._],
				classes: state.classes,
				loading : false,
			}
		})
		.addCase(loadQuotes.rejected, ()=> initialState)
	}
});
export const { next, display} = quoteSlice.actions;
export default  quoteSlice.reducer 
