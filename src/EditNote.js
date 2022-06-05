import React, {useState} from "react";



const EditNote = (props) => {

	const [name, setName] = useState(props.text);

		return (
			<div className='note-item'>
			<span>
				<input type="text"
				   value={name}
				   onChange={(e)=>setName(e.target.value)}
				/>
			</span>
				<div className="btns">
					<button className='save-btn' onClick={()=>{props.save(props.edit, name)}}>Save</button>
					<button className='cancel-btn' onClick={()=>{props.editHandler(null)}}>Cancel</button>
				</div>

			</div>
		);
};

export default EditNote;
