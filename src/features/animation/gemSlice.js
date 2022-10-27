import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	running: false,
	init: {},
	loc: {},
	topC: {x: 0, y: 0, r: 0},
	topR: {x: 0, y: 0, r: 0},
	topL: {x: 0, y: 0, r: 0},
	botC: {x: 0, y: 0, r: 0},
	botR: {x: 0, y: 0, r: 0},
	botL: {x: 0, y: 0, r: 0},
}


const gemSlice=createSlice({
	name: 'gem',
	initialState,
	reducers: {
		startAnimation: (state, action) =>({
			running: true,
			init: state.init,
			loc: action.payload,
			topC: {
				x: action.payload.b.x,
				y: action.payload.b.y,
				r: 0,
			},
			topR: {
				x: action.payload.b.x,
				y: action.payload.b.y,
				r: 0,
			},
			topL: {
				x: action.payload.b.x,
				y: action.payload.b.y,
				r: 0,
			},
			botC: {
				x: action.payload.b.x,
				y: action.payload.b.y,
				r: 0,
			},
			botR: {
				x: action.payload.b.x,
				y: action.payload.b.y,
				r: 0,
			},
			botL: {
				x: action.payload.b.x,
				y: action.payload.b.y,
				r: 0,
			},
		}),
		endAnimation: state => initialState,
		move: (state, action)=>({
			running: true,
			init: state.init,
			loc: state.loc,
			topC: {
				x: state.topC.x+state.loc.v.topC.x,
				y: state.topC.y+state.loc.v.topC.y,
				r: state.topC.r+state.loc.v.topC.r,
			},
			topR: {
				x: state.topR.x+state.loc.v.topR.x,
				y: state.topR.y+state.loc.v.topR.y,
				r: state.topR.r+state.loc.v.topR.r,
			},
			topL: {
				x: state.topL.x+state.loc.v.topL.x,
				y: state.topL.y+state.loc.v.topL.y,
				r: state.topL.r+state.loc.v.topL.r,
			},
			botC: {
				x: state.botC.x+state.loc.v.botC.x,
				y: state.botC.y+state.loc.v.botC.y,
				r: state.botC.r+state.loc.v.botC.r,
			},
			botR: {
				x: state.botR.x+state.loc.v.botR.x,
				y: state.botR.y+state.loc.v.botR.y,
				r: state.botR.r+state.loc.v.botR.r,
			},
			botL: {
				x: state.botL.x+state.loc.v.botL.x,
				y: state.botL.y+state.loc.v.botL.y,
				r: state.botL.r+state.loc.v.botL.r,
			},
		})
	},
});

export const { move, endAnimation, startAnimation } = gemSlice.actions;
export default gemSlice.reducer;
