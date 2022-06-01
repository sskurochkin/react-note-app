import React, { useState } from "react";
import {v4 as uuidv4}  from 'uuid'
import TodoItem from "./TodoItem";
import todosData from "./todos";
import TagItem from "./TagItem";

function Todo() {



	const tags = ['#rerer', '#cdd'];


	const [name, setName] = useState("");
	const [todos, setTodos] = useState(todosData);
	const [tag, setTag] = useState([])



	const addNewTag = (str) =>{

		let reg = /\B(#[a-z0-9]+|#[а-я0-9]+)(\s|$)/ig;
		let res = str.match(reg)

		if(res) {
			let newArr = () => {
				let arr = []
				for (let i = 0; i < res.length; i++) {
					let customObject = {
						id: uuidv4(3),
						name: res[i]
					}
					arr.push(customObject)
				}
				return arr
			}

			setTag([...tag, ...newArr()])
		}
	}

	const addTodoHandler = (e) => {
		const value = e.target.value;
		setName(value);
		if (e.key === "Enter") {
			addNewTag(value);
			setTodos((prev) => [
				...prev,
				{ id: todos.length + 1, text: value, completed: false },
			]);
			setName("");
		}
	};

	const setCheckedTodo = (id) => {
		const newArr = todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo
		});
		setTodos(newArr);
	};


	return (
		<>
		<h1>ToDo App</h1>

			<div className="tags">
				{tag && tag.map((tag)=>
					<TagItem
						tag={tag.name}
						key={tag.id}
					/>)}
			</div>

			{todos && todos.map((todo) => (
				<TodoItem
					todo={todo}
					key={todo.id}
					setCheckedTodo={setCheckedTodo}
				/>
			))}
			<input
				type='text'
				placeholder='Write new task and press "Enter"'
				value={name}
				onChange={(e) => setName(e.target.value)}
				onKeyPress={(e) => addTodoHandler(e)}
			/>
		</>
	);
}

export default Todo;
