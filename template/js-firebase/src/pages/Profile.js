import { useState } from "react"
import { authService } from "firebaseInstance"
import { useHistory } from "react-router"

function Profile({ refreshUser, userObj }) {
	const history = useHistory()
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
	const onLogOutClick = () => {
		authService.signOut()
		history.push("/")
	}
	const onChange = (event) => {
		const {
			target: { value },
		} = event
		setNewDisplayName(value)
	}
	const onSubmit = async (event) => {
		try {
			event.preventDefault()
			if (userObj.displayName !== newDisplayName) {
				await userObj.updateProfile({
					displayName: newDisplayName,
				})
				refreshUser()
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="container">
			<form onSubmit={onSubmit} className="profileForm">
				<input
					onChange={onChange}
					type="text"
					autoFocus
					placeholder="Display name"
					value={newDisplayName}
					className="formInput"
				/>
				<input
					type="submit"
					value="Update Profile"
					className="formBtn"
					style={{
						marginTop: 10,
					}}
				/>
			</form>
			<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
				Log Out
			</span>
		</div>
	)
}

export default Profile
