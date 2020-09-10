import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/pages/Home/Home'
import NavBar from './components/layout/NavBar'
import AuthcontextProvider from './context/AuthContext.js'
import PostContextProvider from './context/PostContext.js'
import ProfileContextProvider from './context/ProfileContext'
import EditProfile from './components/pages/Profile/EditProfile'
import Profile from './components/pages/Profile/Profile'
import ProtectedRoute from './ProtectedRoute'
import Posts from './components/pages/Posts/Posts'
import Profiles from './components/pages/Profile/Profiles/Profiles'

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthcontextProvider>
					<ProfileContextProvider>
						<PostContextProvider>
							<NavBar />
							<Switch>
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
								<ProtectedRoute exact path='/' component={Home} />
								<ProtectedRoute exact path='/profile' component={Profile} />
								<ProtectedRoute
									exact
									path='/profile/edit'
									component={EditProfile}
								/>
								<ProtectedRoute exact path='/posts' component={Posts} />

								<ProtectedRoute exact path='/profile/:id' component={Profiles} />
								{/* <ProtectedRoute exact path='/post/:id' component={Post} /> */}
							</Switch>
						</PostContextProvider>
					</ProfileContextProvider>
				</AuthcontextProvider>
			</BrowserRouter>
		</>
	)
}
export default App
