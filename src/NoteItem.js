import React from "react";

const NoteItem = (props) => {
	return (
		<div className='note-item'>
			<span onClick={() => props.setCheckedTodo(props.todo.id)}>
				<input type='checkbox' checked={props.todo.completed} onChange={()=>{}}/>
			<p>{props.todo.text}</p>
			</span>
			<div className="btns">
				<button>Edit</button>
				<button onClick={()=>{props.remove(props.todo)}}>Delete</button>
			</div>

		</div>
	);
};

export default NoteItem;
