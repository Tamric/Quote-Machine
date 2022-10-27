import { createSlice } from "@reduxjs/toolkit";

const initialState={
	location: {x: 0, y: 0},
}

const cheeseSlice=createSlice({
	name: 'mouseHunter',
	initialState,
	reducers: {
		move: (state, action)=>({
			location: action.payload,
		})
	},
})

export const {move} = cheeseSlice.actions;

export default cheeseSlice.reducer ;
