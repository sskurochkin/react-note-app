import React from "react";
import './TagItem.scss'

const TagItem = ({tag}) =>{
	return(
		<span className='tag-item'>
			<p>{tag}</p>
			<span className="tag-item__close"><p>x</p></span>
		</span>
	)
}

export default TagItem