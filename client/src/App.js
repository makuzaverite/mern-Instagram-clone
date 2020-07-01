import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/pages/Home'
import NavBar from './components/layout/NavBar'
import AuthcontextProvider from './context/AuthContext.js'
import PostContextProvider from './context/PostContext.js'
import EditProfile from './components/pages/Profile/EditProfile'
import Profile from './components/pages/Profile/Profile'
import ProtectedRoute from './ProtectedRoute'
import Post from './components/pages/Posts/Posts'
import NewPost from './components/pages/Posts/NewPost/NewPost'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthcontextProvider>
          <PostContextProvider>
            <NavBar />
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute
                exact
                path="/profile/edit"
                component={EditProfile}
              />
              <ProtectedRoute exact path="/posts" component={Post} />
              <ProtectedRoute exact path="/newPost" component={NewPost} />
            </Switch>
          </PostContextProvider>
        </AuthcontextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
