import { useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  move, endAnimation, startAnimation } from './gemSlice'
import botC from "./assets/botC.png"
import botR from "./assets/botR.png"
import botL from "./assets/botL.png"
import topC from "./assets/topC.png"
import topL from "./assets/topL.png"
import topR from "./assets/topR.png"

const useAnimFrame = cb =>{
	const reqRef = useRef(); //request for animation, must persist
	const startTime= useRef(); //start time, must persist
	const animate =time =>{
		if(startTime.current != undefined){
			const dt = time-startTime.current;
			if(cb(dt, reqRef.current)==false) {
				cancelAnimationFrame(reqRef.current)
				startTime.current = undefined;
				return;
			}
		}
		else startTime.current = time;
		reqRef.current = requestAnimationFrame(animate);

	}
	useEffect(()=>{
		reqRef.current = requestAnimationFrame(animate);
		return ()=> cancelAnimationFrame(reqRef.current);
	})
}

export const GemButton = (props) =>{
	const dispatch = useDispatch();
	const gem = useSelector(state => state.gem) //capture state of gem
	const mouse = useSelector(state=>state.mouse); //capture mouse postion through MouseHunter
	const stylize = n => n?n+'px':null

	const onClick =e=>{
		if(props && props.onClick && typeof props.onClick === 'function')
			setTimeout(()=>{props.onClick(e);}, 2100);
		const gw = document.getElementById('new-quote')?.getBoundingClientRect()
		const parts = ['topC','topR','topL','botC', 'botR', 'botL']
				.map(p=>({e:document.getElementById(p).getBoundingClientRect(), id: p}))
		const clickLoc= mouse.location; //capture click location
		const w = gw.width;
		const startOffset= { //cheatery to get the center positions of parts. Allows parts to scatter
			topC: {x: w/2, y:w/10},
			topL: {x:w/4, y:w/4},
			topR: {x:3*w/4, y:w/4},
			botC: {x:w/2, y:w/2},
			botL: {x:w/4, y:3*w/4},
			botR: {x:3*w/4, y:w/4},
		}
		let v = {};
		for(let i=0;6>i;i++){
			const constrain= (n, u=10, l=1)=>Math.max(l,Math.min(n,u))
			const pos = {x: Number.parseInt(parts[i].e.left)+startOffset[parts[i].id].x, y: Number.parseInt(parts[i].e.top)+startOffset[parts[i].id].y}
			const dir = {x: pos.x >clickLoc.x?1:-1, y: pos.y> clickLoc.y?1:-1}
			const dist = {x: clickLoc.x-pos.x, y: clickLoc.y-pos.y}
			const speed = Math.sqrt(Math.sqrt(((dist.x*dist.x)+(dist.y*dist.y))))/5;
			v[parts[i].id]={x: constrain(speed)*dir.x, y: constrain(speed)*dir.y, r: (Math.random()*10)-5}	
		}
		dispatch(startAnimation({b: {x: gw.left, y: gw.top, w: gw.width}, v: v}))
	}

	useAnimFrame(dt	=>{
		if(gem.running==false) {
			return false;
		}
		if(dt>2000) {
			dispatch(endAnimation())
		}else{
			dispatch(move())
		}
		return true;
	});

	
	return(
			<div id='new-quote' onClick={onClick}>
				<img src={botC} 
					className={'gem '+(gem.running==false?'fadeIN':'fadeOUT')}
					style={
						{
							top: stylize(gem.botC.y), 
							left: stylize(gem.botC.x), 
							transform: 'rotate('+gem.botC.r+'deg)',
						}
					} 
					id='botC' />
				<img src={botR}
					className={'gem '+(gem.running==false?'fadeIN':'fadeOUT')}
					style={
						{
							top: stylize(gem.botR.y),
							left: stylize(gem.botR.x),
							transform: 'rotate('+gem.botR.r+'deg)',
						}
					} 
					id='botR' />
				<img src={botL} 
					className={'gem '+(gem.running==false?'fadeIN':'fadeOUT')}
					style={
						{
							top: stylize(gem.botL.y),
							left: stylize(gem.botL.x),
							transform: 'rotate('+gem.botL.r+'deg)',
						}
					} 
					id='botL' />
				<img src={topC} 
					className={'gem '+(gem.running==false?'fadeIN':'fadeOUT')}
					style={
						{
							top: stylize(gem.topC.y),
							left: stylize(gem.topC.x),
							transform: 'rotate('+gem.topC.r+'deg)',
						}
					}
					id='topC' />
				<img src={topL} 
					className={'gem '+(gem.running==false?'fadeIN':'fadeOUT')}
					style={
						{
							top: stylize(gem.topL.y),
							left: stylize(gem.topL.x), 
							transform: 'rotate('+gem.topL.r+'deg)',
						}
					}
						id='topL' />
				<img src={topR} 
					className={'gem '+(gem.running==false?'fadeIN':'fadeOUT')}
					style={
						{
							top: stylize(gem.topR.y),
							left: stylize(gem.topR.x),
							transform: 'rotate('+gem.topR.r+'deg)',
						}
					} 
					id='topR' />
			</div>
		)
	
}
