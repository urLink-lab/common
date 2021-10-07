import React, { useState } from "react"
import { dbService, storageService } from "firebaseInstance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons"

const Todo = ({ todoObj, isOwner }) => {
	const [editing, setEditing] = useState(false)
	const [newTodo, setNewTodo] = useState(todoObj.text)
	const onDeleteClick = async () => {
		const ok = window.confirm("Are you sure you want to delete this todo?")
		try {
			if (ok) {
				await dbService.doc(`todos/${todoObj.id}`).delete()
				if (todoObj.thumbnailUrl !== "") {
					await storageService.refFromURL(todoObj.thumbnailUrl).delete()
				}
			}
		} catch (e) {
			console.error(e)
		}
	}
	const toggleEditing = () => setEditing((prev) => !prev)
	const onSubmit = async (event) => {
		event.preventDefault()
		try {
			await dbService.doc(`todos/${todoObj.id}`).update({
				text: newTodo,
			})
			setEditing(false)
		} catch (e) {
			console.error(e)
		}
	}
	const onChange = (event) => {
		const {
			target: { value },
		} = event
		setNewTodo(value)
	}
	return (
		<div className="todo">
			{editing ? (
				<>
					{isOwner && (
						<>
							<form onSubmit={onSubmit} className="container todoEdit">
								<input
									type="text"
									placeholder="Edit your todo"
									value={newTodo}
									required
									autoFocus
									onChange={onChange}
									className="formInput"
								/>
								<input type="submit" value="Update Todo" className="formBtn" />
							</form>
							<span onClick={toggleEditing} className="formBtn cancelBtn">
								Cancel
							</span>
						</>
					)}
				</>
			) : (
				<>
					{todoObj.thumbnailUrl && (
						<img src={todoObj.thumbnailUrl} alt="todo" />
					)}
					<p>{todoObj.text}</p>
					{isOwner && (
						<div className="todo__actions">
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default Todo
