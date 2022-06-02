import React from "react";
import './TagItem.scss'

const TagItem = ({tag, remove, active, activeTag}) => {
	return (
		<span className={activeTag === tag.name ? 'tag-item active' : 'tag-item'} onClick={() => {
			active(tag)
		}}>
			<p>{tag.name}</p>
			<span className="tag-item__close" onClick={(e) => {
				e.stopPropagation();
				remove(tag)
			}}><p>x</p></span>
		</span>
	)
}

export default TagItem