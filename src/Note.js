import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid'
import NoteItem from "./NoteItem";
import notesData from "./notes";
import TagItem from "./TagItem";

function Note() {

	const [name, setName] = useState(""); //note
	const [notes, setNotes] = useState(notesData);	//note
	const [tagName, setTagName] = useState('') //tag
	const [tag, setTag] = useState([])	//tag
	const [activeTag, setActiveTag] = useState('')
	const [editId, setEditId] = useState(null)


	const addNewTag = (str) => {

		let reg = /\B(#[a-z0-9]+|#[а-я0-9]+)(\s|$)/ig;
		let res = str.match(reg)

		if (res) {
			//удаление одинаковых тегов если такие есть в строке
			let filteredRes = [...new Set(res.map((str) => {
				return str.trim()
			}))].map((elem)=>{
				if(tag.find(item=>item.name === elem)){

					return null
				} else return elem

			}).filter(elem=>elem!== null)
			//

				let newArr = () => {
					let arr = []
					for (let i = 0; i < filteredRes.length; i++) {
						let customObject = {
							id: uuidv4(3),
							name: filteredRes[i]
						}
						arr.push(customObject)
					}
					return arr
				}

				setTag([...tag, ...newArr()])



		}
	}

	const removeTag = (item) => {
		setTag(tag.filter(t => t.id !== item.id))
	}

	const activeTagHandler = (tag) => {
		let str = tag.name

		if (activeTag !== str) {
			setActiveTag((prev) => prev = str)
		} else {
			setActiveTag('')
		}

	}


	const addTagHandler = (e) => {
		const value = e.target.value;
		setTagName(value);
		if (e.key === "Enter") {

			//проверка на повторяющийся тег
			let dbl = tag.some(elem => elem.name === '#' + value)

			if (!dbl) {
				setTag((prev) => [
					...prev,
					{id: uuidv4(4), name: '#' + value}
				]);
			}
			setTagName("");
		}
	}

	const addNoteHandler = (e) => {
		const value = e.target.value;
		setName(value);
		if (e.key === "Enter") {
			addNewTag(value);
			setNotes((prev) => [
				...prev,
				{id: notes.length + 1, text: value, completed: false},
			]);
			setName("");
		}
	};

	const removeNote = (note) => {
		setNotes(notes.filter(t => t.id !== note.id))
	}

	// const setCheckedTodo = (id) => {
	// 	const newArr = notes.map((note) => {
	// 		if (note.id === id) {
	// 			note.completed = !note.completed;
	// 		}
	// 		return note
	// 	});
	// 	setNotes(newArr);
	// };

	const handleEditClick = (id) => {
		setEditId(id)
	}

	const handleCancelClick = () => {
		setEditId(null)
	}


	const handleSaveClick = (id, text) => {
		addNewTag(text)
		const editNotes = notes.map((elem) => {
			if (elem.id === id) {
				elem.text = text
			}
			return elem
		})

		setNotes(editNotes)
		handleCancelClick()
	}


	const renderNotes = () => {

		if (activeTag && notes.length) {
			return notes
				.filter(note => note.text.includes(activeTag))
				.map(
					(note) => (
						<NoteItem
							note={note}
							key={note.id}
							remove={removeNote}
							save={handleSaveClick}
							edit={editId}
							editHandler={handleEditClick}
							cancel={handleCancelClick}
						/>)
				)
		}

		return notes && notes.map((note) => (
			<NoteItem
				note={note}
				key={note.id}
				remove={removeNote}
				save={handleSaveClick}
				edit={editId}
				editHandler={handleEditClick}
				cancel={handleCancelClick}
			/>
		))

	}


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
				{tag && tag.map((tag) =>
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
					onKeyPress={(e) => addNoteHandler(e)}
				/>
				<hr/>
				{renderNotes()}

			</div>

		</>
	);
}

export default Note;
