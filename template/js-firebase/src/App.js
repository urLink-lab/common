import { useState, useEffect } from "react"
import Router from "./Router"
import { authService } from "firebaseInstance"

function App() {
	const [init, setInit] = useState(false)
	const [userObj, setUserObj] = useState(null)

	const refreshUser = () => {
		const user = authService.currentUser
		setUserObj({
			...userObj,
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => user.updateProfile(args),
		})
	}

	//현재 로그인 상태 감지
	useEffect(() => {
		//App이 Firebase보다 빠르게 로드되기 때문에 Firebase가 로드되고 auth 상태를 감지하게 됐을 때 state를 변경해야한다.
		authService.onAuthStateChanged(async (user) => {
			try {
				if (user) {
					if (user.displayName === null) {
						await user.updateProfile({
							displayName: "user",
						})
					}
					setUserObj({
						displayName: user.displayName,
						uid: user.uid,
						updateProfile: (args) => user.updateProfile(args),
					})
				} else {
					setUserObj(null)
				}
				setInit(true)
			} catch (error) {
				console.error(error)
			}
		})
	}, [])

	return (
		<>
			{init ? (
				<Router
					refreshUser={refreshUser}
					isLoggedIn={Boolean(userObj)}
					userObj={userObj}
				/>
			) : (
				<div className="loading">Initializing...</div>
			)}
		</>
	)
}

export default App
