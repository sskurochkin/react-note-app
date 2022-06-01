import React from "react";

const TodoItem = (props) => {
	return (
		<div className='todo-item'>
			<span onClick={() => props.setCheckedTodo(props.todo.id)}>
				<input type='checkbox' checked={props.todo.completed} onChange={()=>{}}/>
			<p>{props.todo.text}</p>
			</span>
			<button>Edit</button>
			<button>Delete</button>
		</div>
	);
};

export default TodoItem;
