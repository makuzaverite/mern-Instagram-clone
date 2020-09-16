import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/pages/Home/Home'
import NavBar from './components/layout/NavBar'
import AuthcontextProvider from './context/AuthContext.js'
import PostContextProvider from './context/PostContext.js'
import ProfileContextProvider from './context/ProfileContext'
import EditProfile from './components/Profile/EditProfile'
import Profile from './components/Profile/Profile'
import ProtectedRoute from './ProtectedRoute'
import Posts from './components/Posts/Posts'
import Profiles from './components/pages/Profile/Profiles/Profiles'
import NotFound from './components/layout/NotFound'

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthcontextProvider>
					<ProfileContextProvider>
						<PostContextProvider>
							<NavBar />
							<Switch>
								<Route exact path='/notfound'>
									<NotFound />
								</Route>
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
								<ProtectedRoute exact path='/' component={Home} />
								<Route exact path='/:username' component={Profile} />
								<ProtectedRoute
									exact
									path='/edit/profile'
									component={EditProfile}
								/>
								<ProtectedRoute exact path='/posts' component={Posts} />

								<ProtectedRoute exact path='/profile/:id' component={Profiles} />
							</Switch>
						</PostContextProvider>
					</ProfileContextProvider>
				</AuthcontextProvider>
			</BrowserRouter>
		</>
	)
}
export default App
