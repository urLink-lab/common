import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { authService, firebaseInstance } from "firebaseInstance"

function Auth() {
	// Social Login with GitHub
	const onClickSocialLogin = async (event) => {
		try {
			const {
				target: { name },
			} = event
			let provider
			if (name === "github") {
				provider = new firebaseInstance.auth.GithubAuthProvider()
			}
			await authService.signInWithPopup(provider)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className="authContainer">
			<div className="authBtns">
				<button onClick={onClickSocialLogin} name="github" className="authBtn">
					Continue with Github <FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	)
}

export default Auth
