import {move} from '../functional/mouseSlice'
import { useDispatch } from 'react-redux';


const MouseHunter = props =>{
	const dispatch = useDispatch();

	const mv = e=>{
		dispatch(move( {x: e.clientX, y: e.clientY} ) )	
	}
	return (
		<div className={props.className} 
	 		onMouseMove={mv}>
			{props.children}
		</div>
	)
}
export default MouseHunter;
