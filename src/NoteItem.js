import React from "react";
import EditNote from "./EditNote";



const NoteItem = (props) => {


	const renderText = () =>{
		const notesTag = /\B(#[a-z0-9]+|#[а-я0-9]+)(\s|$)/ig;
		let res = props.note.text.match(notesTag)

		if(res?.length === 1){
			const textArray = props.note.text.split(res);
			return <p>{textArray[0]} <strong>{res}</strong>{textArray[1]}</p>
		}
		return <p>{props.note.text}</p>
	}



	if(props.edit === props.note.id){
		return (
			<EditNote
				text={props.note.text}
				save={props.save}
				edit={props.edit}
				cancel={props.cancel}
			/>


		);
	}



	return (
		<div className='note-item'>
			<span onClick={() => props.setCheckednote(props.note.id)}>
				{renderText()}
			</span>
			<div className="btns">
				<button className='edit-btn' onClick={()=>{props.editHandler(props.note.id)}}>Edit</button>
				<button className='delete-btn' onClick={()=>{props.remove(props.note)}}>Delete</button>
			</div>

		</div>


	);
};

export default NoteItem;
