import { dbService, storageService } from "firebaseInstance"
import React, { useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"

function TodoForm({ userObj }) {
	const [todo, setTodo] = useState("")
	const [thumbnail, setThumbnail] = useState("")

	const fileInputRef = useRef()

	const onSubmit = async (event) => {
		try {
			event.preventDefault()
			if (todo === "") {
				return
			}
			let thumbnailUrl = ""
			if (thumbnail !== "") {
				const thumbnailRef = storageService
					.ref()
					.child(`${userObj.uid}/${uuidv4()}}`)
				const response = await thumbnailRef.putString(thumbnail, "data_url")
				thumbnailUrl = await response.ref.getDownloadURL()
			}
			const todoObj = {
				text: todo,
				createdAt: Date.now(),
				creatorId: userObj.uid,
				thumbnailUrl,
			}
			await dbService.collection("todos").add(todoObj)
			setTodo("")
			setThumbnail("")
			fileInputRef.current.value = null
		} catch (error) {
			console.error(error)
		}
	}
	const onChange = (event) => {
		const {
			target: { value },
		} = event
		setTodo(value)
	}
	const onFileChange = (event) => {
		const {
			target: { files },
		} = event
		const selectedFile = files[0]
		const reader = new FileReader()
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent
			setThumbnail(result)
		}
		if (Boolean(selectedFile)) {
			reader.readAsDataURL(selectedFile)
		}
	}
	const onClearThumbnail = () => {
		setThumbnail("")
		fileInputRef.current.value = null
	}

	return (
		<form onSubmit={onSubmit} className="factoryForm">
			<div className="factoryInput__container">
				<input
					className="factoryInput__input"
					value={todo}
					onChange={onChange}
					type="text"
					placeholder="Write the tasks"
					maxLength={120}
				/>
				<input type="submit" value="&rarr;" className="factoryInput__arrow" />
			</div>
			<label htmlFor="attach-file" className="factoryInput__label">
				<span>Add photos</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				ref={fileInputRef}
				style={{
					opacity: 0,
				}}
			/>

			{thumbnail && (
				<div className="factoryForm__attachment">
					<img
						src={thumbnail}
						style={{
							backgroundImage: thumbnail,
						}}
						alt="thumbnail"
					/>
					<div className="factoryForm__clear" onClick={onClearThumbnail}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			)}
		</form>
	)
}

export default TodoForm
