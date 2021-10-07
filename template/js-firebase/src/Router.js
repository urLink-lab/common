import { BrowserRouter, Route, Switch } from "react-router-dom"
import Auth from "pages/Auth"
import Home from "pages/Home"
import Profile from "pages/Profile"
import Navigation from "components/Navigation"

const Router = ({ refreshUser, isLoggedIn, userObj }) => {
	return (
		<BrowserRouter>
			{isLoggedIn && <Navigation userObj={userObj} />}
			<Switch>
				{isLoggedIn ? (
					<div className="routerContaniner">
						<Route exact path="/">
							<Home userObj={userObj} />
						</Route>
						<Route exact path="/profile">
							<Profile userObj={userObj} refreshUser={refreshUser} />
						</Route>
					</div>
				) : (
					<Route exact path="/">
						<Auth />
					</Route>
				)}
			</Switch>
		</BrowserRouter>
	)
}

export default Router
