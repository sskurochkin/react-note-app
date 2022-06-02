import React, { useState } from "react";
import {v4 as uuidv4}  from 'uuid'
import NoteItem from "./NoteItem";
import notesData from "./notes";
import TagItem from "./TagItem";

function Note() {



	const tags = [{id:12, name: '#rerer'}, {id: 13, name: '#cdd'}];


	const [name, setName] = useState(""); //note
	const [notes, setNotes] = useState(notesData);	//note
	const [tagName, setTagName] = useState('') //tag
	const [tag, setTag] = useState(tags)	//tag
	const [activeTag, setActiveTag] = useState('')


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

	const removeTag = (item)=>{
		setTag(tag.filter(t => t.id !== item.id))
	}

	const activeTagHandler = (tag) =>{
		let str = tag.name

		if(activeTag !== str){
			setActiveTag((prev) => prev = str)

			let filteredNotes = notes.filter(note=>
				note.text.includes(str)
			)
			setNotes(filteredNotes)
		} else {
			setActiveTag('')
		}

	}

	const addTagHandler = (e) =>{
		const value = e.target.value;
		setTagName(value);
		if (e.key === "Enter") {

			setTag((prev) => [
				...prev,
				{ id: uuidv4(4), name: '#' + value}
			]);
			setTagName("");
		}
	}

	const addTodoHandler = (e) => {
		const value = e.target.value;
		setName(value);
		if (e.key === "Enter") {
			addNewTag(value);
			setNotes((prev) => [
				...prev,
				{ id: notes.length + 1, text: value, completed: false },
			]);
			setName("");
		}
	};
	
	const removeNote = (note) =>{
		setNotes(notes.filter(t => t.id !== note.id))
	}

	const setCheckedTodo = (id) => {
		const newArr = notes.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo
		});
		setNotes(newArr);
	};


	return (
		<>
		<h1>Note App</h1>

			<div className="wrapper">
				<h2>Tags:</h2>
				<input
					type='text'
					placeholder="Write new tag without '#' and press 'Enter'"
					value={tagName}
					onChange={(e) => setTagName(e.target.value)}
					onKeyPress={(e) => addTagHandler(e)}
				/>
				<hr/>
				{tag && tag.map((tag)=>
					<TagItem
						tag={tag}
						key={tag.id}
						remove={removeTag}
						active={activeTagHandler}
						activeTag={activeTag}
					/>)}
			</div>

			<div className="wrapper">
			<h2>Notes:</h2>
			<input
				type='text'
				placeholder='Write new task and press "Enter"'
				value={name}
				onChange={(e) => setName(e.target.value)}
				onKeyPress={(e) => addTodoHandler(e)}
			/>
			<hr/>

			{notes && notes.map((note) => (
				<NoteItem
					todo={note}
					key={note.id}
					remove={removeNote}
					setCheckedTodo={setCheckedTodo}
				/>
			))}
			</div>

		</>
	);
}

export default Note;
